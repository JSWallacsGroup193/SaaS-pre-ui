import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { EstimateResponseDto } from './dto/estimate-response.dto';
import { EstimateResponseSchema } from './aiEstimateValidator';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key',
});

@Injectable()
export class EstimatorService {
  async calculate(tenantId: string, dto: CreateEstimateDto): Promise<EstimateResponseDto> {
    const promptPath = path.join(process.cwd(), 'backend', 'prompts', 'AI_Cost_Estimator_Prompt.md');
    const systemPrompt = fs.readFileSync(promptPath, 'utf8');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(dto) },
      ],
      response_format: { type: 'json_object' },
    });

    const aiResponse = response.choices[0].message?.content;
    if (!aiResponse) {
      throw new InternalServerErrorException('AI returned empty response');
    }

    let parsed;
    try {
      const raw = JSON.parse(aiResponse);
      parsed = EstimateResponseSchema.parse(raw);
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new InternalServerErrorException('AI response not valid JSON');
      }
      if (err.name === 'ZodError') {
        throw new BadRequestException('AI response failed schema validation');
      }
      throw new InternalServerErrorException('Unknown AI parsing error');
    }

    await prisma.estimate.create({
      data: {
        tenantId,
        estimateMode: dto.estimateMode,
        inputData: dto as any,
        outputData: parsed as any,
        totalEstimate: parsed.internal_calculations.totalCost,
        finalPrice: parsed.customer_summary.finalPrice,
        profitMargin: parsed.internal_calculations.profitMargin,
      },
    });

    return parsed;
  }
}
