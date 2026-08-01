CREATE DATABASE IF NOT EXISTS bookverse_db;
USE bookverse_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  pincode VARCHAR(10),
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1) NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  book_id INT NOT NULL,
  book_title VARCHAR(200) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, genre, price, rating, image) VALUES
('Clean Code', 'Robert C. Martin', 'Programming', 45.00, 4.8, 'https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg'),
('Atomic Habits', 'James Clear', 'Self Help', 20.00, 4.9, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg'),
('The Pragmatic Programmer', 'Andrew Hunt', 'Programming', 40.00, 4.8, 'https://m.media-amazon.com/images/I/51A8l+FxNNL._SY445_SX342_.jpg'),
('Python Crash Course', 'Eric Matthes', 'Programming', 35.00, 4.7, 'https://m.media-amazon.com/images/I/51wOOMQ+F3L._SY445_SX342_.jpg'),
('The Alchemist', 'Paulo Coelho', 'Novels', 15.00, 4.7, 'https://m.media-amazon.com/images/I/51Z0nLAfLmL._SY445_SX342_.jpg'),
('Deep Learning', 'Ian Goodfellow', 'Artificial Intelligence', 60.00, 4.8, 'https://m.media-amazon.com/images/I/61qJ0IsVN1L._SY445_SX342_.jpg'),
('Artificial Intelligence: A Modern Approach', 'Stuart Russell', 'Artificial Intelligence', 85.00, 4.8, 'https://m.media-amazon.com/images/I/51wBf2U5pPL._SY445_SX342_.jpg'),
('Rich Dad Poor Dad', 'Robert T. Kiyosaki', 'Business', 25.00, 4.7, 'https://m.media-amazon.com/images/I/51Hfv2MfNGL._SY445_SX342_.jpg'),
('Think and Grow Rich', 'Napoleon Hill', 'Business', 12.00, 4.6, 'https://m.media-amazon.com/images/I/41+eK8zBwQL._SY445_SX342_.jpg'),
('Zero to One', 'Peter Thiel', 'Business', 22.00, 4.6, 'https://m.media-amazon.com/images/I/51z7mZZKRgL._SY445_SX342_.jpg'),
('Clean Architecture', 'Robert C. Martin', 'Programming', 42.00, 4.7, 'https://m.media-amazon.com/images/I/41-sN-mzwKL._SY445_SX342_.jpg'),
('The Psychology of Money', 'Morgan Housel', 'Business', 18.00, 4.8, 'https://m.media-amazon.com/images/I/41r6F2LRf8L._SY445_SX342_.jpg'),
('Introduction to Algorithms', 'Thomas H. Cormen', 'Programming', 75.00, 4.7, 'https://m.media-amazon.com/images/I/41SNoh5ZhOL._SY445_SX342_.jpg'),
('The Lean Startup', 'Eric Ries', 'Business', 24.00, 4.6, 'https://m.media-amazon.com/images/I/51WIKlio9qL._SY445_SX342_.jpg'),
('Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 'Novels', 25.00, 4.9, 'https://m.media-amazon.com/images/I/51UoqNiQsyL._SY445_SX342_.jpg');
