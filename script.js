// import fetchData from helper.js
import fetchData, {
  displayAddedToCart,
  displayCartLength,
  retrieveCart,
  searchForm,
  showSearchModal,
} from "./helper.js";
import { addToCart } from "./helper.js";

// select element
const productsContainer = document.querySelector(".products");
const searchbtn = document.querySelector(".search-container");
const closeModal = document.querySelector(".close-modal dt");

let ourProducts = [];
let cartLength =
  retrieveCart().reduce((acc, item) => acc + item.quantity, 0) || "";
displayCartLength(cartLength);

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
              <button id="buy" data-id="${product.id}">Buy</button>
            
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
  const btn = event.target.closest("button");
  const id = Number(btn.dataset.id);
  if (!btn) return;

  const product = ourProducts.filter((product) => product.id === id);

  cartLength = addToCart(product[0]);
  displayCartLength(cartLength);
  displayAddedToCart();
});

// show or hide modal

searchbtn.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return;
  showSearchModal();
});

//close modal btn
closeModal.addEventListener("click", showSearchModal);

// use the search form function here

searchForm();
