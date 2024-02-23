document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.querySelector('.icon-cart');
    const cartTab = document.querySelector('.cartTab');
    const closeBtn = document.querySelector('.cartTab .btn .close');
    const addCartButtons = document.querySelectorAll('.add-cart');
    const cartItemCountSpan = document.querySelector('.icon-cart span');
    const listCart = document.querySelector('.listCart');

    let cartItems = [];

    function updateCartCount() {
        cartItemCountSpan.textContent = cartItems.length;
    }

    function updateCartTab() {
        listCart.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('item');

            const img = document.createElement('div');
            img.classList.add('image');
            img.innerHTML = `<img src="${item.imageSrc}">`;

            const name = document.createElement('div');
            name.classList.add('name');
            name.textContent = item.name;

            const totalItemPrice = item.quantity * item.price;
            totalPrice += totalItemPrice;

            const totalPriceElement = document.createElement('div');
            totalPriceElement.classList.add('totalPrice');
            totalPriceElement.textContent = `${totalItemPrice}lei`;

            const quantity = document.createElement('div');
            quantity.classList.add('quantity');
            quantity.innerHTML = `
                <span class="minus" onclick="updateQuantity(${item.id}, -1)">-</span>
                <span>${item.quantity}</span>
                <span class="plus" onclick="updateQuantity(${item.id}, 1)">+</span>
            `;

            cartItem.appendChild(img);
            cartItem.appendChild(name);
            cartItem.appendChild(totalPriceElement);
            cartItem.appendChild(quantity);

            listCart.appendChild(cartItem);
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('total');
        totalElement.textContent = `Pret total: ${totalPrice}lei`;

        listCart.appendChild(totalElement);
    }

    function addToCart(button) {
        const itemContainer = button.closest('.item');
        const itemName = itemContainer.querySelector('.product-name').textContent;
        const itemPrice = parseFloat(itemContainer.querySelector('.price').textContent);
        const itemImage = itemContainer.querySelector('img').getAttribute('src');

        const existingItem = cartItems.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const newItem = {
                id: cartItems.length + 1,
                name: itemName,
                price: itemPrice,
                quantity: 1,
                imageSrc: itemImage
            };

            cartItems.push(newItem);
        }

        updateCartCount();
        updateCartTab();
    }

    window.updateQuantity = function (itemId, change) {
        const selectedItem = cartItems.find(item => item.id === itemId);

        if (selectedItem) {
            selectedItem.quantity += change;

            if (selectedItem.quantity <= 0) {
                cartItems = cartItems.filter(item => item.id !== itemId);
            }

            updateCartCount();
            updateCartTab();
        }
    };

    cartIcon.addEventListener('click', function () {
        cartTab.classList.toggle('show');
    });


    closeBtn.addEventListener('click', function () {
        cartTab.classList.remove('show');
    });


    addCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            addToCart(this);
        });
    });

    
    function handleImageZoom(imageSrc) {
        const zoomContainer = document.createElement('div');
        zoomContainer.classList.add('zoom-container');

        const zoomedImage = document.createElement('img');
        zoomedImage.src = imageSrc;
        zoomedImage.classList.add('zoomed-image');

        zoomContainer.appendChild(zoomedImage);
        document.body.appendChild(zoomContainer);

    
        zoomContainer.addEventListener('click', function () {
            document.body.removeChild(zoomContainer);
        });

    
        zoomContainer.addEventListener('mousemove', function (event) {
            const offsetX = event.clientX - zoomContainer.getBoundingClientRect().left;
            const offsetY = event.clientY - zoomContainer.getBoundingClientRect().top;
            const percentageX = (offsetX / zoomContainer.clientWidth) * 100;
            const percentageY = (offsetY / zoomContainer.clientHeight) * 100;

            zoomedImage.style.transformOrigin = `${percentageX}% ${percentageY}%`;
        });
    }

    
    const productImages = document.querySelectorAll('.list-product .item img');
    productImages.forEach(image => {
        image.addEventListener('click', function () {
            const imageSrc = this.getAttribute('src');
            handleImageZoom(imageSrc);
        });
    });
});



