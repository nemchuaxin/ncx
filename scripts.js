document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('product-modal');
    const closeButton = document.getElementById('close-modal');
    const imageLeft = document.querySelector('.image-left img');
    const imageMid = document.querySelector('.image-mid img');
    const imageRight = document.querySelector('.image-right img');
    const orderForm = document.getElementById('order-form');
    const introLink = document.getElementById('intro-link');
    const introContent = document.getElementById('intro-content');
    const banner = document.querySelector('section.banner');
    const products = document.querySelector('section.products');
    const revenueFormButton = document.getElementById('show-revenue-form');
    const revenueFormContainer = document.getElementById('revenue-form-container');
    const revenueForm = document.getElementById('revenue-form');
    const homeLink = document.getElementById('home-link');    

    // Hiển thị modal khi nhấp vào ảnh
    function openModal(description, price) {
        document.getElementById('product-description').innerText = description;
        document.getElementById('product-price').innerText = price;
        modal.style.display = 'block';
    }

    // Đóng modal
    function closeModal() {
        modal.style.display = 'none';
    }

    //Click to comeback trang chu 
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Hiển thị lại các phần đã ẩn
        banner.style.display = 'block';
        products.style.display = 'block';
        revenueFormContainer.style.display = 'none';
        introContent.style.display = 'none';
        
        console.log('Trang chủ tab clicked');
    });

    // Xử lý sự kiện khi nhấp vào ảnh
    imageLeft.addEventListener('click', () => openModal('Nem dài: Đặc điểm nổi bật ...', 'Giá: 100.000 VNĐ'));
    imageMid.addEventListener('click', () => openModal('Nem ngắn: Đặc điểm nổi bật ...', 'Giá: 150.000 VNĐ'));
    imageRight.addEventListener('click', () => openModal('Nem đặc biệt: Đặc điểm nổi bật ...', 'Giá: 200.000 VNĐ'));

    // Xử lý sự kiện khi nhấp vào nút đóng của modal
    closeButton.addEventListener('click', closeModal);

    // Đóng modal khi nhấp ra ngoài modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Xử lý việc gửi đơn hàng
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

        const quantity = document.getElementById('quantity').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const orderData = {
            productDescription: document.getElementById('product-description').innerText,
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
                document.getElementById('order-form').reset();
            } else {
                alert(data.message);
            }
            closeModal();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
    });

    // Hiển thị form tính doanh thu khi nhấp vào nút
    revenueFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        revenueFormContainer.style.display = 'block';
    });

    // Tính doanh thu
    function calculateRevenue() {
        const salesAmount = parseFloat(document.getElementById('sales-amount').value);
        if (!isNaN(salesAmount)) {
            const revenue = salesAmount - 200000;
            document.getElementById('revenue-result').textContent = `Doanh thu: ${revenue} VND`;
        } else {
            document.getElementById('revenue-result').textContent = 'Vui lòng nhập một số hợp lệ.';
        }
    }

    // Xử lý việc tính doanh thu khi nhấp vào nút trong form doanh thu
    revenueForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
        calculateRevenue();
    });

    // Hiển thị phần giới thiệu khi nhấp vào liên kết
    introLink.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Giới thiệu tab clicked');
        
        // Ẩn các phần khác của trang
        banner.style.display = 'none';
        products.style.display = 'none';
        revenueFormContainer.style.display = 'none';
        
        // Hiển thị phần giới thiệu
        introContent.style.display = 'block';
    });
});
