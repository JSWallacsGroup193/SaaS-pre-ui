import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class CustomSocketIoAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    // Create Socket.IO server without attaching to HTTP server
    // This avoids the listeners() compatibility issue with Node.js 22
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    
    return server;
  }
}
