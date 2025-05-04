// This is a simple utility function test
function sum(a, b) {
  return a + b;
}

describe('Utility Functions', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});