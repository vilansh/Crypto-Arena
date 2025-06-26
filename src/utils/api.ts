const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function recordTrade(trade: any) {
  const res = await fetch(`${API_BASE}/api/trades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trade),
  });
  if (!res.ok) throw new Error('Failed to record trade');
  return res.json();
}

export async function fetchUserTrades(wallet: string) {
  const res = await fetch(`${API_BASE}/api/trades/${wallet}`);
  if (!res.ok) throw new Error('Failed to fetch user trades');
  return res.json();
}

export async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE}/api/leaderboard`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
} 