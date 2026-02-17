import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Transactions from './pages/Transactions';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigate = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':   return <Dashboard />;
      case 'expenses':    return <Expenses />;
      case 'income':      return <Income />;
      case 'transactions': return <Transactions />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav>
        <h1>💰 Finance Tracker</h1>
        <a
          href="#dashboard"
          className={currentPage === 'dashboard' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigate('dashboard'); }}
          data-cy="nav-dashboard"
        >
          Dashboard
        </a>
        <a
          href="#expenses"
          className={currentPage === 'expenses' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigate('expenses'); }}
          data-cy="nav-expenses"
        >
          Expenses
        </a>
        <a
          href="#income"
          className={currentPage === 'income' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigate('income'); }}
          data-cy="nav-income"
        >
          Income
        </a>
        <a
          href="#transactions"
          className={currentPage === 'transactions' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); navigate('transactions'); }}
          data-cy="nav-transactions"
        >
          All Transactions
        </a>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
