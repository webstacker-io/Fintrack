export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyAverage: number;
  topCategory: string;
  monthlyChange: number;
}