// Fondo interactivo
const symbols = ['🍔', '🌭', '🍟', '🥤', '🧀', '🍫', '🍦'];
const bgContainer = document.getElementById('fallingBg');
const numberOfItems = 22;

if (bgContainer) {
    for (let i = 0; i < numberOfItems; i++) {
        const item = document.createElement('div');
        item.classList.add('falling-item');
        item.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = (Math.random() * 6 + 6) + 's';
        item.style.animationDelay = Math.random() * 5 + 's';
        item.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
        
        bgContainer.appendChild(item);
    }
}

// Lógica del Carrito de Compras
let cart = [];

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
        updateCartUI();
    }
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartCount();
    alert(`¡${name} agregado al carrito!`);
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = totalCount;
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    if (cart.length === 0) {
        container.innerHTML = '<p>El carrito está vacío.</p>';
        totalPriceElement.innerText = '0.00';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${itemTotal.toFixed(2)} <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:2px 6px; border-radius:4px; cursor:pointer; margin-left:5px;">X</button></span>
        `;
        container.appendChild(itemDiv);
    });

    totalPriceElement.innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartUI();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    let message = "¡Hola Salsa Burgue! 🍔 Deseo realizar el siguiente pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        message += `- ${item.name} (x${item.quantity}): $${subtotal.toFixed(2)}\n`;
    });

    message += `\n*Total a Pagar:* $${total.toFixed(2)}`;
    message += `\n\n*Datos de Pago Móvil realizados:*`;
    message += `\n- Banco: BNC (0191)`;
    message += `\n- Teléfono: 0424 2944036`;
    message += `\n- C.I.: 33865063`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/584242944036?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}