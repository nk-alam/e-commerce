/*
  # Initial Schema for Shahi Pickle E-commerce Platform

  1. New Tables
    - `profiles` - User profiles and preferences
    - `products` - Product catalog with variants
    - `categories` - Product categories
    - `cart_items` - Shopping cart persistence
    - `addresses` - User shipping addresses
    - `orders` - Order management
    - `order_items` - Order line items
    - `reviews` - Product reviews and ratings
    - `coupons` - Discount codes
    - `inventory` - Stock management
    - `custom_recipes` - Custom pickle recipes
    - `newsletters` - Newsletter subscriptions
    - `admin_users` - Admin panel access

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Admin-only policies for management tables
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  phone text UNIQUE,
  full_name text,
  avatar_url text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  parent_id uuid REFERENCES categories(id),
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  category_id uuid REFERENCES categories(id),
  base_price decimal(10,2) NOT NULL,
  compare_price decimal(10,2),
  cost_price decimal(10,2),
  sku text UNIQUE,
  barcode text,
  weight decimal(8,2),
  dimensions jsonb,
  images jsonb DEFAULT '[]',
  ingredients jsonb DEFAULT '[]',
  nutritional_info jsonb DEFAULT '{}',
  spice_level text DEFAULT 'Medium' CHECK (spice_level IN ('Mild', 'Medium', 'Hot', 'Extra Hot')),
  shelf_life text,
  storage_instructions text,
  is_organic boolean DEFAULT true,
  is_customizable boolean DEFAULT false,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  tags jsonb DEFAULT '[]',
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  variant_name text DEFAULT 'default',
  quantity integer NOT NULL DEFAULT 0,
  reserved_quantity integer DEFAULT 0,
  low_stock_threshold integer DEFAULT 10,
  track_inventory boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, variant_name)
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text DEFAULT 'home' CHECK (type IN ('home', 'work', 'other')),
  full_name text NOT NULL,
  phone text NOT NULL,
  address_line_1 text NOT NULL,
  address_line_2 text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  variant_options jsonb DEFAULT '{}',
  custom_recipe_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id, variant_options)
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed_amount', 'free_shipping')),
  value decimal(10,2) NOT NULL,
  minimum_amount decimal(10,2) DEFAULT 0,
  maximum_discount decimal(10,2),
  usage_limit integer,
  used_count integer DEFAULT 0,
  user_limit integer DEFAULT 1,
  starts_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES profiles(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  
  -- Pricing
  subtotal decimal(10,2) NOT NULL,
  tax_amount decimal(10,2) DEFAULT 0,
  shipping_amount decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  
  -- Addresses
  shipping_address jsonb NOT NULL,
  billing_address jsonb,
  
  -- Payment & Shipping
  payment_method text,
  payment_id text,
  shipping_method text,
  tracking_number text,
  
  -- Dates
  estimated_delivery_date date,
  shipped_at timestamptz,
  delivered_at timestamptz,
  
  -- Additional info
  notes text,
  admin_notes text,
  coupon_code text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  product_image text,
  variant_options jsonb DEFAULT '{}',
  quantity integer NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  custom_recipe_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  order_id uuid REFERENCES orders(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  images jsonb DEFAULT '[]',
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id, order_id)
);

-- Custom recipes table
CREATE TABLE IF NOT EXISTS custom_recipes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  base_ingredient text NOT NULL,
  spice_level text NOT NULL CHECK (spice_level IN ('Mild', 'Medium', 'Hot', 'Extra Hot')),
  oil_type text NOT NULL CHECK (oil_type IN ('Mustard', 'Sesame', 'Mixed')),
  additional_ingredients jsonb DEFAULT '[]',
  jar_type text DEFAULT 'Glass' CHECK (jar_type IN ('Glass', 'Plastic')),
  quantity integer DEFAULT 500,
  special_instructions text,
  price decimal(10,2),
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  preferences jsonb DEFAULT '{}',
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  role text DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'manager', 'staff')),
  permissions jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);

-- Products policies (public read)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);

-- Inventory policies (public read for available stock)
CREATE POLICY "Anyone can view inventory" ON inventory FOR SELECT USING (true);

-- Addresses policies
CREATE POLICY "Users can manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Cart items policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);

-- Custom recipes policies
CREATE POLICY "Users can manage own recipes" ON custom_recipes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view public recipes" ON custom_recipes FOR SELECT USING (is_public = true);

-- Newsletter policies
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own subscription" ON newsletter_subscriptions FOR UPDATE USING (true);

-- Admin policies
CREATE POLICY "Only admins can access admin table" ON admin_users FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid() AND admin_users.is_active = true)
);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_recipes_updated_at BEFORE UPDATE ON custom_recipes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();