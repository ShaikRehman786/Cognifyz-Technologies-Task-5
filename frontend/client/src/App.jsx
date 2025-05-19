import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Items</h1>
      <ItemForm onAdd={() => window.location.reload()} />
      <ItemList />
    </main>
  );
}

export default App;
