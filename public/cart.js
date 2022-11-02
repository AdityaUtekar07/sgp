const cartWindow = document.getElementsByClassName("cartItemsContainer")[0];
const cartIcone = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const placeOrderBtn = document.getElementById("placeOrderBtn");

cartIcone.addEventListener("click", () => {
  cartWindow.classList.toggle("displayCartWindow");
});
closeCart.addEventListener("click", () => {
  cartWindow.classList.toggle("displayCartWindow");
});

const removeItemBtn = document.getElementsByClassName("danger");
for (i = 0; i < removeItemBtn.length; i++) {
  let Button = removeItemBtn[i];
  Button.addEventListener("click", removeItem);
}

function removeItem(event) {
  event.target.parentElement.parentElement.remove();
  alert("Are you sure you want to remove item?");
  updateCartTotal();
}
function updateCartTotal() {
  let cartItem = document.getElementsByClassName("cartItem");
  let totalQnt = document.getElementsByClassName("cartItemCount")[0];

  totalQnt.innerText = cartItem.length;
  let total = 0;
  for (i = 0; i < cartItem.length; i++) {
    const cartItemPrice = cartItem[i]
      .getElementsByClassName("cartItemPrice")[0]
      .innerHTML.replace("$", "");
    parseFloat(cartItemPrice);

    const cartItemQnt =
      cartItem[i].getElementsByClassName("cartItemInput")[0].value;

    total = total + cartItemPrice * cartItemQnt;
  }

  document.getElementsByClassName("grandTotal")[0].innerHTML = `Total = $ ${
    Math.round(total * 100) / 100
  }`;
}

const itemQuantityInputs = document.getElementsByClassName("cartItemInput");
for (i = 0; i < itemQuantityInputs.length; i++) {
  let input = itemQuantityInputs[i];
  input.addEventListener("click", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value < 1) {
    input.value = 1;
  } else {
    updateCartTotal();
  }
}

const addItemToCart = document.getElementsByClassName("addItemToCartBtn");

for (i = 0; i < addItemToCart.length; i++) {
  addItemToCart[i].addEventListener("click", addToCart);
}
function addToCart(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let itemTitle = shopItem.getElementsByClassName("shopItemTitle")[0].innerText;

  let itemImg = shopItem.getElementsByClassName("shopItemImage")[0].src;
  let itemPrice = shopItem
    .getElementsByClassName("shopItemPrice")[0]
    .innerText.replace("$", "");
  addNewItemToCart(itemTitle, itemImg, itemPrice);
  updateCartTotal();
}

function addNewItemToCart(title, image, price) {
  let cartItemNames = document.getElementsByClassName("cartItemTitle");
  for (i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item is already present in the cart!");
      return;
    }
  }

  let createRow = document.createElement("div");
  createRow.classList.add("cartItems");
  createRow.innerHTML = `<div class="cartRow">
  <div class="cartItem">
    <img src=${image} class="cartItemImg">
    <span class="cartItemTitle">${title}</span>
    <span class="cartItemPrice">$${price}</span>
    <div>
    <input class="cartItemInput" type="number" value="1">
    <button  class="btn btn-danger danger">remove</button></div>
  </div>
</div>`;
  cartWindow.appendChild(createRow);
  createRow
    .getElementsByClassName("danger")[0]
    .addEventListener("click", removeItem);
  createRow
    .getElementsByClassName("cartItemInput")[0]
    .addEventListener("click", quantityChanged);
}

// let stripeHandler = StripeCheckout.configure({
//   key: stripePublicKey,
//   local: "auto",
//   token: function (token) {},
// });
placeOrderBtn.addEventListener("click", () => {
  const priceElement = document
    .getElementsByClassName("grandTotal")[0]
    .innerText.replace("Total = $", "");
  console.log(priceElement);

  stripe.redirectToCheckout({
    amount: priceElement,
  });
});
