import useProductsStore from "./stores/ProductStore";
import "./App.css";

function App() {
  const favourites = useProductsStore((state) => state.favourites);

  const addFavourite = useProductsStore((state) => state.addFavourite);

  const removeFavourite = useProductsStore((state) => state.removeFavourite);

  return (
    <div>
      <h1>My Favourites</h1>

      <h2>Total: {favourites.length}</h2>

      <button onClick={() => addFavourite(1)}>Add Product 1</button>

      <button onClick={() => removeFavourite(1)}>Remove Product 1</button>

      <h3>Favourite IDs:</h3>

      {favourites.map((id) => (
        <p key={id}>Product {id}</p>
      ))}
    </div>
  );
}

export default App;
