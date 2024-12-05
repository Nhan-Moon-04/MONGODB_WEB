import DashboardUi from "./Dashboard.js";
import InventoryUi from "./InventoryView.js";
import CategoryUi from "./categoryView.js";

// -------------------------- Sidebar Btns -----------------------------
const dashboardBtns = [...document.querySelectorAll(".sideBar__dashboard")];
const inventoryBtns = [...document.querySelectorAll(".sideBar__inventory")];
const categoryBtns = [...document.querySelectorAll(".sideBar__setting")];

// --------------------------  Sidebar-Menu  ---------------------------------
const menuToggle = document.querySelector(".menu-toggle");
const sideBarOnToggle = document.querySelector(".sideBar-ontoggle");
const sideBarBackdrop = document.querySelector(".sideBar-ontoggle-backdrop");

// -------------------------- Search Bar -------------------------------------
const searchBar = document.querySelector(".searchBarInput");

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App();
  app.addEventListeners();

  await CategoryUi.updateCategoryOptions();
  await DashboardUi.setApp(); // Updating the ui with the selected default page
});

class App {
  addEventListeners() {
    // Adding event listener to each button when they are clicked
    dashboardBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.dashboardBtnLogic(e);
        this.hideMenu();
      });
    });
    inventoryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.inventoryBtnLogic(e);
        this.hideMenu();
      });
    });
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.categoryBtnLogic(e);
        this.hideMenu();
      });
    });
    menuToggle.addEventListener("click", () => {
      this.menuToggleLogic();
    });
    sideBarBackdrop.addEventListener("click", () => {
      this.hideMenu();
    });
    searchBar.addEventListener("input", () => {
      this.searchInputLogic();
      this.hideMenu();
      inventoryBtns.forEach((btn) => btn.classList.add("--selectedBtnUi"));
    });
  }

  async searchInputLogic() {
    await InventoryUi.setApp(); // Updating the ui with the Inventory page
    InventoryUi.seachLogic(searchBar.value);
    this.removeCurrentSelectedBtn(); // Removing all previous selected button
  }

  async dashboardBtnLogic(event) {
    try {
        await DashboardUi.setApp(); // Updating the UI with the dashboard page
        console.log(searchBar.value);
        searchBar.value = ""; // Resetting SearchBar
        this.removeCurrentSelectedBtn(); // Removing all previous selected button
        event.target.classList.add("--selectedBtnUi"); // Adding the selected (style) to the dashboard button
    } catch (error) {
        console.error('Error updating dashboard:', error);
        alert('Failed to load dashboard. Please try again later.');
    }
}

  async inventoryBtnLogic(event) {
    await InventoryUi.setApp(); // Updating the ui with the Inventory page
    searchBar.value = ""; // Reseting SearchBar
    this.removeCurrentSelectedBtn(); // Removing all previous selected button
    event.target.classList.add("--selectedBtnUi"); // Adding the selected (style) to the dashboard button
  }

  async categoryBtnLogic(event) {
    await CategoryUi.setApp(); // Updating the ui with the Inventory page
    searchBar.value = ""; // Reseting SearchBar
    this.removeCurrentSelectedBtn(); // Removing all previous selected button
    event.target.classList.add("--selectedBtnUi"); // Adding the selected (style) to the dashboard button
  }

  menuToggleLogic(event) {
    sideBarOnToggle.classList.remove("--hidden");
    sideBarBackdrop.classList.remove("--hidden");
  }

  hideMenu() {
    sideBarOnToggle.classList.add("--hidden");
    sideBarBackdrop.classList.add("--hidden");
  }

  removeCurrentSelectedBtn() {
    // This method will remove all the selected btns in the sidebar!
    [dashboardBtns, inventoryBtns, categoryBtns].forEach((btns) => {
      btns.forEach((btn) => {
        // Removing Btn selected class
        btn.classList.remove("--selectedBtnUi");
      });
    });
  }
}