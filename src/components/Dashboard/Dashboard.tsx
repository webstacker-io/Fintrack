import { summary, expenses, subscriptions } from "../../data/mockData"
import { ExpenseList } from "../Expenses/ExpenseList"
import { SubscriptionList } from "../Subscriptions/SubscriptionList"
import { ExpenseSummary } from "./ExpenseSummary"

const Dashboard = () => {
    return(
        <div className="space-y-6">
            <ExpenseSummary summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ExpenseList expenses={expenses} />
              </div>
              <div>
                <SubscriptionList subscriptions={subscriptions} />
              </div>
            </div>
          </div>
    )
}

export default Dashboard;