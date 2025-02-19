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

//on off cart
const cartToggleHandler = (e) => {
  if (itemsArray.length > 0) {
    cart_Element.classList.toggle("show-cart");
    // cart_Element.classList.toggle('hide-cart');
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
  card.className =
    "card border max-w-[320rem] relative rounded-md text-center flex items-center flex-col space-y-2 text-white overflow-hidden group border-pink-500 p-1 shadow-md shadow-pink-400 max-w-sm";
  card.setAttribute("id", id);

  // Image Element
  const image_Element = document.createElement("img");
  image_Element.className = "h-48 w-full rounded-md object-cover";
  image_Element.setAttribute("alt", "Product Image");
  image_Element.setAttribute("src", image);

  // Title & Price Wrapper
  const title_price_div = document.createElement("div");
  title_price_div.className = "flex flex-col items-center w-full px-2 py-2 ";

  // Title Element
  const item_element = document.createElement("p");
  item_element.className =
    "text-sm font-medium truncate max-w-[150px] text-center";
  item_element.innerText = title;
  item_element.title = title; // Full title on hover

  // Price Element
  const price_element = document.createElement("p");
  price_element.className = "text-lg font-bold text-yellow-400";
  price_element.innerText = `$${parseFloat(price.toFixed(2))}`;

  // Add to Cart Button
  const button_element = document.createElement("button");
  button_element.className =
    "bg-yellow-400 p-2 rounded-full text-white shadow-md hover:bg-yellow-500 transition-transform duration-300 ease-in-out";
  button_element.innerHTML = "🛒";

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
    totalPrice=0;
    localStorage.setItem("total-prices", JSON.stringify(totalPrice));
    cart_Element.classList.toggle("show-cart");
  }
  getFromLocalStorage();

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
  imgElement.classList.add("w-14", "h-14", "rounded-full", "object-cover"); // Add styles if needed

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
  

  total_priceElement.textContent = new Intl.NumberFormat('en-US',
    {

      style:'currency',
      currency:'USD',

    }
  ).format(totalPrice);
};

renderTotalPriceUI();
getFromLocalStorage();
fetchProducts();
itemCount();

clearCartElement.addEventListener("click", clearCartHandler);
showCart_Element.addEventListener("click", cartToggleHandler);
closeCart_Element.addEventListener("click", cartToggleHandler);
grid_container.addEventListener("click", cartHandler);
