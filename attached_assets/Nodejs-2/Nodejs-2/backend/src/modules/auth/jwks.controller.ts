import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('.well-known/jwks.json')
export class JwksController {
  @Get()
  get() {
    // Static empty JWKS placeholder. Replace with real key mgmt in prod.
    return { keys: [] };
  }
}
