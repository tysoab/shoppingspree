import fetchData, {
  addToCart,
  displayAddedToCart,
  displayCartLength,
  retrieveCart,
} from "./helper.js";

const productContainer = document.querySelector(".all-products");

let products;
let cartLength =
  retrieveCart().reduce((acc, cart) => acc + cart.quantity, 0) || "";
displayCartLength(cartLength);

async function displayProducts() {
  products = await fetchData();
  let markup = "";
  products.forEach(
    (product) =>
      (markup += `
  <div class="products-wrapper">
          <div class="img-el">
            <a href="landing_page.html?id=${product.id}"><img src="${product.image}" alt="" /></a>
          </div>
          <div class="details">
            <div>
              <h1>${product.title}</h1>
              <p>
              <a href="landing_page.html?id=${product.id}">Read more</a>
              </p>
            </div>
            <div>
              <p class="price">N ${product.price}</p>
              <div class="control-action">
                <button class="buy" data-id="${product.id}">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
  `)
  );

  productContainer.innerHTML = markup;
}

displayProducts();

productContainer.addEventListener("click", function (event) {
  const btn = event.target.closest("button");
  const id = Number(btn.dataset.id);
  if (!btn) return;

  const product = products.filter((product) => product.id === id);

  cartLength = addToCart(product[0]);
  displayCartLength(cartLength);
  displayAddedToCart();
});
