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
  const storage = retrieveCart();
  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
    image: product.image,
  };

  const exitProduct = storage.filter(
    (product) =>
      product.id === item.id && { ...product, quantity: product.quantity++ }
  );
  if (!exitProduct.length) storage.push(item);
  storeCart(storage);

  return storage.reduce((acc, product) => acc + product.quantity, 0);
}

// localstorage

export function storeCart(products) {
  localStorage.setItem("shoppingspree", JSON.stringify(products));
}

export function retrieveCart() {
  return JSON.parse(localStorage.getItem("shoppingspree")) || [];
}

// display total number of items in the cart

export function displayCartLength(length = []) {
  const cartsEl = document.querySelector("#carts-el");
  const cartLength = length;

  cartsEl.textContent = cartLength;
}
// dropdown message
export function displayAddedToCart() {
  const msgEl = document.querySelector(".addedTocart-msg-el");
  msgEl.style.top = "0";
  const timeoutId = setTimeout(() => {
    msgEl.style.top = "-100%";
  }, 2000);

  return () => clearTimeout(timeoutId);
}

// search modal logic

export function showSearchModal() {
  const modalEl = document.querySelector(".search-modal");
  modalEl.classList.toggle("show-modal");
}
