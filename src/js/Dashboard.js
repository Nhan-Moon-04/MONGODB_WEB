const mainApp = document.querySelector(".main");

class DashboardUi {
  setApp() {
    mainApp.innerHTML = `
    <div class="dashboardUi">
        <div class="dashboardUi__header">
        <h1>Overview</h1>
        </div>
        <div class="dashboardUi__main">
        <div class="dashboardUi__main__items">
            <img src="../assets/images/Quantity.svg" alt="quantity" />
            <p class="dashboardUi__quantity">868</p>
            <p>Quantity in Hand</p>
        </div>

        <div class="dashboardUi__main__items">
            <img src="../assets/images/Sales.svg" alt="salesItem" />
            <p class="dashboardUi__sales">$1434</p>
            <p>Total Value in Hand</p>
        </div>

        <div class="dashboardUi__main__items">
            <img src="../assets/images/Cancel.svg" alt="Cancel Item" />
            <p class="dashboardUi__notAvailable">32</p>
            <p>Not availabales</p>
        </div>

        <div class="dashboardUi__main__items">
            <img src="../assets/images/Categoriescolor.svg" alt="category" />
            <p class="dashboardUi__notAvailable">54</p>
            <p>Total Categories</p>
        </div>
        </div>
    </div>`;
  }
}

export default new DashboardUi();
