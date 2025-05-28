import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const Estadisticas = ({ stats }) => {
  if (!stats) return <p>Cargando estadísticas...</p>;

  // Calcular porcentaje de completadas, evitando división por cero
  const porcentaje = stats.total > 0 ? (stats.completadas / stats.total) * 100 : 0;

  const data = [
    { name: 'Completadas', value: stats.completadas },
    { name: 'Pendientes', value: stats.pendientes },
  ];

  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total: {stats.total}</p>
      <p>Completadas: {stats.completadas}</p>
      <p>Pendientes: {stats.pendientes}</p>
      <p>Porcentaje completadas: {porcentaje.toFixed(1)}%</p>  {/* Aquí uso porcentaje calculado */}

      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Estadisticas;
