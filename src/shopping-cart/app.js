let grid_container = document.querySelector(".grid_container");
let container = document.querySelector(".container");
let spinner_Element = document.querySelector(".spinner");
let cart_Element = document.querySelector(".cart");
let closeCart_Element = document.querySelector(".closeCart");
let showCart_Element = document.querySelector(".showCart");
let itemsArray = JSON.parse(localStorage.getItem("items") ?? "[]");
let itemsCountElement = document.querySelector(".items-count");
let clearCartElement = document.querySelector(".clearCart");
let counterDivElement = cart_Element.querySelector(".counters ");
let total_priceElement = document.querySelector(".total-price ");
let totalPrice = parseFloat(localStorage.getItem("total-prices") ?? 0);
let products;

// Show "No items" message when cart is empty
const renderEmptyCartMessage = () => {
  // Check if message already exists
  let existingMsg = cart_Element.querySelector(".empty-cart-msg");
  if (existingMsg) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `
    empty-cart-msg
    flex flex-col items-center justify-center text-center
    text-white  py-8
    w-full
  `;
  msgDiv.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
         alt="Empty Cart"
         class="w-24 h-24 opacity-70 mb-3" />
    <p class="text-lg font-medium">Your cart is empty</p>
    <p class="text-sm text-yellow-100">Start adding products to see them here!</p>
  `;
  cart_Element.appendChild(msgDiv);
};

//on off cart
const cartToggleHandler = (e) => {
  if (itemsArray.length > 0) {
    cart_Element.classList.toggle("show-cart");
    // cart_Element.classList.toggle('hide-cart');
  } else {
    cart_Element.classList.toggle("show-cart");
    renderEmptyCartMessage();
  }
};

// Fetch all products
const fetchProducts = async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(
        `Error status: ${response.status}  ${await response.text()}`
      );
    }

    products = await response.json();
    if (products.length > 0) {
      // Use Document Fragment for performance improvement
      let fragment = document.createDocumentFragment();
      products.forEach((product) => {
        let { title, price, image, id } = product;
        fragment.appendChild(showProducts(image, title, price, id));
      });
      grid_container.appendChild(fragment);
    } else {
      console.warn("No products found");
      alert("No products found");
    }
  } catch (error) {
    console.error(`Unable to get products: ${error}`);
    alert("Something went wrong. Please try again.");
  } finally {
    spinner_Element.style.display = "none";
    container.style.display = "block";
  }
};

// Show products
const showProducts = (image, title, price, id) => {
  const card = document.createElement("div");
  card.className = `
    card
    flex flex-col items-center justify-between
    rounded-lg overflow-hidden relative
     text-gray-800
    border border-gray-200
    shadow-sm hover:shadow-md
    transition-shadow duration-300 ease-in-out
    p-3 max-w-xs
  `;
  card.setAttribute("id", id);

  // Image Element
  const image_Element = document.createElement("img");
  image_Element.className = `
    h-48 w-full object-cover rounded-md
    transition-transform duration-300 ease-in-out
    group-hover:scale-105 
  `;
  image_Element.setAttribute("alt", "Product Image");
  image_Element.setAttribute("src", image);

  // Title & Price Wrapper
  const title_price_div = document.createElement("div");
  title_price_div.className = `
    flex flex-col items-center justify-center w-full mt-3 text-white
  `;

  // Title Element
  const item_element = document.createElement("p");
  item_element.className = `
    text-base font-semibold text-white truncate max-w-[180px]
  `;
  item_element.innerText = title;
  item_element.title = title;

  // Price Element
  const price_element = document.createElement("p");
  price_element.className = `
    text-lg font-bold text-emerald-500 mt-1
  `;
  price_element.innerText = `$${parseFloat(price.toFixed(2))}`;

  // Add to Cart Button
  const button_element = document.createElement("button");
  button_element.className = `bg-emerald-500 text-white
    px-4 py-2 mt-3 rounded-full
    font-bold
    shadow-md hover:bg-emerald-600 active:scale-95
    transition-transform duration-300 ease-in-out
    flex items-center justify-center gap-1`;
  button_element.innerHTML = "Add</span>";

  // Append Elements
  card.appendChild(image_Element);
  title_price_div.appendChild(item_element);
  title_price_div.appendChild(price_element);
  card.appendChild(title_price_div);
  card.appendChild(button_element);

  return card;
};

//cart handler

const cartHandler = (e) => {
  let trackCounter = 1;
  if (e.target.tagName !== "BUTTON") return;
  cartToggleHandler();
  let cart_items;
  let card = e.target.closest(".card") ?? null;
  if (card === null) return;

  let cardId = card.id;

  let product = products.find((product) => {
    if (product.id == cardId) {
      return product;
    }
  });

  let checkDuplicate = itemsArray.find((item) => item.id == cardId);
  if (product && !checkDuplicate) {
    //put in cart
    cart_items = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      count: trackCounter,
    };
    setTotalPrice(cart_items.price);
    itemsArray.push(cart_items);
    localStorage.setItem("items", JSON.stringify(itemsArray));
  }
  itemCount();
  getFromLocalStorage();
};

const getFromLocalStorage = () => {
  removeCartItem();
  // Show empty message if no items
  if (itemsArray.length === 0) {
    renderEmptyCartMessage();
    return;
  }

  // Remove old empty message if exists
  let emptyMsg = cart_Element.querySelector(".empty-cart-msg");
  if (emptyMsg) emptyMsg.remove();
  let fragment = document.createDocumentFragment();

  itemsArray.forEach((items) => {
    let { title, image, count, id } = items;
    fragment.appendChild(createCartItems(title, image, count, id));
  });

  cart_Element.appendChild(fragment);
  let counterDiv = cart_Element.querySelectorAll(".counters ");

  counterDiv.forEach((counter) => {
    counter.addEventListener("click", updateCartItemCount);
  });
  itemCount();
};
const updateCartItemCount = (e) => {
  if (e.target.tagName === "SPAN") return;

  let cartItemId = e.target.closest(".counters").dataset.itemno;

  let chckBtn = e.target.classList.contains("increase");

  chckBtn ? increaseCount(cartItemId) : decreaseCount(cartItemId);
};
const increaseCount = (cartItemId) => {
  itemsArray = itemsArray.map((eachElement) => {
    if (eachElement.id == cartItemId) {
      eachElement.count += 1;
      setTotalPrice(eachElement.price);
      return eachElement;
    }
    return eachElement;
  });

  localStorage.setItem("items", JSON.stringify(itemsArray));
  getFromLocalStorage();
};

const decreaseCount = (cartItemId) => {
  itemsArray = itemsArray.filter((eachElement) => {
    if (eachElement.id == cartItemId) {
      if (eachElement.count !== 1) {
        totalPrice -= eachElement.price;
        eachElement.count -= 1;
        localStorage.setItem("total-prices", JSON.stringify(totalPrice));
        renderTotalPriceUI();
        return true;
      } else {
        return false;
      }
    }
    return eachElement;
  });

  localStorage.setItem("items", JSON.stringify(itemsArray));
  if (itemsArray.length == 0) {
    totalPrice = 0;
    localStorage.setItem("total-prices", JSON.stringify(totalPrice));
    cart_Element.classList.toggle("show-cart");
  }
  getFromLocalStorage();
  renderTotalPriceUI();
  itemCount();
};

const createCartItems = (title, image, count, id) => {
  let container = document.createElement("div"); // Wrapper div
  container.classList.add(
    "cartElement",
    "grid",
    "items-center",
    "border-b",
    "mb-2",
    "grid-cols-3",
    "p-2",
    "w-full"
  );

  let imgElement = document.createElement("img");
  imgElement.src = image;
  imgElement.classList.add(
    "w-14",
    "h-14",
    "rounded-full",
    "object-cover",
    "border",
    "border-white"
  ); // Add styles if needed

  let titleElement = document.createElement("p");
  titleElement.textContent = title;
  titleElement.title = title;
  titleElement.classList.add(
    "text-white",
    "text-base",
    "font-medium",
    "w-full"
  );

  let countersDiv = document.createElement("div");

  countersDiv.setAttribute("data-itemno", id);

  countersDiv.classList.add("counters", "flex", "gap-2");

  let decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "-";
  decreaseBtn.classList.add(
    "decrease",
    "cursor-pointer",
    "px-3",
    "py-1",
    "bg-red-200",
    "rounded-md",
    "text-black",
    "font-semibold"
  );

  let valueSpan = document.createElement("span");
  valueSpan.textContent = `${count}`;
  valueSpan.classList.add("value", "w-fit");

  let increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.classList.add(
    "increase",
    "cursor-pointer",
    "py-1",
    "px-3",
    "bg-green-200",
    "rounded-md",
    "text-black",
    "font-semibold"
  );

  // Append counter buttons inside countersDiv
  countersDiv.appendChild(decreaseBtn);
  countersDiv.appendChild(valueSpan);
  countersDiv.appendChild(increaseBtn);

  // Append everything to the container div
  container.appendChild(imgElement);
  container.appendChild(titleElement);
  container.appendChild(countersDiv);

  return container;
};

const itemCount = () => {
  if (itemsArray) {
    console.log(itemsArray);

    itemsCountElement.textContent = itemsArray.length;
  } else {
    itemsCountElement.textContent = itemsArray.length;
  }
};

const clearCartHandler = (e) => {
  localStorage.clear();
  totalPrice = 0;
  cart_Element.classList.toggle("show-cart");
  removeCartItem();
  itemsArray = JSON.parse(localStorage.getItem("items") ?? "[]");
  itemCount();
  renderEmptyCartMessage();
};

const removeCartItem = () => {
  let removeItem = cart_Element.querySelectorAll(".cartElement");
  removeItem.forEach((item) => {
    item.remove();
  });
};

const setTotalPrice = (price) => {
  totalPrice += price;
  localStorage.setItem("total-prices", JSON.stringify(totalPrice));

  renderTotalPriceUI();
};

const renderTotalPriceUI = () => {
  total_priceElement.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);
};

renderTotalPriceUI();
getFromLocalStorage();
fetchProducts();
itemCount();

clearCartElement.addEventListener("click", clearCartHandler);
showCart_Element.addEventListener("click", cartToggleHandler);
closeCart_Element.addEventListener("click", cartToggleHandler);
grid_container.addEventListener("click", cartHandler);
