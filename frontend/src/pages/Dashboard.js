import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/summary`);
      setSummary(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard data. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="page" data-cy="dashboard-page">
      <h2>Dashboard</h2>

      {error && <div className="error-msg" data-cy="dashboard-error">{error}</div>}

      {loading ? (
        <div className="loading" data-cy="dashboard-loading">Loading dashboard data...</div>
      ) : summary ? (
        <>
          <div className="summary-grid" data-cy="summary-grid">
            <div className="summary-card income" data-cy="total-income-card">
              <h3>Total Income</h3>
              <div className="amount" data-cy="total-income">${summary.totalIncome.toFixed(2)}</div>
            </div>
            <div className="summary-card expense" data-cy="total-expenses-card">
              <h3>Total Expenses</h3>
              <div className="amount" data-cy="total-expenses">${summary.totalExpenses.toFixed(2)}</div>
            </div>
            <div className="summary-card balance" data-cy="balance-card">
              <h3>Net Balance</h3>
              <div className="amount" data-cy="net-balance">${summary.balance.toFixed(2)}</div>
            </div>
            <div className="summary-card count" data-cy="count-card">
              <h3>Transactions</h3>
              <div className="amount" data-cy="transaction-count">{summary.transactionCount}</div>
            </div>
          </div>

          <div className="card">
            <div className="section-title">Recent Transactions</div>
            {summary.recentTransactions.length === 0 ? (
              <div className="empty-state">No recent transactions.</div>
            ) : (
              <table className="transactions-table" data-cy="recent-transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentTransactions.map(tx => (
                    <tr key={tx.id} data-cy={`recent-tx-${tx.id}`}>
                      <td>{tx.date}</td>
                      <td>
                        <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                      </td>
                      <td>{tx.category}</td>
                      <td>{tx.description}</td>
                      <td className={`amount-${tx.type}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;
