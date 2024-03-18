const productDetailsContainer = document.getElementById('product-details');

// Get product ID from URL query string
const url = new URLSearchParams(window.location.search);
const productId = url.get('id');

// Fetch product details based on ID
async function fetchProductDetails() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        renderProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Render product details to the page
function renderProductDetails(product) {
    const productDetailsCard = document.createElement('div');
    productDetailsCard.classList.add('product-details-card');
    productDetailsCard.innerHTML = `
        <h2>${product.title}</h2>
        <product id='product-description'>
            <img src="${product.image}" alt="${product.title}">
            <pInfo id="information">
            <p><u>Price:</u> $${product.price}</p>
            <p><u>Category:</u> ${product.category}</p>
            <p><u>Description:</u> ${product.description}</p>
            <p><u>Rating:</u> ${product.rating.rate}</p>
            <p><u>Number of Reviews:</u> ${product.rating.count}</p>
            <p></p>
            </pInfo>
        </product>
    `;
    productDetailsContainer.appendChild(productDetailsCard);
}

// Fetch product details on page load
fetchProductDetails();