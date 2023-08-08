let productName = document.querySelector('#productName');
let productPrice = document.querySelector('#productPrice');
let productCategory = document.querySelector('#productCategory');
let productDescription = document.querySelector('#productDescription');
let tbody = document.querySelector('tbody');

// # buttons
let addProductBtn = document.querySelector('#addProduct');
let deleteAllBtn = document.querySelector('#deleteAllBtn');
let updateProductBtn = document.querySelector('#updateProduct');
let searchInputBtn = document.querySelector('#searchInput');

// ! Where all the products will be stored
let productsContainer = [];

let updatedIndex;

// ! Validation functions

function validateProductName(i) {
  let regex = /^[a-zA-z][\sa-zA-z\s0-9]{3,}$/;
  if (regex.test(i)) {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Not Vaild Product Name',
      text: 'product name must not be empty and atleast 4 chars long and starts with character',
    });
  }
}

function validatePrice(i) {
  let regex = /^\d{2,6}$/;

  if (regex.test(i)) {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Not Vaild Product Price',
      text: 'product Price must not be empty and atleast 2 digits long',
    });
  }
}

if (localStorage.getItem('products')) {
  productsContainer = JSON.parse(localStorage.getItem('products'));
}

if (productsContainer <= 0) {
  deleteAllBtn.classList.add('d-none');
} else {
  deleteAllBtn.classList.remove('d-none');
  deleteAllBtn.classList.add('d-block');
}

function addProduct() {
  if (
    validateProductName(productName.value) &&
    validatePrice(productPrice.value)
  ) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };

    productsContainer.push(product);
    localStorage.setItem('products', JSON.stringify(productsContainer));

    clearForm();
    displayProducts(productsContainer);
  }
}

function displayProducts(arr) {
  if (productsContainer <= 0) {
    deleteAllBtn.classList.add('d-none');
  } else {
    deleteAllBtn.classList.remove('d-none');
    deleteAllBtn.classList.add('d-block');
  }

  let container = ``;

  for (let i = 0; i < arr.length; i++) {
    container += `
    <tr>
    <td>${i + 1}</td>
    <td>${arr[i].name}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].category}</td>
    <td>${arr[i].description}</td>
    <td><button class="btn btn-warning btn-sm" onclick="updateProduct(${i})" >Update</button></td>
    <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></td>
  </tr>
    `;
  }
  tbody.innerHTML = container;
}

function clearForm() {
  productName.value = '';
  productPrice.value = '';
  productCategory.value = '';
  productDescription.value = '';
}

function deleteProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(productsContainer));

  displayProducts(productsContainer);
}

function deleteAll() {
  productsContainer.splice(0, productsContainer.length);
  localStorage.clear();

  console.log(productsContainer);
  displayProducts(productsContainer);
}

function updateProduct(index) {
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCategory.value = productsContainer[index].category;
  productDescription.value = productsContainer[index].description;

  updatedIndex = index;
  addProductBtn.classList.add('d-none');
  updateProductBtn.classList.remove('d-none');
  updateProductBtn.classList.add('d-block');
}

function updateFromInput() {
  if (
    validateProductName(productName.value) &&
    validatePrice(productPrice.value)
  ) {
    productsContainer[updatedIndex].name = productName.value;
    productsContainer[updatedIndex].price = productPrice.value;
    productsContainer[updatedIndex].category = productCategory.value;
    productsContainer[updatedIndex].description = productDescription.value;
  }

  localStorage.setItem('products', JSON.stringify(productsContainer));

  addProductBtn.classList.remove('d-none');
  addProductBtn.classList.add('d-block');
  updateProductBtn.classList.remove('d-block');
  updateProductBtn.classList.add('d-none');

  clearForm();

  displayProducts(productsContainer);
}

function searchProduct(s) {
  let searchedProducts = [];

  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(s.toLowerCase())) {
      searchedProducts.push(productsContainer[i]);
    }
  }
  console.log(searchedProducts);
  displayProducts(searchedProducts);
}

addProductBtn.addEventListener('click', addProduct);
deleteAllBtn.addEventListener('click', deleteAll);
updateProductBtn.addEventListener('click', updateFromInput);
displayProducts(productsContainer);
