// app.js
// Personal Finance Tracker - Main Application Entry Point

const { generateSummary, getSavingsRate } = require('./dashboard');
const { addExpense, getTotalExpenses, getExpensesByCategory } = require('./expenses');
const { addIncome, getTotalIncome, getIncomeBySource } = require('./income');

console.log('=========================================');
console.log('   Personal Finance Tracker - Build OK   ');
console.log('=========================================\n');

// ── Sample data ────────────────────────────────────────────────────────
let incomes = [];
incomes = addIncome(incomes, { source: 'Salary',    amount: 50000, description: 'Monthly salary'  });
incomes = addIncome(incomes, { source: 'Freelance', amount: 8000,  description: 'Project payment' });
incomes = addIncome(incomes, { source: 'Rental',    amount: 12000, description: 'Property rent'   });

let expenses = [];
expenses = addExpense(expenses, { category: 'Food',      amount: 8000,  description: 'Monthly groceries' });
expenses = addExpense(expenses, { category: 'Transport', amount: 4000,  description: 'Commute'           });
expenses = addExpense(expenses, { category: 'Utilities', amount: 6000,  description: 'Bills'             });
expenses = addExpense(expenses, { category: 'Rent',      amount: 15000, description: 'House rent'        });

// ── Calculations ───────────────────────────────────────────────────────
const totalIncome   = getTotalIncome(incomes);
const totalExpenses = getTotalExpenses(expenses);
const summary       = generateSummary(totalIncome, totalExpenses);
const savingsRate   = getSavingsRate(totalIncome, totalExpenses);

// ── Output ─────────────────────────────────────────────────────────────
console.log('INCOME BREAKDOWN:');
console.table(getIncomeBySource(incomes));

console.log('EXPENSE BREAKDOWN:');
console.table(getExpensesByCategory(expenses));

console.log('\nFINANCE SUMMARY:');
console.log(`  Total Income   : ₹${totalIncome.toLocaleString()}`);
console.log(`  Total Expenses : ₹${totalExpenses.toLocaleString()}`);
console.log(`  Net Balance    : ₹${summary.balance.toLocaleString()}`);
console.log(`  Status         : ${summary.status}`);
console.log(`  Savings Rate   : ${savingsRate}%`);
console.log('\n✅ All modules loaded and build completed successfully!');
