import * as Joi from 'joi';
export const configValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().optional(),
  CORS_ORIGIN: Joi.string().default('http://localhost:5173'),
  NODE_ENV: Joi.string().valid('development','test','production').default('development'),
});
