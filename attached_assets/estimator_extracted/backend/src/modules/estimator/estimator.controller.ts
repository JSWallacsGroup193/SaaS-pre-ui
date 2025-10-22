import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { EstimatorService } from './estimator.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { EstimateResponseDto } from './dto/estimate-response.dto';

@Controller('api/v1/estimator')
export class EstimatorController {
  constructor(private readonly estimatorService: EstimatorService) {}

  @Post('calculate')
  @UseGuards(JwtAuthGuard)
  async calculateEstimate(
    @Request() req,
    @Body() dto: CreateEstimateDto
  ): Promise<EstimateResponseDto> {
    const tenantId = req.user.tenantId;
    return this.estimatorService.calculate(tenantId, dto);
  }
}