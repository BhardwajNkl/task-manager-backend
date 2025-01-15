import { Global, Module } from "@nestjs/common";
import { RabbitManagerService } from "./rabbit-manager.service";

/**
 * The RabbitManagerModule provides functionality for interacting with a RabbitMq broker.
 * 
 * - It provides 'RabbitManagerService' for broker related operations such as publishing messages.
 */

@Module({
    imports:[],
    providers:[RabbitManagerService],
    exports:[RabbitManagerService]
})
@Global()
export class RabbitManagerModule{

}