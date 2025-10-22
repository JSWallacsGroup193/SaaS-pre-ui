import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { OpenAiService } from '../ai-chat/openai.service';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { EstimateResponseDto } from './dto/estimate-response.dto';
import { EstimateResponseSchema } from './aiEstimateValidator';
import * as fs from 'fs';

@Injectable()
export class EstimatorService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly prisma: PrismaService,
  ) {}

  async calculate(tenantId: string, dto: CreateEstimateDto): Promise<EstimateResponseDto> {
    const systemPrompt = fs.readFileSync('prompts/AI_Cost_Estimator_Prompt.md', 'utf8');

    const response = await this.openAiService.chatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(dto) },
      ],
      response_format: 'json',
    });

    let parsed;
    try {
      const raw = JSON.parse(response);
      parsed = EstimateResponseSchema.parse(raw);
    } catch (err) {
      if (err instanceof SyntaxError) throw new InternalServerErrorException('AI response not valid JSON');
      if (err.name === 'ZodError') throw new BadRequestException('AI response failed schema validation');
      throw new InternalServerErrorException('Unknown AI parsing error');
    }

    await this.prisma.estimate.create({
      data: {
        tenantId,
        estimateMode: dto.estimateMode,
        inputData: dto,
        outputData: parsed,
        totalEstimate: parsed.internal_calculations.totalCost,
        finalPrice: parsed.customer_summary.finalPrice,
        profitMargin: parsed.internal_calculations.profitMargin,
      },
    });

    return parsed;
  }
}