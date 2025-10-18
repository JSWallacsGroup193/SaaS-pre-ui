import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScannerService } from './service';
import { AuthenticatedRequest } from '../../common/request.types';

@ApiTags('scanner')
@ApiBearerAuth()
@Controller('scanner')
export class ScannerController {
  constructor(private readonly service: ScannerService) {}

  @Get(':barcode')
  async scan(@Param('barcode') barcode: string, @Req() req: AuthenticatedRequest) {
    const tenantId = req.user?.tenantId || String(req.query?.tenantId || '');
    return this.service.scan(tenantId, barcode);
  }
}
