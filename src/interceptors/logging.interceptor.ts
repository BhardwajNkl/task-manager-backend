import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    constructor(private logger: Logger){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const requestReceivedAt = Date.now(); // Used to compute response time.

        // Request logging.
        const request = context.switchToHttp().getRequest();

        const { method, originalUrl } = request;
        this.logger.info("Request", {method, url:originalUrl});

        // Controller invocation
        return next.handle().pipe(
            tap((response)=>{
                // Response logging.
                const responseTime = Date.now() - requestReceivedAt;
                const status = context.switchToHttp().getResponse().statusCode;
                this.logger.info("Response" , {method, url:originalUrl, status, responseTime, data:response });
            }),
            catchError((err)=>{
                // Error logging.
                const errorResponseTime = Date.now() - requestReceivedAt;
                const status = err.status || 500;
                this.logger.error("Error" , {method, url:originalUrl, status, errorResponseTime, errorMessage:err.message});
                // Re-throw
                throw err;
            })
        );
    }
    
}