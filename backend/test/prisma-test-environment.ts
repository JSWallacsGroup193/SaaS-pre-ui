import NodeEnvironment from 'jest-environment-node';
import { execSync } from 'child_process';
import crypto from 'crypto';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string = '';

  async setup() {
    await super.setup();
    this.schema = 'test_' + crypto.randomBytes(8).toString('hex');
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL not set');
    const postfix = url.includes('?') ? '&' : '?';
    const dbUrlWithSchema = `${url}${postfix}schema=${this.schema}`;
    process.env.DATABASE_URL = dbUrlWithSchema;
    (this.global as any).process.env.DATABASE_URL = dbUrlWithSchema;

    // Push schema
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: dbUrlWithSchema },
    });
  }

  async teardown() {
    try {
      const url = process.env.DATABASE_URL as string;
      if (url) {
        // Drop schema
        const match = url.match(/schema=([^&]+)/);
        const schema = match?.[1];
        if (schema) {
          const { Client } = await import('pg');
          const client = new Client({ connectionString: url });
          await client.connect();
          await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE;`);
          await client.end();
        }
      }
    } catch (e) {
      // ignore
    }
    await super.teardown();
  }
}
