import { CacheModule, CacheStore } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";
/**
 * This module provides the caching functionality.
 * 
 * It imports the 'CacheModule' and configures it with an external Redis store.
 * It re-exports the 'CacheModule'. So, by importing 'CacheConfigModule', we get 'CacheModule' providers as well. The 'CACHE_MANAGER' provider is the one that we will be using for cache layer interactions.
 * 
 * This module is defined as global, as we may need it in different modules across the application.
 */
@Global()
@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService], // Instance of the ConfigService is injected to retrieve environment variables.
            useFactory: async (configService: ConfigService) => {
                try{
                    // Connect to redis store.
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
                } catch(error){
                    throw new Error('Failed to connect to Redis server!');
                }
            }
        }),
    ],
    providers: [],
    exports: [CacheModule]
})
export class CacheConfigModule {

}