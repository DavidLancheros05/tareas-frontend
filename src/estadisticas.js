// src/Estadisticas.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

function Estadisticas() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('https://tareas-backend-cid6.onrender.com/estadisticas')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error cargando estadísticas:', err));
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  const data = [
    { name: 'Completadas', value: stats.completadas },
    { name: 'Pendientes', value: stats.pendientes },
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Estadísticas</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Estadisticas;
