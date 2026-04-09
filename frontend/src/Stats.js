import React, { useEffect, useState, useCallback } from 'react';

export default function Stats() {
  const [stats, setStats] = useState(null);

  const fetchStats = useCallback(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!stats) return <div>Loading...</div>;
  return (
    <div>
      <h2>Stats</h2>
      <div>Total products: {stats.count}</div>
      <div>Backend instance: <strong>{stats.instanceId}</strong></div>
      <button onClick={fetchStats} style={{ marginTop: '10px' }}>Refresh stats</button>
    </div>
  );
}
