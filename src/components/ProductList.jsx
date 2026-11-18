import useProductsStore from "../stores/ProductStore";

function ProductList({ products }) {
  const favourites = useProductsStore((state) => state.favourites);
  const toggleFavourites = useProductsStore((state) => state.toggleFavourites);

  const search = useProductsStore((state) => state.search);
  const category = useProductsStore((state) => state.category);

  const setSearch = useProductsStore((state) => state.setSearch);
  const setCategory = useProductsStore((state) => state.setCategory);

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">all Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h2>showing {filteredProducts.length} products</h2>

      {filteredProducts.length === 0 && <p>No products found</p>}

      {filteredProducts.map((product) => {
        const isFavourite = favourites.includes(product.id);

        return (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} width="150" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Category: {product.category}</p>

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
