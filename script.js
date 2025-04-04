document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    // for restaurant detail page
    if (currentPage === 'restaurant-detail.html') {
        // Get restaurant ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');
        
        // for theLoad restaurant details based on ID
        loadRestaurantDetails(restaurantId);
    }
    
    // Handle cart page
    if (currentPage === 'cart.html') {
        // Load cart items
        loadCartItems();
        
        // Add event listeners for quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });
        
        // Add event listener for checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Thank you for your order! It will be delivered soon.');
                // In a real app, this would process the payment and order
            });
        }
    }
    
    // Add to cart buttons on restaurant detail page
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = e.target.closest('.menu-item').querySelector('h3').textContent;
            alert(`"${itemName}" added to cart!`);
            // In a real app, this would add the item to cart in localStorage or session
        });
    });
});

// Function to load restaurant details
function loadRestaurantDetails(id) {
    // This would fetch data from an API in a real app
    // For now, we'll use hardcoded data
    const restaurants = {
        "1": {
            name: "Pizza Palace",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            description: "Authentic Italian pizzas made with fresh ingredients.",
            menuItems: [
                { name: "Margherita Pizza", price: "$12.99", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002" },
                { name: "Pepperoni Pizza", price: "$14.99", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e" },
                { name: "Vegetarian Pizza", price: "$13.99", image: "https://images.unsplash.com/photo-1604917877934-07d8d248d382" }
            ]
        },
        "2": {
            name: "Burger Haven",
            image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
            description: "Juicy, mouth-watering burgers with a variety of toppings.",
            menuItems: [
                { name: "Classic Burger", price: "$9.99", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
                { name: "Cheese Burger", price: "$10.99", image: "https://images.unsplash.com/photo-1550317138-10000687a72b" },
                { name: "Veggie Burger", price: "$8.99", image: "https://images.unsplash.com/photo-1532768778661-1b347e9dfd60" }
            ]
        },
        "3": {
            name: "Sushi Spot",
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
            description: "Fresh and authentic Japanese sushi and sashimi.",
            menuItems: [
                { name: "California Roll", price: "$11.99", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351" },
                { name: "Salmon Nigiri", price: "$13.99", image: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db" },
                { name: "Dragon Roll", price: "$15.99", image: "https://images.unsplash.com/photo-1553621042-f6e147245754" }
            ]
        }
    };
    
    // Get restaurant data
    const restaurant = restaurants[id];
    if (!restaurant) return;
    
    // Update restaurant header
    const header = document.querySelector('.restaurant-header');
    if (header) {
        header.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
            <div class="restaurant-info">
                <h1>${restaurant.name}</h1>
                <p>${restaurant.description}</p>
            </div>
        `;
    }
    
    // Update menu items
    const menuItems = document.querySelector('.menu-items');
    if (menuItems && restaurant.menuItems) {
        menuItems.innerHTML = '';
        restaurant.menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-info">
                    <div class="menu-item-title">
                        <h3>${item.name}</h3>
                        <span>${item.price}</span>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            menuItems.appendChild(menuItem);
        });
        
        // Re-add event listeners to new elements
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.closest('.menu-item').querySelector('h3').textContent;
                alert(`"${itemName}" added to cart!`);
            });
        });
    }
}

// Function to load cart items
function loadCartItems() {
    // This would fetch data from localStorage or session in a real app
    // For now, we'll use hardcoded data
    const cartItems = [
        { name: "Margherita Pizza", price: "$12.99", quantity: 1, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002" },
        { name: "Classic Burger", price: "$9.99", quantity: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }
    ];
    
    // Update cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">
                        <h3>${item.name}</h3>
                        <span>${item.price}</span>
                    </div>
                    <div class="quantity-control">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Calculate and update cart summary
        updateCartSummary(cartItems);
    }
}

// Function to handle quantity change
function handleQuantityChange(e) {
    const action = e.target.dataset.action;
    const quantityElement = e.target.closest('.quantity-control').querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    
    quantityElement.textContent = quantity;
    
    // Update cart summary after quantity change
    const cartItems = Array.from(document.querySelectorAll('.cart-item')).map(item => {
        return {
            name: item.querySelector('h3').textContent,
            price: item.querySelector('.cart-item-title span').textContent,
            quantity: parseInt(item.querySelector('.quantity').textContent)
        };
    });
    
    updateCartSummary(cartItems);
}

// Function to update cart summary
function updateCartSummary(cartItems) {
    const subtotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.1; // Assuming 10% tax
    const delivery = 2.99;
    const total = subtotal + tax + delivery;
    
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
        cartSummary.innerHTML = `
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery:</span>
                <span>$${delivery.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <strong>Total:</strong>
                <strong>$${total.toFixed(2)}</strong>
            </div>
            <button class="checkout-btn">Checkout</button>
        `;
        
        // Re-add event listener for checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Thank you for your order! It will be delivered soon.');
            });
        }
    }
}