export const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  console.log(data);

  return data.products;
};

export const getProduct = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  const data = await response.json();

  return data;
};
