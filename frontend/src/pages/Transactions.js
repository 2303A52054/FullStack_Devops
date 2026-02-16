import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/transactions`);
      setTransactions(res.data);
    } catch {
      setError('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/transactions/${id}`);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete transaction.');
    }
  };

  const filtered = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <div className="page" data-cy="transactions-page">
      <h2>All Transactions</h2>

      {error && <div className="error-msg">{error}</div>}

      <div className="card">
        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: '#555', fontSize: '0.9rem' }}>Filter:</span>
          {['all', 'income', 'expense'].map(f => (
            <button
              key={f}
              className={`btn ${filter === f ? 'btn-primary' : ''}`}
              style={filter !== f ? { background: '#f0f2f5', color: '#555', border: '1.5px solid #e0e0e0' } : {}}
              onClick={() => setFilter(f)}
              data-cy={`filter-${f}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', color: '#888', fontSize: '0.85rem' }}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div className="loading">Loading transactions...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state" data-cy="no-transactions">No transactions found.</div>
        ) : (
          <table className="transactions-table" data-cy="all-transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} data-cy={`transaction-row-${tx.id}`}>
                  <td>{tx.date}</td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                  </td>
                  <td>{tx.category}</td>
                  <td>{tx.description}</td>
                  <td className={`amount-${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tx.id)}
                      data-cy={`delete-tx-${tx.id}`}
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

export default Transactions;
