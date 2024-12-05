class Storage {
    async getProducts() {
        try {
            const response = await fetch('/api/products');
            const allData = await response.json();
            this.sortArray(allData); // Sorting the Products (newest first by default)
            return allData;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async getCategories() {
        try {
            const response = await fetch('/api/categories');
            const allData = await response.json();
            this.sortArray(allData); // Sorting the Categories (newest first by default)
            return allData;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    async saveCategorie(data) {
        try {
            const method = data.id ? 'PUT' : 'POST';
            const response = await fetch(`/api/categories${data.id ? `/${data.id}` : ''}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving category:', error);
        }
    }

    async saveProduct(data) {
        try {
            const method = data.id ? 'PUT' : 'POST';
            const response = await fetch(`/api/products${data.id ? `/${data.id}` : ''}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    async deleteProduct(id) {
        try {
            await fetch(`/api/products/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async deleteCategory(id) {
        try {
            await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    sortArray(array) {
        // Sorting array by newest
        array.sort((a, b) => (new Date(a.updated) < new Date(b.updated) ? 1 : -1));
    }
}

export default new Storage();