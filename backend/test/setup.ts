/**
 * Global test setup
 * Runs once before all tests
 */

// Increase timeout for database operations
jest.setTimeout(10000);

// Mock environment variables if needed
process.env.JWT_SECRET = 'test-secret-key';
process.env.NODE_ENV = 'test';
