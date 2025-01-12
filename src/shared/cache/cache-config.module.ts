import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";

@Global() // Let's make it a global module. So importing of cache manager is easy.
@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const store = await redisStore({
                    socket: {
                        host: configService.get<string>('REDIS_HOST'),
                        port: configService.get<number>('REDIS_PORT'),
                    },
                });
                return {
                    store: store as unknown as CacheStore,
                    ttl: 1 * 1000 * 60, // In milli seconds. Actually 1 minute. SEE WHY THIS IS NOT WORKING.
                };
            }
        }),
    ],
    providers: [],
    exports: [CacheModule]
})
export class CacheConfigModule {

}