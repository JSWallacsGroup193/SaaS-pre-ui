import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: 'notifications',
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    const { userId, tenantId } = client.handshake.auth;
    
    if (userId && tenantId) {
      this.userSockets.set(userId, client.id);
      client.join(`tenant:${tenantId}`);
      client.join(`user:${userId}`);
      console.log(`[WebSocket] User ${userId} connected to tenant ${tenantId}`);
    } else {
      console.log('[WebSocket] Connection rejected - missing auth');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const { userId } = client.handshake.auth;
    if (userId) {
      this.userSockets.delete(userId);
      console.log(`[WebSocket] User ${userId} disconnected`);
    }
  }

  // Send notification to specific user
  emitToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // Send notification to all users in a tenant
  emitToTenant(tenantId: string, notification: any) {
    this.server.to(`tenant:${tenantId}`).emit('notification', notification);
  }

  // Check if user is online
  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }
}
