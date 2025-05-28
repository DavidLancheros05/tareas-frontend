import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Estadisticas from './Estadisticas.jsx';
import { io } from 'socket.io-client';

const socket = io('https://tareas-backend-cid6.onrender.com'); // cambia si estás en local
const API_URL = 'https://tareas-backend-cid6.onrender.com/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [stats, setStats] = useState(null);

useEffect(() => {
  cargarTareas();
  cargarEstadisticas();

  // 🔄 Escuchar eventos
  socket.on('tareaAgregada', tarea => {
    setTareas(prev => [...prev, tarea]);
    cargarEstadisticas();
  });

  socket.on('tareaActualizada', tarea => {
    setTareas(prev => prev.map(t => t._id === tarea._id ? tarea : t));
    cargarEstadisticas();
  });

  socket.on('tareaEliminada', id => {
    setTareas(prev => prev.filter(t => t._id !== id));
    cargarEstadisticas();
  });

  return () => {
    socket.off('tareaAgregada');
    socket.off('tareaActualizada');
    socket.off('tareaEliminada');
  };
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
        cargarEstadisticas();
      })
      .catch(err => console.error("Error agregando tarea:", err));
  };

  const toggleTarea = (id) => {
    const tareaActual = tareas.find(t => t._id === id);
    axios.put(`${API_URL}/${id}`, { completada: !tareaActual.completada })
      .then(res => {
        setTareas(tareas.map(t => t._id === id ? res.data : t));
        cargarEstadisticas();
      })
      .catch(err => console.error("Error actualizando tarea:", err));
  };

  const eliminarTarea = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTareas(tareas.filter(t => t._id !== id));
        cargarEstadisticas();
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
              {tarea.texto} {tarea.completada ? '✅' : '❌'}
            </span>
            <button onClick={() => eliminarTarea(tarea._id)}>❌</button>
          </li>
        ))}
      </ul>

      {stats && <Estadisticas stats={stats} />}
    </div>
  );
}

export default App;
