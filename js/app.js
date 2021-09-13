// loadProducts function
const loadProducts = () => {
  document.getElementById("spinner").classList.remove("d-none");
  const url = `https://fakestoreapi.com/products`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// single product load function
const dataLoad = (singleProduct) => {
  const url = `https://fakestoreapi.com/products/${singleProduct}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetails(data));
};

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const { rate, count } = product.rating;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title.slice(0, 25)}</h3>
      <p class="lead">Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h5>Total-Rating : ${count} </h5>
      <h6>Average-Rating: ${rate}</h6>
      <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-primary me-2">Add to Cart</button>
      <button id="details-btn" onclick='dataLoad(${
        product.id
      })' class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
  document.getElementById("spinner").classList.add("d-none");
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// input value add function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// showDetails function by using bootstrap modal
const showDetails = (data) => {
  document.getElementById("modal-body").innerHTML = `
     <div class='p-3 text-center'>
         <img class="product-image mx-auto d-block" src=${data.image}>
         <h2> ${data.title}</h2>
         <p class="lead">Description: ${data.description.slice(0, 150)}</p>
         <p class="lead">Category: ${data.category}</p>
         <h3>Price: $ ${data.price}</h3>
         <h5>Average Rating: ${[...Array(parseInt(data.rating.rate))].map(
           (r) => '<i class="bi bi-star-fill text-warning"></i>'
         )}</h5>
      </div>
`;
};
