import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Rental', 'Gift', 'Other'];

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    category: 'Salary',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchIncomes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/transactions`);
      setIncomes(res.data.filter(t => t.type === 'income'));
    } catch {
      setError('Failed to load income records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
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
      await axios.post(`${API}/api/transactions`, { ...form, type: 'income', amount: Number(form.amount) });
      setSuccess('Income record added successfully!');
      setForm({ category: 'Salary', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      fetchIncomes();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to add income record. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/transactions/${id}`);
      setIncomes(incomes.filter(i => i.id !== id));
    } catch {
      setError('Failed to delete income record.');
    }
  };

  return (
    <div className="page" data-cy="income-page">
      <h2>Income</h2>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title">Add New Income</div>
        {error && <div className="error-msg" data-cy="income-error">{error}</div>}
        {success && <div className="success-msg" data-cy="income-success">{success}</div>}

        <form onSubmit={handleSubmit} data-cy="income-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} data-cy="income-category">
                {INCOME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                data-cy="income-amount"
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
                data-cy="income-description"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                data-cy="income-date"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success" data-cy="income-submit">
            Add Income
          </button>
        </form>
      </div>

      <div className="card">
        <div className="section-title">Income History</div>
        {loading ? (
          <div className="loading">Loading income records...</div>
        ) : incomes.length === 0 ? (
          <div className="empty-state" data-cy="no-income">No income records yet.</div>
        ) : (
          <table className="transactions-table" data-cy="income-table">
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
              {incomes.map(inc => (
                <tr key={inc.id} data-cy={`income-row-${inc.id}`}>
                  <td>{inc.date}</td>
                  <td>{inc.category}</td>
                  <td>{inc.description}</td>
                  <td className="amount-income">+${inc.amount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(inc.id)}
                      data-cy={`delete-income-${inc.id}`}
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

export default Income;
