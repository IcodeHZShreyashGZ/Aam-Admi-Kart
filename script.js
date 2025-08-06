// Sample product data
const products = [
    {
        id: 1,
        name: "Fresh Apples",
        price: 120,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "fruits"
    },
    {
        id: 2,
        name: "Organic Tomatoes",
        price: 60,
        image: "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1630&q=80",
        category: "vegetables"
    },
    {
        id: 3,
        name: "Fresh Milk",
        price: 50,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        category: "dairy"
    },
    {
        id: 4,
        name: "Orange Juice",
        price: 90,
        image: "https://images.unsplash.com/photo-1615486364181-657d820f1b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        category: "beverages"
    },
    {
        id: 5,
        name: "Bananas",
        price: 45,
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        category: "fruits"
    },
    {
        id: 6,
        name: "Potatoes",
        price: 30,
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "vegetables"
    }
];

// DOM Elements
const productContainer = document.getElementById('productContainer');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');

// Cart array
let cart = [];

// Display products
function displayProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Fresh and delicious ${product.name.toLowerCase()}</p>
                <div class="price">
                    <span>₹${product.price}/kg</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
    
    // Add event listeners to all add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Show added to cart animation
    e.target.textContent = 'Added!';
    e.target.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        e.target.textContent = 'Add to Cart';
        e.target.style.backgroundColor = 'var(--primary)';
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation to cart icon
    cartIcon.classList.add('animate');
    setTimeout(() => {
        cartIcon.classList.remove('animate');
    }, 500);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add click event to cart icon (could be expanded to show a cart modal)
    cartIcon.addEventListener('click', () => {
        alert(`You have ${cart.reduce((total, item) => total + item.quantity, 0)} items in your cart.`);
    });
});