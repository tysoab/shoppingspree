// import fetchData from helper.js
import fetchData from "./helper.js";
import { addToCart } from "./helper.js";

// select element
const productsContainer = document.querySelector(".products");

let ourProducts = [];

async function displayProducts() {
  ourProducts = await fetchData();

  productsContainer.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin  fa-flip-vertical"></i>';

  if (ourProducts) {
    productsContainer.innerHTML = "";
    ourProducts.forEach((product) => {
      productsContainer.innerHTML += `
      <div class="product-container">
          <div class="product-img">
            <a href="landing_page.html?id=${product.id}">
            <img src="${product.image}" alt="${product.title}" />
            </a>
          </div>
          <div class="product-details">
            <div class="product-title">${product.title}</div>

            <div class="pri-buy-el">
              <div class="product-price">N${product.price}</div>
              <div class="control-action">
              <input type="hidden" value="${product}" class="data"/>
              <button id="buy">Buy</button>
              </div>
            </div>

            <small><a href="landing_page.html?id=${product.id}" >Read more</a></small>
          </div>
        </div>
      `;
    });
  }
}

displayProducts();

//event listener

productsContainer.addEventListener("click", function (event) {
  const btn = event.target.closest(".control-action").querySelector("button");

  if (!btn) return;
  const product = event.target
    .closest(".control-action")
    .querySelector("input");
  console.log(product.value);

  addToCart();
});
