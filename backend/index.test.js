const request = require('supertest');
const app = require('./index');

describe('GET /health', () => {
  it('powinien zwrócić status ok i uptime', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.uptime).toBe('number');
  });
});

describe('GET /api/stats', () => {
  it('powinien zwrócić count, instanceId, uptime, requestCount i serverTime', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('count');
    expect(res.body).toHaveProperty('instanceId');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('requestCount');
    expect(res.body).toHaveProperty('serverTime');
    expect(typeof res.body.count).toBe('number');
    expect(typeof res.body.uptime).toBe('number');
    expect(typeof res.body.requestCount).toBe('number');
    expect(typeof res.body.serverTime).toBe('string');
  });
});
