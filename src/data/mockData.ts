import { Expense, Subscription, ExpenseSummary } from '../types';

export const expenses: Expense[] = [
  {
    id: '1',
    amount: 85.50,
    description: 'Grocery shopping',
    category: 'Food',
    date: '2024-03-15'
  },
  {
    id: '2',
    amount: 45.00,
    description: 'Gas station',
    category: 'Transportation',
    date: '2024-03-14'
  },
  {
    id: '3',
    amount: 120.00,
    description: 'Electric bill',
    category: 'Utilities',
    date: '2024-03-10'
  }
];

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-01'
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-04-05'
  }
];

export const summary: ExpenseSummary = {
  totalExpenses: 850.49,
  monthlyAverage: 720.30,
  topCategory: 'Food',
  monthlyChange: 5.2
};