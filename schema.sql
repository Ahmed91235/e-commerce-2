-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    billing_address TEXT,
    shipping_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category_id INT REFERENCES categories(id),
    stock_quantity INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    billing_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order_Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- Cart_Items Table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see and manage their own data
CREATE POLICY "Allow individual access" ON users FOR ALL
USING (auth.uid() = id);

-- Public access to categories and products
CREATE POLICY "Allow public read access" ON categories FOR SELECT
USING (true);
CREATE POLICY "Allow public read access" ON products FOR SELECT
USING (true);

-- Users can only see and manage their own orders
CREATE POLICY "Allow individual access" ON orders FOR ALL
USING (auth.uid() = user_id);
CREATE POLICY "Allow individual access" ON order_items FOR ALL
USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Users can only see and manage their own cart items
CREATE POLICY "Allow individual access" ON cart_items FOR ALL
USING (auth.uid() = user_id);
