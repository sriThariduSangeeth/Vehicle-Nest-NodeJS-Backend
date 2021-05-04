import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway(4000, { namespace: 'websok' })
export class FileReaderSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server: Server;

    private logger: Logger = new Logger('FileReaderSocketGateway');

    constructor() {

    }
    handleDisconnect(client: any) {
        this.logger.error("Socket Disconnected");
    }
    handleConnection(client: any, ...args: any[]) {
        this.logger.log("Socket connected");
    }
    afterInit(server: any) {
        this.logger.log("Socket started" + server.name);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }


}