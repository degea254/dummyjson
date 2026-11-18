import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/productApi";
import ProductList from "./components/ProductList";
import useProductsStore from "./stores/ProductStore";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const favourites = useProductsStore((state) => state.favourites);

  const selectedProductId = useProductsStore((state) => state.selectedProductId);
  const setSelectedProductId = useProductsStore(
    (state) => state.setSelectedProductId,
  );

  if (isLoading) {
    return <main className="app-shell"><p className="status-message">Loading products...</p></main>;
  }

  if (isError) {
    return <main className="app-shell"><p className="status-message">Failed to fetch products</p></main>;
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 className="app-title">My Products</h1>
        <p className="favourites-count">Favourites: {favourites.length}</p>
      </header>

      {selectedProductId !== null ? (
        <ProductDetails
          id={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      ) : (
        <>
          <ProductList products={data} />
        </>
      )}
    </main>
  );
}

export default App;
