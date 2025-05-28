function Estadisticas({ stats }) {
  if (!stats) return null; // No mostrar nada si no hay datos aún

  return (
    <div className="stats">
      <h2>Estadísticas</h2>
      <p>Total: {stats.total}</p>
      <p>Completadas: {stats.completadas}</p>
      <p>Pendientes: {stats.pendientes}</p>
      <p>Porcentaje completado: {stats.porcentaje.toFixed(2)}%</p>
    </div>
  );
}

export default Estadisticas;
