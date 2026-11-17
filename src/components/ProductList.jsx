import useProductsStore from "../stores/ProductStore";

function ProductList({ products }) {
  const favourites = useProductsStore((state) => state.favourites);

  const toggleFavourites = useProductsStore((state) => state.toggleFavourites);

  return (
    <div>
      {products.map((product) => {
        //checks whether the id appears in the favourites
        const isFavourite = favourites.includes(product.id);

        return (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} width="150" />
            <h3>{product.title}</h3>

            <p>${product.price}</p>

            <button onClick={() => toggleFavourites(product.id)}>
              {isFavourite ? "remove product" : "Add product"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
