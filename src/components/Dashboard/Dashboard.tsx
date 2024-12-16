import { summary, expenses, subscriptions } from "../../data/mockData"
import { ExpenseWidget } from "../Expenses/ExpenseWidget"
import { SubscriptionList } from "../Subscriptions/SubscriptionList"
import { Summary } from "./Summary"

const Dashboard = () => {
    return(
        <div className="space-y-6">
            <Summary ExpenseSummary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ExpenseWidget expenses={expenses} />
              </div>
              <div>
                <SubscriptionList subscriptions={subscriptions} />
              </div>
            </div>
          </div>
    )
}

export default Dashboard;