import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, EventPattern, Transport } from '@nestjs/microservices';

@Injectable()
export class ApiService {
    constructor(@Inject('AUTH_SERVICE') private client : ClientProxy) {}

    async getHello(data: any) {
        this.client.emit("hello", data)
    }
}
