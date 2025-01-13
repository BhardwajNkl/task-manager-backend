import { Global, Module } from "@nestjs/common";
import { RabbitManagerService } from "./rabbit-manager.service";

@Module({
    imports:[],
    providers:[RabbitManagerService],
    exports:[RabbitManagerService]
})
@Global()
export class RabbitManagerModule{

}