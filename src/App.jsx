import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/productApi";
import ProductList from "./components/ProductList";
import useProductsStore from "./stores/ProductStore";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const favourites = useProductsStore((state) => state.favourites);

  if (isLoading) {
    return <h1> Loading products...</h1>;
  }

  if (isError) {
    return <h1>Failed to fetch products</h1>;
  }

  return (
    <div>
      <h1>My Products</h1>

      <h2>Total favourites: {favourites.length}</h2>

      <ProductList products={data} />
    </div>
  );
}

export default App;
