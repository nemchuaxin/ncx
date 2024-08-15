document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeButton = document.querySelector('#product-modal #close-modal');
    const products = document.querySelectorAll('.product');
    const introLink = document.getElementById('intro-link');
    const introContent = document.getElementById('intro-content');
    const banner = document.querySelector('section.banner');
    const revenueFormButton = document.getElementById('show-revenue-form');
    const revenueFormContainer = document.getElementById('revenue-form-container');
    const revenueForm = document.getElementById('revenue-form');
    const homeLink = document.getElementById('home-link');
    const calculateRevenueButton = document.getElementById('calculate-revenue');

    // Hiển thị modal khi nhấp vào ảnh sản phẩm
    function openModal(description, price, imageUrl) {
        if (modal && overlay) {
            document.getElementById('product-name').innerText = description;
            document.getElementById('product-price').innerText = price;
            document.getElementById('product-image').src = imageUrl;
            modal.style.display = 'block';
            overlay.style.display = 'block';
        }
    }

    // Đóng modal
    function closeModal() {
        if (modal && overlay) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    // Click to comeback trang chu 
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault();

            // Hiển thị lại các phần đã ẩn
            if (banner) banner.style.display = 'block';
            if (introContent) introContent.style.display = 'none';
            if (revenueFormContainer) revenueFormContainer.style.display = 'none';

            console.log('Trang chủ tab clicked');
        });
    }

    // Xử lý sự kiện khi nhấp vào ảnh sản phẩm
    products.forEach(product => {
        product.addEventListener('click', function () {
            const description = this.querySelector('.caption').innerText;
            const price = this.querySelector('.price').innerText;
            const imageUrl = this.querySelector('img').src; // Lấy URL hình ảnh của sản phẩm
            openModal(description, price, imageUrl);
        });
    });

    // Xử lý sự kiện khi nhấp vào nút đóng của modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Đóng modal khi nhấp vào overlay (vùng trống bên ngoài modal)
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Xử lý việc gửi đơn hàng
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

            const quantity = document.getElementById('quantity').value;
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;

            const orderData = {
                productDescription: document.getElementById('product-name').innerText,
                productPrice: document.getElementById('product-price').innerText,
                quantity: quantity,
                name: name,
                phone: phone,
                address: address
            };

            console.log('Sending order data:', orderData);

            fetch('http://localhost:3000/submit_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
                if (data.status === 'success') {
                    alert(data.message);
                    orderForm.reset();
                } else {
                    alert(data.message);
                }
                closeModal();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
        });
    }

    // Hiển thị form tính doanh thu khi nhấp vào nút
    if (revenueFormButton) {
        revenueFormButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (revenueFormContainer) revenueFormContainer.style.display = 'block';
        });
    }

    // Tính doanh thu
function calculateRevenue() {
    const sellingPrice = parseFloat(document.getElementById('selling-price').value);
    const productPrice = parseFloat(document.getElementById('product-price').innerText.replace('đ', '').replace(',', ''));
    const quantity = parseFloat(document.getElementById('quantity').value);

    if (!isNaN(sellingPrice) && !isNaN(productPrice) && !isNaN(quantity)) {
        const revenue = Math.round((sellingPrice - productPrice*1000* 0.8) * quantity);
        
        // Thêm dấu phân cách cho số tiền
        const formattedRevenue = revenue.toLocaleString('vi-VN');
        
        document.getElementById('revenue').textContent = `Doanh thu: ${formattedRevenue}đ`;
    } else {
        document.getElementById('revenue').textContent = 'Vui lòng nhập một số hợp lệ.';
    }
}


    // Xử lý việc tính doanh thu khi nhấp vào nút trong modal
    if (calculateRevenueButton) {
        calculateRevenueButton.addEventListener('click', calculateRevenue);
    }

    // Hiển thị phần giới thiệu khi nhấp vào liên kết
    if (introLink) {
        introLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Giới thiệu tab clicked');

            // Ẩn các phần khác của trang
            if (banner) banner.style.display = 'none';
            if (products) products.forEach(product => product.style.display = 'none');
            if (revenueFormContainer) revenueFormContainer.style.display = 'none';

            // Hiển thị phần giới thiệu
            if (introContent) introContent.style.display = 'block';
        });
    }
});
