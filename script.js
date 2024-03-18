const productsContainer = document.getElementById('products');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort');

let products = [];
let filteredProducts = []; // Declare filteredProducts at the global scope

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products = data;
        console.log(products)
        renderProducts();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render products to the page
function renderProducts(productsToRender) {
    productsContainer.innerHTML = '';
    const productsToShow = productsToRender || products;
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            </a>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Sort products based on selected option
function sortProducts() {
    const sortBy = sortSelect.value;
    let productsToSort;

    if (sortBy === 'default') {
        // If 'Default' is selected, use the filtered products if a category is selected,
        // otherwise, render all products in their original order
        productsToSort = categoryFilter.value ? filteredProducts.slice() : products.slice();
    } else {
        // Otherwise, sort products based on price
        productsToSort = categoryFilter.value && filteredProducts.length > 0 ? filteredProducts.slice() : products.slice(); // Use filtered products if available
        productsToSort.sort((a, b) => {
            if (sortBy === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }

    renderProducts(productsToSort);
}

// Filter products based on selected category
function filterProducts() {
    console.log('Filtering products...');
    const category = categoryFilter.value;
    console.log('Selected category:', category);

    if (category) {
        filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        console.log('Filtered products:', filteredProducts);
    } else {
        console.log('No category selected, rendering all products.');
        filteredProducts = []; // Reset filteredProducts when no category is selected
    }

    sortProducts(); // After filtering, sort the products
}

// Event listeners
sortSelect.addEventListener('change', sortProducts);
categoryFilter.addEventListener('change', filterProducts);

// Fetch data on page load
fetchData();
