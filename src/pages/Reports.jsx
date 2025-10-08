import { useEffect, useState } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#3b82f6","#10b981","#f59e0b","#ef4444",
  "#6366f1","#14b8a6","#f472b6","#a855f7",
  "#22d3ee","#d946ef","#94a3b8"
];

export default function Reports() {
  const [data, setData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchExpenses = async () => {
      const userRef = doc(db, "users", user.uid);
      const expensesRef = collection(userRef, "expenses");
      const snap = await getDocs(expensesRef);
      const expenses = snap.docs.map(d => d.data());
      const grouped = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});
      setData(Object.entries(grouped).map(([name, value]) => ({ name, value })));
    };
    fetchExpenses();
  }, [user]);

  return (
    <div className="report-container">
      <h1>📊 Your Expense Report</h1>
      {data.length === 0 ? <p>No data yet</p> :
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={150} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      }
    </div>
  );
}
