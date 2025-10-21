/**
 * Example test file
 * This demonstrates the testing setup is working
 */

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have access to environment variables', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.JWT_SECRET).toBeDefined();
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('test-data');
    expect(result).toBe('test-data');
  });
});
