import React, { useEffect, useState, useCallback } from 'react';

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

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
      <div>Uptime: {formatUptime(stats.uptime)}</div>
      <div>Requests served: {stats.requestCount}</div>
      <div>Server time: {stats.serverTime}</div>
      <button onClick={fetchStats} style={{ marginTop: '10px' }}>Refresh stats</button>
    </div>
  );
}
