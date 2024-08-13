const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Thêm import cors

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng middleware cors để cấu hình CORS
app.use(cors({
    origin: '*', // Cho phép mọi nguồn
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Cấu hình kết nối cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thien13041304@@',
    database: 'product_orders'
});

// Kết nối đến cơ sở dữ liệu
db.connect(err => {
    if (err) {
        console.error('Could not connect to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// Endpoint để nhận dữ liệu từ form và lưu vào cơ sở dữ liệu
app.post('/submit_order', (req, res) => {
    const { quantity, name, phone, address } = req.body;

    const query = 'INSERT INTO orders (quantity, name, phone, address) VALUES (?, ?, ?, ?)';
    db.query(query, [quantity, name, phone, address], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ status: 'error', message: 'Failed to submit order' });
        } else {
            res.json({ status: 'success', message: 'Order submitted successfully' });
        }
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
