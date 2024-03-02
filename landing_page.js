import {
  addToCart,
  displayAddedToCart,
  displayCartLength,
  fetchProduct,
  retrieveCart,
} from "./helper.js";

//element
const productContainer = document.querySelector(".landing-page");

// how to get url param
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");
let product;

// display cart length
let cartLength =
  retrieveCart().reduce((acc, product) => acc + product.quantity, 0) || "";
displayCartLength(cartLength);

async function displayProduct() {
  product = await fetchProduct(id);

  productContainer.innerHTML = `
  <div class="product">
          <div class="product-img">
            <img
              src="${product.image}"
              alt=""
            />
          </div>

          <div class="product-details">
            <h1>${product.title}</h1>

            <div class="price-rating">
              <span class="price">N${product.price}</span>
              <span class="rating">Rating: ${product.rating.rate}</span>
            </div>
            <div class="desc">${product.description}</div>
            <div class="control-action">
              <button data-id="${product.id}">Buy</button>
            </div>
          </div>
        </div>
  `;

  // change the page title to the product title...
  return (document.title = product.title);
}

displayProduct();

productContainer.addEventListener("click", function (event) {
  const btn = event.target.closest("button");
  if (!btn) return;
  console.log(product);
  cartLength = addToCart(product);
  displayCartLength(cartLength);
  displayAddedToCart();
});
