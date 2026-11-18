import useProductsStore from "../stores/ProductStore";
import "./ProductList.css";

function ProductList({ products }) {
  const favourites = useProductsStore((state) => state.favourites);
  const toggleFavourites = useProductsStore((state) => state.toggleFavourites);

  const search = useProductsStore((state) => state.search);
  const category = useProductsStore((state) => state.category);

  const setSearch = useProductsStore((state) => state.setSearch);
  const setCategory = useProductsStore((state) => state.setCategory);

  const categories = [...new Set(products.map((product) => product.category))];

  const setSelectedProductId = useProductsStore(
    (state) => state.setSelectedProductId,
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="product-list" aria-label="Products">
      <div className="product-controls">
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="product-count">Showing {filteredProducts.length} products</p>

      {filteredProducts.length === 0 ? (
        <p className="empty-products">No products found</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const isFavourite = favourites.includes(product.id);

            return (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    className="product-image"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <h2 className="product-name">{product.title}</h2>
                <p className="product-price">${product.price}</p>
                <p className="product-category">{product.category}</p>

                <div className="product-actions">
                  <button
                    className="product-button"
                    onClick={() => toggleFavourites(product.id)}
                  >
                    {isFavourite ? "Remove favourite" : "Add favourite"}
                  </button>

                  <button
                    className="product-button"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    View details
                  </button>
                </div>
              </article>
            );
        })}
        </div>
      )}
    </section>
  );
}

export default ProductList;
