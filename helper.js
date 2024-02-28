// how to use API and localStorage

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    alert("failed to fetch data");
    return;
  }
  const data = await response.json();

  return data;
}

// default export
export default fetchData;

// name export
// export {fetchData}

async function fetchProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    alert("failed to fetch data");
    return;
  }
  const data = await response.json();

  return data;
}

export { fetchProduct };

// button buy onclick action

export function addToCart(product) {
  alert("products");
}
