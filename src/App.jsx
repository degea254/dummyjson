import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/productApi";

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <h1> Loading products...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <div>
      <h1>My Products</h1>

      {data.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>Price: ${product.price}</p>

          <img src={product.thumbnail} alt={product.title} width="150" />
        </div>
      ))}
    </div>
  );
}

export default App;
