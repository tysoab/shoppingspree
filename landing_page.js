import { fetchProduct } from "./helper.js";

//element
const productContainer = document.querySelector(".landing-page");

// how to get url param
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");

async function displayProduct() {
  const product = await fetchProduct(id);
  console.log(product);
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
              <button>Buy</button>
            </div>
          </div>
        </div>
  `;
}

displayProduct();
