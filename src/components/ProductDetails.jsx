import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/productApi";
import "./ProductDetails.css";

function ProductDetails({ id, onBack }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: id !== null && id !== undefined,
  });

  if (!id) {
    return <p className="status-message">No product selected</p>;
  }

  if (isLoading) {
    return <p className="status-message">Loading product...</p>;
  }

  if (isError) {
    return <p className="status-message">Failed to fetch product</p>;
  }

  return (
    <section className="product-details" aria-label={`${data.title} details`}>
      <button className="details-back-button" onClick={onBack}>
        ← Back to products
      </button>

      <div className="details-content">
        <div className="details-image-wrap">
          <img className="details-image" src={data.thumbnail} alt={data.title} />
        </div>

        <div className="details-copy">
          <h1 className="details-title">{data.title}</h1>
          <p className="details-description">{data.description}</p>
          <p className="details-price">${data.price}</p>
          <dl className="details-meta">
            <div><dt>Category</dt><dd>{data.category}</dd></div>
            <div><dt>Brand</dt><dd>{data.brand || "Unbranded"}</dd></div>
            <div><dt>Rating</dt><dd>{data.rating}</dd></div>
            <div><dt>In stock</dt><dd>{data.stock}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
