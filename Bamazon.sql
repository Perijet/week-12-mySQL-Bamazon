-- CREATE DATABASE Bamazon;
-- 
-- CREATE TABLE Products(
-- 	ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
--     ProductName VARCHAR(50) NOT NULL,
--     DepartmentName VARCHAR(50) NOT NULL,
--     Price DECIMAL(13,2) NOT NULL,
--     StockQuantity INTEGER(10) NOT NULL,
--     PRIMARY KEY(ItemID)
-- );

-- USE Bamazon;

-- INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
-- VALUES	('Ipad', 'Electronics', 250, 50),
-- 		('Cell Phone', 'Electronics', 150, 25),
--         ('Radio', 'Electronics', 25, 100),
--         ('Television', 'Electronics', 300, 20),
--         ('Toaster', 'Home & Kitchen', 20, 40),
--         ('Cutting Board', 'Home & Kitchen', 10, 75),
--         ('Knife Set', 'Home & Kitchen', 25, 60),
--         ('Food Processor', 'Home & Kitchen', 75, 35),
--         ('Harry Potter', 'Books', 12, 100),
--         ('Javascript for Dummies', 'Books', 23, 65),
--         ('Begining Node.JS', 'Books', 24, 55),
--         ('mySQL in 10 Days', 'Books', 14, 95),
--         ('Wool Hoodie', 'Clothing', 22, 110),
--         ('Dress Shirt', 'Clothing', 45, 98),
--         ('Summer Dress', 'Clothing', 29, 200),
--         ('Denim Jeans', 'Clothing', 44, 250),
--         ('Watch', 'Jewelry', 150, 62),
--         ('Necklace', 'Jewelry', 55, 22),
--         ('Diamond Ring', 'Jewelry', 500, 10),
--         ('Signet Ring', 'Jewelry', 300, 28);

-- INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
-- VALUES	('Iphone', 'Electronics', 200, 4),
--  		('A Knights Tale', 'Books', 150, 3);
-- 
-- CREATE TABLE Departments(
-- 	DepartmentID INTEGER(11) AUTO_INCREMENT NOT NULL,
--     DepartmentName VARCHAR(50) NOT NULL,
--     OverHeadCosts DECIMAL(13,2) NOT NULL,
--     TotalSales DECIMAL(13,2) NOT NULL,
--     PRIMARY KEY(DepartmentID)
-- );


-- SELECT * FROM Products p
-- INNER JOIN Departments d ON d.DepartmentName = p.DepartmentName
-- WHERE t.year = ta.year;
-- 
-- SELECT t1.DepartmentID, t2.DepartmentName, t1.OverHeadCosts, t1.TotalSales AS ProductSales, OverheadCosts - TotalSales AS TotalProfit
-- FROM Departments t1
-- INNER JOIN Products t2 ON t1.DepartmentName = t2.DepartmentName
-- GROUP BY DepartmentID;



-- INSERT INTO Products(DepartmentName, OverHeadCosts, TotalSales)
-- VALUES	('Electronics', 1000, 250),
--         ('Home & Kitchen', 20000, 200),
--         ('Books', 1200, 100),
--         ('Clothing', 2500, 110),
--         ('Jewelry', 1500, 162);
        
-- UPDATE Products SET ProductName = "Big Blue Bus"
-- WHERE ProductName = "a";

SELECT * FROM departments;