import Storage from "./API.js";

const mainApp = document.querySelector(".main");
// Selecting the prodcut modal
const addProModal = document.querySelector(".addProSection");
const ProModalAddBtn = document.querySelector(".addProModalSubmitBtn");
const ProModalCancelBtn = document.querySelector(".addProModalCancelBtn");
const ModalTitle = document.querySelector(".addProModal__title");

// Selecting the inputs in the add Product Modal
const productNameInput = document.querySelector(".productNameInput");
const categoryInput = document.querySelector("#categoryInput");
const productQuantityInput = document.querySelector(".productQuantityInput");
const productPriceInput = document.querySelector(".productPriceInput");

class InventoryUi {
  constructor() {
    this.id = 0; // Setting a default id
    ProModalAddBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.addProductModalLogic();
    });
    ProModalCancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeProductModal();
    });

    addProModal.addEventListener("click", (e) => {
      // Checking if the user click on the empty black space behind the add modal so we can close it
      if (e.target.classList.contains("addProSection")) {
        this.closeProductModal(e); // Closing the Modal
      }
    });
  }
  setApp() {
    // Updating our DOM with needed HTML!
    mainApp.innerHTML = `
    <div class="inventory-app">
        <div class="product-section__header">
        <h1>Products</h1>
        <div class="product-section__header__buttons">
            <button class="addProBtn">Add Product</button>
            <div class="filterBtn">
            <img src="../assets/images/filterIcon.svg" alt="filter Icon" />
            <p>Filters</p>
            </div>
        </div>
        </div>

        <div class="product-section">
        <table class ="product-section-table">
        </table>
        </div>
    </div>`;

    //  Selecting add Product Button and add eventListener
    const addProBtn = document.querySelector(".addProBtn");
    addProBtn.addEventListener("click", () => {
      // Setting the title to be Add new Product
      ModalTitle.textContent = "New Product";
      this.openProductModal();
    });

    // Selecting the products table section
    this.productSectionHTMl = document.querySelector(".product-section-table");
    this.updateDom();
  }

  updateDom() {
    let result = `
    <tr class="table__title">
        <td>Product</td>
        <td>Quantity</td>
        <td>Price</td>
        <td>Category</td>
        <td></td>
    </tr>    
    `;

    // Getting all the Data
    const allProducts = Storage.getProducts();
    allProducts.forEach((product) => {
      result += this.createProductHTML(product); // Create HTML for each data
    });

    this.productSectionHTMl.innerHTML = result; // Update the Dom

    // Selecting the delete and edit Icon
    const deleteBtns = document.querySelectorAll(".deleteIcon");
    deleteBtns.forEach((deleteBtn) =>
      deleteBtn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        this.deleteBtnLogic(id);
      })
    );

    const editBtns = document.querySelectorAll(".editIcon");
    editBtns.forEach((editBtn) =>
      editBtn.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        this.editBtnLogic(id);
      })
    );
  }

  createProductHTML(prodcut) {
    return `
     <tr>
        <td>${prodcut.title}</td>
        <td>${prodcut.quantity}</td>
        <td>$${prodcut.price}</td>
        <td>${this.getCategoryName(prodcut.category)}</td>
        <td class="editTableSection">
            <div class="table__icons">
            <div class="editIcon" data-id=${prodcut.id}>
                <svg class="icon">
                <use
                    xlink:href="../assets/images/sprite.svg#editIcon"
                ></use>
                </svg>
            </div>
            <div class="deleteIcon" data-id=${prodcut.id}>
                <img src="../assets/images/deleteIcon.svg" alt="deleteIcon" />
            </div>
            </div>
        </td>
    </tr>

    `;
  }

  getCategoryName(id) {
    const allCategories = Storage.getCategories();
    const existed =  allCategories.find((category) => category.id == id)
    if(existed){
      return existed.title
    }
    return "No-Category"
  }

  openProductModal() {
    addProModal.classList.remove("--hidden");
    this.clearInputsField();
  }

  closeProductModal() {
    addProModal.classList.add("--hidden");
    this.clearInputsField();
  }

  clearInputsField() {
    // clear the input fields
    [
      productPriceInput,
      productQuantityInput,
      categoryInput,
      productNameInput,
    ].forEach((input) => (input.value = ""));
  }

  addProductModalLogic() {
    // Checking of the field are empty or not
    if (
      !productNameInput.value ||
      !categoryInput.value ||
      !productQuantityInput.value ||
      !productPriceInput.value
    ) {
      alert("Please enter all of the fields!");
      return -1;
    }

    // Updating Local Storage
    Storage.saveProduct({
      id: this.id,
      title: productNameInput.value.trim(),
      category: categoryInput.value,
      quantity: productQuantityInput.value,
      price: productPriceInput.value,
    });

    this.id = 0;

    // Updating the DOM
    this.updateDom();
    // Closing the modal
    this.closeProductModal();
  }

  deleteBtnLogic(id) {
    // Deleting the Product
    Storage.deleteProduct(id);
    // Update the DOM
    this.updateDom();
  }

  editBtnLogic(id) {
    this.id = id;
    // Getting all the Products
    const allProducts = Storage.getProducts();
    // Finding the product with ID
    const selectedProduct = allProducts.find((prodcut) => prodcut.id == id);

    // Opening the Modal
    this.openProductModal();

    ModalTitle.textContent = "Edit Product"; // Upating Modal title
    // Updating the value for each input
    productNameInput.value = selectedProduct.title;
    categoryInput.value = selectedProduct.category;
    productQuantityInput.value = selectedProduct.quantity;
    productPriceInput.value = selectedProduct.price;
  }
}

export default new InventoryUi();
