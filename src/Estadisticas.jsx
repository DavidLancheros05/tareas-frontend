import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://tareas-backend-cid6.onrender.com/tareas/stats';

function Estadisticas() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setStats(res.data))
      .catch(err => console.error("Error cargando estadísticas:", err));
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div className="Estadisticas">
      <h2>Estadísticas</h2>
      <p>Total de tareas: {stats.total}</p>
      <p>Completadas: {stats.completadas}</p>
      <p>Pendientes: {stats.pendientes}</p>
      <p>Porcentaje completado: {stats.porcentaje.toFixed(2)}%</p>
    </div>
  );
}

export default Estadisticas;