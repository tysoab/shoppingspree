//element

import { displayCartLength, retrieveCart, storeCart } from "./helper.js";

const wrapper = document.querySelector(".wrapper");
const totalEl = document.querySelector(".total-price");
let cartsData = retrieveCart();

// display cart length
displayCartLength(
  cartsData.reduce((acc, cart) => acc + cart.quantity, 0) || ""
);

function displayCartItems() {
  let markup = "";
  cartsData.forEach(
    (item) =>
      (markup += `
    <div class="cart">
            <div class="img-el">
              <img src="${item.image}" alt="" />
            </div>
            <div class="details">
              <div>
                <h1>${item.title}</h1>
                <p>
                  <span>qty : </span>
                  <span class="quantity">${item.quantity}</span>
                </p>
              </div>
              <div>
                <p class="price">N${item.price}</p>
                <div class="control-action">
                  <i class="fa-solid fa-trash-can" data-id="${item.id}"></i>
                </div>
              </div>
            </div>
          </div>
    `)
  );

  wrapper.innerHTML = markup;
}

displayCartItems();

wrapper.addEventListener("click", function (event) {
  const btn = event.target.closest("i");

  if (!btn) return;
  const id = Number(btn.dataset.id);
  cartsData = cartsData.filter((cart) => cart.id !== id);
  storeCart(cartsData);
  cartsData = retrieveCart();
  displayCartLength(
    cartsData.reduce((acc, cart) => acc + cart.quantity, 0) || 0
  );
  displayCartItems();
  displayTotal();
});

function displayTotal() {
  const total =
    cartsData.reduce((acc, cart) => acc + cart.price * cart.quantity, 0) || "";

  if (!total) return (totalEl.innerHTML = "");

  totalEl.innerHTML = `
          <h1>
            <span>Total price:</span>
            <span class="total">N${total}</span>
          </h1>
  `;
}

displayTotal();
