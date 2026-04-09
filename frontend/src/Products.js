import React, { useEffect, useState } from 'react';

export default function Products() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const addProduct = e => {
    e.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(item => setItems(items => [...items, item]));
    setName('');
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <form onSubmit={addProduct}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Product name" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
