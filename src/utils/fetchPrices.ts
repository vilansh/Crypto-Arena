const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchLivePrices() {
  const url = `${API_BASE}/api/prices`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch prices');
  return res.json();
}