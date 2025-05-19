import { useEffect, useState } from 'react';
import { fetchItems, addItem, updateItem, deleteItem } from '../api/itemService';
import '../styles/ItemsForm.css';

export default function ItemManager() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');


  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  // Add new item handler
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newItem = await addItem({ title: newTitle });
    setItems((prev) => [...prev, newItem]);
    setNewTitle('');
  };

  // Toggle done status
  const toggleDone = async (item) => {
    const updated = await updateItem(item._id, { done: !item.done });
    setItems((prev) =>
      prev.map((it) => (it._id === updated._id ? updated : it))
    );
  };

  // Delete item
  const remove = async (id) => {
    await deleteItem(id);
    setItems((prev) => prev.filter((it) => it._id !== id));
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
  };

  // Save edited item
  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    const updated = await updateItem(id, { title: editTitle });
    setItems((prev) =>
      prev.map((it) => (it._id === updated._id ? updated : it))
    );
    setEditingId(null);
    setEditTitle('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>

      {/* Add new item form */}
      <form className="flex gap-2" onSubmit={handleAdd}>
        <input
          className="border p-2 flex-1"
          placeholder="Add new item"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* List of items */}
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {editingId === item._id ? (
              <>
                <input
                  className="border p-1 flex-1 mr-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button
                  className="mr-2 text-green-600"
                  onClick={() => saveEdit(item._id)}
                >
                  Save
                </button>
                <button className="text-red-600" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleDone(item)}
                  className={`flex-1 cursor-pointer ${
                    item.done ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {item.title}
                </span>
                <button className="mr-2" onClick={() => startEditing(item)}>
                  ✏️
                </button>
                <button onClick={() => remove(item._id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
