import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Estadisticas from './Estadisticas';  // Importa el componente

const API_URL = 'https://tareas-backend-cid6.onrender.com/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setTareas(res.data);
      })
      .catch(error => console.error("Error cargando tareas:", error));

    axios.get(`${API_URL}/stats`)
      .then(res => setStats(res.data))
      .catch(err => console.error("Error cargando estadísticas:", err));
  }, []);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    axios.post(API_URL, { texto: nuevaTarea })
      .then((res) => {
        setTareas([...tareas, res.data]);
        setNuevaTarea('');
      })
      .catch(error => {
        console.error("Error agregando tarea:", error);
      });
  };

  const toggleTarea = (id) => {
    axios.put(`${API_URL}/${id}`)
      .then((res) => {
        setTareas(tareas.map(t => t._id === id ? res.data : t));
      })
      .catch(error => console.error("Error actualizando tarea:", error));
  };

  const eliminarTarea = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTareas(tareas.filter(t => t._id !== id));
      })
      .catch(error => console.error("Error eliminando tarea:", error));
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

      {/* Usamos el componente Estadisticas aquí */}
      <Estadisticas stats={stats} />

      <ul>
        {tareas.map((tarea) => (
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
    </div>
  );
}

export default App;
