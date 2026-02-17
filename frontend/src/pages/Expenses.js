import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const EXPENSE_CATEGORIES = ['Food', 'Utilities', 'Transport', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    category: 'Food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/transactions`);
      setExpenses(res.data.filter(t => t.type === 'expense'));
    } catch {
      setError('Failed to load expenses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    try {
      await axios.post(`${API}/api/transactions`, { ...form, type: 'expense', amount: Number(form.amount) });
      setSuccess('Expense added successfully!');
      setForm({ category: 'Food', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      fetchExpenses();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to add expense. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/transactions/${id}`);
      setExpenses(expenses.filter(e => e.id !== id));
    } catch {
      setError('Failed to delete expense.');
    }
  };

  return (
    <div className="page" data-cy="expenses-page">
      <h2>Expenses</h2>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title">Add New Expense</div>
        {error && <div className="error-msg" data-cy="expense-error">{error}</div>}
        {success && <div className="success-msg" data-cy="expense-success">{success}</div>}

        <form onSubmit={handleSubmit} data-cy="expense-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} data-cy="expense-category">
                {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                data-cy="expense-amount"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description"
                data-cy="expense-description"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                data-cy="expense-date"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" data-cy="expense-submit">
            Add Expense
          </button>
        </form>
      </div>

      <div className="card">
        <div className="section-title">Expense History</div>
        {loading ? (
          <div className="loading">Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="empty-state" data-cy="no-expenses">No expenses recorded yet.</div>
        ) : (
          <table className="transactions-table" data-cy="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id} data-cy={`expense-row-${exp.id}`}>
                  <td>{exp.date}</td>
                  <td>{exp.category}</td>
                  <td>{exp.description}</td>
                  <td className="amount-expense">-${exp.amount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(exp.id)}
                      data-cy={`delete-expense-${exp.id}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Expenses;
