import { useEffect, useState } from 'react';
import { fetchItems, updateItem, deleteItem } from '../api/itemService';

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const toggleDone = async (item) => {
    const updated = await updateItem(item._id, { done: !item.done });
    setItems((prev) =>
      prev.map((it) => (it._id === updated._id ? updated : it))
    );
  };

  const remove = async (id) => {
    await deleteItem(id);
    setItems((prev) => prev.filter((it) => it._id !== id));
  };

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item._id}
          className="flex justify-between items-center border p-2 rounded"
        >
          <span
            onClick={() => toggleDone(item)}
            className={`flex-1 cursor-pointer ${
              item.done ? 'line-through text-gray-400' : ''
            }`}
          >
            {item.title}
          </span>
          <button onClick={() => remove(item._id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}
