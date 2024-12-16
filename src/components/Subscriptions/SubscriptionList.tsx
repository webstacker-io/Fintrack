import React from 'react';
import { Subscription } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Calendar } from 'lucide-react';

interface Props {
  subscriptions: Subscription[];
}

export function SubscriptionList({ subscriptions }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{subscription.name}</p>
                  <p className="text-sm text-gray-500">{subscription.billingCycle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${subscription.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Next: {formatDate(subscription.nextBillingDate)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}