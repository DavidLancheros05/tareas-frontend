import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

// Cambia esta URL por la de tu backend en Render
const API_URL = 'https://tareas-app-4.onrender.com/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setTareas(res.data);
      })
      .catch(error => console.error("Error cargando tareas:", error));
  }, []);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    axios.post(API_URL, { texto: nuevaTarea })
      .then((res) => {
        setTareas([...tareas, res.data]);
        setNuevaTarea('');
      })
      .catch(error => console.error("Error agregando tarea:", error));
  };

  const toggleTarea = (id) => {  // Cambiado a usar ID en lugar de índice
    axios.put(`${API_URL}/${id}`)
      .then((res) => {
        setTareas(tareas.map(t => t.id === id ? res.data : t));
      })
      .catch(error => console.error("Error actualizando tarea:", error));
  };

  const eliminarTarea = (id) => {  // Cambiado a usar ID en lugar de índice
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTareas(tareas.filter(t => t.id !== id));
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

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span
              onClick={() => toggleTarea(tarea.id)}
              style={{
                textDecoration: tarea.completada ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {tarea.texto}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;