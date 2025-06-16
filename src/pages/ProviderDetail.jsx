import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProviderDetail.css';

export default function ProviderDetail() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const match = data.find(p => p.id.toString() === id);
        if (match) setProvider(match);
        else setError('Provider not found');
      });
  }, [id]);

  if (error) return <div className="provider-detail"><h2>{error}</h2><Link to="/">Back to List</Link></div>;
  if (!provider) return <div className="provider-detail">Loading...</div>;

  return (
    <div className="provider-detail">
      <h1>{provider.name}</h1>
      <p><strong>{provider.specialization}</strong></p>
      <p>{provider.location}</p>
      <p>Rating: ⭐ {provider.rating}</p>
      <p>{provider.longDescription}</p>
      <p>Email: {provider.contactEmail}</p>
      <p>Phone: {provider.phoneNumber}</p>
      <Link to="/">⬅ Back to List</Link>
    </div>
  );
}
