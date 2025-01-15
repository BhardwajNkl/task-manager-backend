import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as amqp from 'amqplib';

@Injectable()
export class RabbitManagerService {
    private connection: amqp.Connection; // Connection to the RabbitMq broker.
    private channel: amqp.Channel; // Channel of communication with the RabbitMq broker.

    constructor(private configService: ConfigService){
    }

    /**
     * Start a connection and establish a channel when this module is initialized.
     */
    async onModuleInit() {
        await this.connect();
    }

     /**
     * Close the channel and connection when this module is destroyed.
     */
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

    /**
     * Connect to the RabbitMQ broker.
     */
    async connect() {
        const host = this.configService.get<string>('RABBIT_HOST'); // RabbitMQ server host. Read from environment variables.
        const port = this.configService.get<number>('RABBIT_PORT'); // RabbitMQ server port. Read from environment variables.
        try {
            // Establish connection to RabbitMQ server
            this.connection = await amqp.connect(`amqp://${host}:${port}`);
            this.channel = await this.connection.createChannel();
        } catch (error) {
            throw new Error('Failed to connect to RabbitMQ server!');
        }
    }

    /**
     * Publish a message.
     * 
     * @param queue The name of the queue in which we wish to push the message.
     * @param message The message to be pushed.
     */
    async publish(queue: string, message: string ) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel is not initialized.');
        }

        /**
         * Creates the queue if it does not already exist.
         */
        await this.channel.assertQueue(queue, { durable: false });

        const bufferMessage = Buffer.from(message);

        this.channel.sendToQueue(queue, bufferMessage); // Send the message to the queue.
    }
}