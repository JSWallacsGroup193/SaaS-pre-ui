import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/notifications', cors: true })
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const { tenantId } = client.handshake.auth;
    if (tenantId) client.join(`tenant:${tenantId}`);
  }

  emitToTenant(tenantId: string, notification: any) {
    this.server.to(`tenant:${tenantId}`).emit('notification', notification);
  }
}