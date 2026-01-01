-- Drop all existing tables and policies to start fresh
-- First drop policies (these will succeed even if tables don't exist)
DROP POLICY IF EXISTS "Allow all operations on cart" ON cart;
DROP POLICY IF EXISTS "Allow all operations on payments" ON payments;
DROP POLICY IF EXISTS "Allow all operations on order_tracking" ON order_tracking;
DROP POLICY IF EXISTS "Allow all operations on order_items" ON order_items;
DROP POLICY IF EXISTS "Allow all operations on orders" ON orders;
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
DROP POLICY IF EXISTS "Allow all operations on farmers" ON farmers;
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on farmer_stock" ON farmer_stock;

-- Drop tables with CASCADE to handle dependencies (IF EXISTS prevents errors)
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_tracking CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS farmer_stock CASCADE;
DROP TABLE IF EXISTS farmers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop function with CASCADE to remove all dependent triggers
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (based on authentication and user management)
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'farmer', 'driver', 'admin', 'employer')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create farmers table (for farmer profiles and verification)
CREATE TABLE farmers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  village VARCHAR(255),
  district VARCHAR(255),
  state VARCHAR(255),
  pincode VARCHAR(10),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create farmer_stock table (for farmer inventory management - from farmer/stock API)
CREATE TABLE farmer_stock (
  id VARCHAR(50) DEFAULT uuid_generate_v4()::text PRIMARY KEY,
  farmer_id UUID REFERENCES farmers(id),
  animal_type VARCHAR(100),
  breed VARCHAR(100),
  weight_range_min DECIMAL(5,2),
  weight_range_max DECIMAL(5,2),
  minimum_guaranteed_weight DECIMAL(5,2),
  age VARCHAR(50),
  quantity DECIMAL(10,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  video_uploaded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table (for general product catalog)
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
  product_type VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  description TEXT,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit VARCHAR(50) DEFAULT 'kg',
  minimum_guaranteed_weight DECIMAL(5,2),
  available_quantity DECIMAL(10,2),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table (for order management - from orders API)
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(15) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  gst DECIMAL(10,2) DEFAULT 0,
  payment_method VARCHAR(50) DEFAULT 'cod',
  payment_id VARCHAR(255),
  delivery_address TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'in_transit', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table (for order line items - from orders API)
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  farmer_id VARCHAR(15) REFERENCES farmers(phone),
  product_type VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  quantity DECIMAL(10,2) NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  weight DECIMAL(5,2),
  minimum_guaranteed_weight DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_tracking table (for order status tracking - from orders API)
CREATE TABLE order_tracking (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  message TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table (for payment records - from orders API)
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table (for shopping cart functionality - from cart page)
CREATE TABLE cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id VARCHAR(15) NOT NULL,
  farmer_id VARCHAR(50),
  product_type VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  quantity DECIMAL(10,2) NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  weight DECIMAL(5,2),
  minimum_guaranteed_weight DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist table (for customer wishlist functionality - from wishlist API)
CREATE TABLE wishlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id VARCHAR(15) NOT NULL,
  farmer_id UUID REFERENCES farmers(id),
  product_type VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  quantity DECIMAL(10,2) DEFAULT 1,
  price_per_unit DECIMAL(10,2) DEFAULT 0,
  weight DECIMAL(5,2),
  minimum_guaranteed_weight DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_tracking_order_id ON order_tracking(order_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_cart_customer_id ON cart(customer_id);
CREATE INDEX idx_wishlist_customer_id ON wishlist(customer_id);
CREATE INDEX idx_farmer_stock_farmer_id ON farmer_stock(farmer_id);
CREATE INDEX idx_products_farmer_id ON products(farmer_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farmers_updated_at BEFORE UPDATE ON farmers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wishlist_updated_at BEFORE UPDATE ON wishlist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmer_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic policies - you may need to adjust based on your auth setup)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all operations on farmers" ON farmers FOR ALL USING (true);
CREATE POLICY "Allow all operations on farmer_stock" ON farmer_stock FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all operations on order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on order_tracking" ON order_tracking FOR ALL USING (true);
CREATE POLICY "Allow all operations on payments" ON payments FOR ALL USING (true);
CREATE POLICY "Allow all operations on cart" ON cart FOR ALL USING (true);
CREATE POLICY "Allow all operations on wishlist" ON wishlist FOR ALL USING (true);
