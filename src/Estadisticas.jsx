import React from 'react';

function Estadisticas({ stats }) {
  return (
    <div className="estadisticas">
      <h2>Estadísticas</h2>
      <p>Total de tareas: {stats.total}</p>
      <p>Completadas: {stats.completadas}</p>
      <p>Pendientes: {stats.pendientes}</p>
    </div>
  );
}

export default Estadisticas;