const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data store
let transactions = [
  { id: uuidv4(), type: 'income', category: 'Salary', amount: 3000, description: 'Monthly salary', date: '2024-01-01' },
  { id: uuidv4(), type: 'expense', category: 'Food', amount: 150, description: 'Groceries', date: '2024-01-02' },
  { id: uuidv4(), type: 'expense', category: 'Utilities', amount: 80, description: 'Electricity bill', date: '2024-01-03' }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// GET summary/dashboard data
app.get('/api/summary', (req, res) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  res.json({
    totalIncome,
    totalExpenses,
    balance,
    transactionCount: transactions.length,
    recentTransactions
  });
});

// POST - Add new transaction (expense or income)
app.post('/api/transactions', (req, res) => {
  const { type, category, amount, description, date } = req.body;

  if (!type || !['income', 'expense'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Must be "income" or "expense".' });
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }
  if (!category) {
    return res.status(400).json({ error: 'Category is required.' });
  }

  const newTransaction = {
    id: uuidv4(),
    type,
    category,
    amount: Number(amount),
    description: description || '',
    date: date || new Date().toISOString().split('T')[0]
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE - Remove a transaction
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Transaction not found.' });
  }

  transactions.splice(index, 1);
  res.json({ message: 'Transaction deleted successfully.' });
});

// Reset endpoint for testing
app.post('/api/reset', (req, res) => {
  transactions = [
    { id: uuidv4(), type: 'income', category: 'Salary', amount: 3000, description: 'Monthly salary', date: '2024-01-01' },
    { id: uuidv4(), type: 'expense', category: 'Food', amount: 150, description: 'Groceries', date: '2024-01-02' },
    { id: uuidv4(), type: 'expense', category: 'Utilities', amount: 80, description: 'Electricity bill', date: '2024-01-03' }
  ];
  res.json({ message: 'Data reset to defaults.' });
});

const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = { app, server };
