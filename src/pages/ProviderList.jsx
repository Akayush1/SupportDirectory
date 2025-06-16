import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './ProvderList.css';
const fetchProviders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('/data.json')
        .then(res => res.json())
        .then(resolve);
    }, 500);
  });
};

export default function ProviderList() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProviders().then(data => setProviders(data));
  }, []);

  const filtered = providers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="provider-list">
      <h1>Learning Support Providers</h1>
      <input
        type="text"
        placeholder="Search by name or specialization"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="list">
        {filtered.map((provider) => (
          <Link key={provider.id} to={`/providers/${provider.id}`} className="card">
            <h3>{provider.name}</h3>
            <p><strong>{provider.specialization}</strong></p>
            <p>{provider.location}</p>
            <p>Rating: ⭐ {provider.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
