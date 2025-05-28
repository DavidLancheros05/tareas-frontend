import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Estadisticas from './estadisticas';

const API_URL = 'https://tareas-backend-cid6.onrender.com/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [stats, setStats] = useState(null);

  // Carga tareas y estadísticas al iniciar
  useEffect(() => {
    cargarTareas();
    cargarEstadisticas();
  }, []);

  const cargarTareas = () => {
    axios.get(API_URL)
      .then(res => setTareas(res.data))
      .catch(err => console.error("Error cargando tareas:", err));
  };

  const cargarEstadisticas = () => {
    axios.get(`${API_URL}/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error("Error cargando estadísticas:", err));
  };

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    axios.post(API_URL, { texto: nuevaTarea })
      .then(res => {
        setTareas([...tareas, res.data]);
        setNuevaTarea('');
        cargarEstadisticas(); // Actualiza estadísticas tras agregar
      })
      .catch(err => console.error("Error agregando tarea:", err));
  };

  const toggleTarea = (id) => {
    axios.put(`${API_URL}/${id}`)
      .then(res => {
        setTareas(tareas.map(t => t._id === id ? res.data : t));
        cargarEstadisticas(); // Actualiza estadísticas tras cambiar estado
      })
      .catch(err => console.error("Error actualizando tarea:", err));
  };

  const eliminarTarea = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTareas(tareas.filter(t => t._id !== id));
        cargarEstadisticas(); // Actualiza estadísticas tras eliminar
      })
      .catch(err => console.error("Error eliminando tarea:", err));
  };

  return (
    <div className="app">
      <h1>Mis Tareas</h1>

      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map(tarea => (
          <li key={tarea._id}>
            <span
              onClick={() => toggleTarea(tarea._id)}
              style={{
                textDecoration: tarea.completada ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {tarea.texto}
            </span>
            <button onClick={() => eliminarTarea(tarea._id)}>❌</button>
          </li>
        ))}
      </ul>

      <estadisticas stats={stats} />

    </div>
    
  );
}

export default App;
