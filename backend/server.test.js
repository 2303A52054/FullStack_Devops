const request = require('supertest');
const { app, server } = require('./server');

describe('Finance Tracker API', () => {
  afterAll((done) => {
    server.close(done);
  });

  // ── Health Check ──────────────────────────────────────────────
  describe('GET /api/health', () => {
    it('should return status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  // ── GET Transactions ──────────────────────────────────────────
  describe('GET /api/transactions', () => {
    it('should return an array of transactions', async () => {
      const res = await request(app).get('/api/transactions');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return transactions with required fields', async () => {
      const res = await request(app).get('/api/transactions');
      res.body.forEach(tx => {
        expect(tx).toHaveProperty('id');
        expect(tx).toHaveProperty('type');
        expect(tx).toHaveProperty('category');
        expect(tx).toHaveProperty('amount');
        expect(tx).toHaveProperty('date');
      });
    });
  });

  // ── GET Summary ───────────────────────────────────────────────
  describe('GET /api/summary', () => {
    beforeEach(async () => {
      await request(app).post('/api/reset');
    });

    it('should return a summary object', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('totalIncome');
      expect(res.body).toHaveProperty('totalExpenses');
      expect(res.body).toHaveProperty('balance');
      expect(res.body).toHaveProperty('transactionCount');
      expect(res.body).toHaveProperty('recentTransactions');
    });

    it('should compute totalIncome correctly', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.body.totalIncome).toBe(3000);
    });

    it('should compute totalExpenses correctly', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.body.totalExpenses).toBe(230);
    });

    it('should compute balance as income minus expenses', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.body.balance).toBe(res.body.totalIncome - res.body.totalExpenses);
    });

    it('should return at most 5 recent transactions', async () => {
      const res = await request(app).get('/api/summary');
      expect(res.body.recentTransactions.length).toBeLessThanOrEqual(5);
    });
  });

  // ── POST /api/transactions ─────────────────────────────────────
  describe('POST /api/transactions', () => {
    beforeEach(async () => {
      await request(app).post('/api/reset');
    });

    it('should add a new expense successfully', async () => {
      const payload = { type: 'expense', category: 'Food', amount: 50, description: 'Test meal', date: '2024-03-01' };
      const res = await request(app).post('/api/transactions').send(payload);
      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.type).toBe('expense');
      expect(res.body.amount).toBe(50);
      expect(res.body.category).toBe('Food');
    });

    it('should add a new income successfully', async () => {
      const payload = { type: 'income', category: 'Salary', amount: 2500, description: 'Paycheck' };
      const res = await request(app).post('/api/transactions').send(payload);
      expect(res.statusCode).toBe(201);
      expect(res.body.type).toBe('income');
      expect(res.body.amount).toBe(2500);
    });

    it('should return 400 for invalid type', async () => {
      const res = await request(app)
        .post('/api/transactions')
        .send({ type: 'invalid', category: 'Food', amount: 50 });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/type/i);
    });

    it('should return 400 for negative amount', async () => {
      const res = await request(app)
        .post('/api/transactions')
        .send({ type: 'expense', category: 'Food', amount: -10 });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/amount/i);
    });

    it('should return 400 for missing category', async () => {
      const res = await request(app)
        .post('/api/transactions')
        .send({ type: 'expense', amount: 50 });
      expect(res.statusCode).toBe(400);
    });

    it('should update summary totals after adding a transaction', async () => {
      await request(app).post('/api/transactions').send({ type: 'income', category: 'Bonus', amount: 100 });
      const summary = await request(app).get('/api/summary');
      expect(summary.body.totalIncome).toBe(3100);
      expect(summary.body.balance).toBe(2870);
    });

    it('should increment transaction count in summary', async () => {
      const before = await request(app).get('/api/summary');
      const initialCount = before.body.transactionCount;

      await request(app).post('/api/transactions').send({ type: 'expense', category: 'Other', amount: 20 });

      const after = await request(app).get('/api/summary');
      expect(after.body.transactionCount).toBe(initialCount + 1);
    });
  });

  // ── DELETE /api/transactions/:id ──────────────────────────────
  describe('DELETE /api/transactions/:id', () => {
    beforeEach(async () => {
      await request(app).post('/api/reset');
    });

    it('should delete an existing transaction', async () => {
      const transactions = await request(app).get('/api/transactions');
      const id = transactions.body[0].id;

      const res = await request(app).delete(`/api/transactions/${id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);

      const after = await request(app).get('/api/transactions');
      expect(after.body.find(t => t.id === id)).toBeUndefined();
    });

    it('should return 404 for non-existent transaction', async () => {
      const res = await request(app).delete('/api/transactions/nonexistent-id-12345');
      expect(res.statusCode).toBe(404);
    });
  });

  // ── POST /api/reset ───────────────────────────────────────────
  describe('POST /api/reset', () => {
    it('should reset data to default state', async () => {
      await request(app).post('/api/transactions').send({ type: 'income', category: 'Other', amount: 9999 });

      const res = await request(app).post('/api/reset');
      expect(res.statusCode).toBe(200);

      const summary = await request(app).get('/api/summary');
      expect(summary.body.totalIncome).toBe(3000);
      expect(summary.body.transactionCount).toBe(3);
    });
  });
});
