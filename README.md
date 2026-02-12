# 💰 Personal Finance Tracker — CI Pipeline

A modular Personal Finance Tracker with separate **Dashboard**, **Expenses**, and **Income** modules, each tested independently via a GitHub Actions CI pipeline with parallel jobs.

---

## 📁 Project Structure

```
personal-finance-tracker/
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions CI Pipeline
├── dashboard/
│   ├── index.js                ← Dashboard logic
│   ├── dashboard.test.js       ← Dashboard tests
│   └── package.json
├── expenses/
│   ├── index.js                ← Expenses logic
│   ├── expenses.test.js        ← Expenses tests
│   └── package.json
├── income/
│   ├── index.js                ← Income logic
│   ├── income.test.js          ← Income tests
│   └── package.json
├── app.js                      ← Main application entry
├── package.json                ← Root scripts
└── README.md
```

---

## 🚀 VS Code Terminal Commands

### Step 1 — Open VS Code Terminal
```
Ctrl + ` (backtick)
```

### Step 2 — Navigate to project folder
```bash
cd personal-finance-tracker
```

### Step 3 — Install dependencies for each module
```bash
cd dashboard && npm install
cd ../expenses && npm install
cd ../income && npm install
cd ..
```

### Step 4 — Run tests for each module independently
```bash
# Test Dashboard only
cd dashboard && npm test

# Test Expenses only
cd expenses && npm test

# Test Income only
cd income && npm test

# Go back to root
cd ..
```

### Step 5 — Run all tests from root
```bash
npm run test:all
```

### Step 6 — Run the full application build
```bash
node app.js
```

---

## 🔧 Git & GitHub Actions Setup

### Initialize Git repository
```bash
git init
git add .
git commit -m "Initial commit: Personal Finance Tracker with CI pipeline"
```

### Connect to GitHub (replace with your repo URL)
```bash
git remote add origin https://github.com/YOUR_USERNAME/personal-finance-tracker.git
git branch -M main
git push -u origin main
```

> ✅ Once pushed, GitHub Actions will automatically trigger the CI pipeline!

---

## 🔄 CI Pipeline Overview

| Job              | Runs On        | Node Versions Tested  | Condition              |
|------------------|----------------|-----------------------|------------------------|
| test-dashboard   | ubuntu-latest  | 18.x, 20.x, 22.x      | On every push/PR       |
| test-expenses    | ubuntu-latest  | 18.x, 20.x, 22.x      | On every push/PR       |
| test-income      | ubuntu-latest  | 18.x, 20.x, 22.x      | On every push/PR       |
| **build**        | ubuntu-latest  | 20.x (LTS)            | **Only if ALL 3 pass** |

### Key Features:
- ✅ **Parallel jobs** — Dashboard, Expenses, and Income tests run simultaneously
- ✅ **Matrix strategy** — Tests run on Node.js 18, 20, and 22
- ✅ **Build gate** — Final build job runs ONLY if all test jobs succeed (`needs` + `if: success()`)
- ✅ **Artifacts** — Test results and coverage reports stored as CI artifacts (30-day retention)

---

## 📊 Module Functions

### Dashboard
| Function | Description |
|----------|-------------|
| `calculateBalance(income, expenses)` | Returns net balance |
| `generateSummary(income, expenses)` | Returns full summary with status |
| `getSavingsRate(income, expenses)` | Returns savings % |

### Expenses
| Function | Description |
|----------|-------------|
| `addExpense(expenses, expense)` | Adds new expense record |
| `getTotalExpenses(expenses)` | Sums all expenses |
| `getExpensesByCategory(expenses)` | Groups expenses by category |
| `filterExpensesByAmount(expenses, threshold)` | Filters by amount threshold |

### Income
| Function | Description |
|----------|-------------|
| `addIncome(incomes, income)` | Adds new income record |
| `getTotalIncome(incomes)` | Sums all income |
| `getIncomeBySource(incomes)` | Groups income by source |
| `projectAnnualIncome(monthlyIncome)` | Projects yearly income |
