const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/items';

export function fetchItems() {
  return fetch(API_URL).then(res => res.json());
}

export function addItem(data) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export function updateItem(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());
}

export function deleteItem(id) {
  return fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
