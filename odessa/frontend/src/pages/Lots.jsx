import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Lots() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/api/lots');
        setLots(res.data);
      } catch (err) {
        console.error('Error cargando lotes:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Cargando lotes...</div>;
  return (
    <div style={{maxWidth:800, margin:'2rem auto'}}>
      <h2>Lotes</h2>
      <ul>
        {lots.map(l => (
          <li key={l.id} style={{padding:'0.5rem 0', borderBottom:'1px solid #eee'}}>
            <strong>{l.name}</strong> — {l.location} — ${l.price} — {l.size} m²
            <p>{l.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { fetchLots } from '../services/api';

export default function Lots() {
  const [lots, setLots] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchLots(token).then(setLots).catch(err=>console.error(err));
  }, []);
  return (
    <div>
      <h2>Lista de Lotes</h2>
      {lots.map(l => (
        <div key={l.id}>
          <h3>{l.name} — ${l.price}</h3>
          <p>{l.location} • {l.size} m²</p>
          <p>{l.description}</p>
        </div>
      ))}
    </div>
  );
}
