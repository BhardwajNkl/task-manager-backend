import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as amqp from 'amqplib';

@Injectable()
export class RabbitManagerService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(private configService: ConfigService){
    }

    async onModuleInit() {
        await this.connect();
    }

    async connect() {
        const host = this.configService.get<string>('RABBIT_HOST');
        const port = this.configService.get<number>('RABBIT_PORT');
        try {
            // Establish connection to RabbitMQ server
            this.connection = await amqp.connect(`amqp://${host}:${port}`);
            this.channel = await this.connection.createChannel();
            console.log('Connected to RabbitMQ');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
        }
    }

    async publish(queue: string, message: string | object) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized.');
        }

        await this.channel.assertQueue(queue, { durable: false });

        const bufferMessage =
            typeof message === 'string' ? Buffer.from(message) : Buffer.from(JSON.stringify(message));

        this.channel.sendToQueue(queue, bufferMessage);
        console.log(`Message sent to queue "${queue}":`, message);
    }

    async onModuleDestroy() {
        if (this.channel) {
            await this.channel.close();
            console.log('RabbitMQ channel closed');
        }
        if (this.connection) {
            await this.connection.close();
            console.log('RabbitMQ connection closed');
        }
    }
}