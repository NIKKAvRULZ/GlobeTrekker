const request = require('supertest');
const express = require('express');
const app = express();

// Mock your routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Server API', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});