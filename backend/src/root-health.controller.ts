import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class RootHealthController {
  @Get()
  @ApiExcludeEndpoint()
  getHealth() {
    return { status: 'ok' };
  }
}
