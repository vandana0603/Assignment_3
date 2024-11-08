import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  
  // Fetch data based on the selected month
  const fetchData = async () => {
    try {
      const transactionsResponse = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);
      setTransactions(transactionsResponse.data);

      const statsResponse = await axios.get(`http://localhost:5000/api/statistics?month=${month}`);
      setStatistics(statsResponse.data);

      const barChartResponse = await axios.get(`http://localhost:5000/api/barChart?month=${month}`);
      setBarChartData(barChartResponse.data);
      
      const response = await axios.get(`http://localhost:5000/api/transactions?month=${month}`);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      
      <TransactionTable transactions={transactions} />
      <Statistics statistics={statistics} />
      <BarChart data={barChartData} />
    </div>
  );
};

export default App;
