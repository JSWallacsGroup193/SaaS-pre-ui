import NodeEnvironment from 'jest-environment-node';
import type { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';

/**
 * Custom Jest test environment for Prisma
 * This sets up the database connection for testing
 */
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
  }

  async setup() {
    await super.setup();
    
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    
    // You can set a separate test database URL here if needed
    // process.env.DATABASE_URL = 'postgresql://test_user:test_pass@localhost:5432/hvac_test';
  }

  async teardown() {
    await super.teardown();
  }
}

export default PrismaTestEnvironment;
