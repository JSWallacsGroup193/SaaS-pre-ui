import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { EventEmitter } from 'events';

// Polyfill for Node.js 22 compatibility
// Node.js 22 removed EventEmitter.listeners(), but engine.io still uses it
if (!EventEmitter.prototype.listeners) {
  EventEmitter.prototype.listeners = function(eventName: string | symbol) {
    return this.rawListeners(eventName);
  };
}

export class CustomSocketIoAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    // Create Socket.IO server with CORS enabled
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
        credentials: true,
      },
      path: '/notifications/socket.io',
    });
    
    return server;
  }
}
