/*
  # Seed Data for Shahi Pickle E-commerce Platform

  1. Categories
  2. Products with variants
  3. Initial inventory
  4. Sample admin user
  5. Sample coupons
*/

-- Insert categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Mango Pickles', 'mango-pickles', 'Traditional aam ka achaar varieties', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
  ('550e8400-e29b-41d4-a716-446655440002', 'Vegetable Pickles', 'vegetable-pickles', 'Mixed and single vegetable pickles', 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
  ('550e8400-e29b-41d4-a716-446655440003', 'Health Pickles', 'health-pickles', 'Immunity boosting combinations', 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
  ('550e8400-e29b-41d4-a716-446655440004', 'Citrus Pickles', 'citrus-pickles', 'Tangy lime and lemon varieties', 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=800', 4),
  ('550e8400-e29b-41d4-a716-446655440005', 'Seasonal Specials', 'seasonal-specials', 'Limited time seasonal offerings', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800', 5);

-- Insert products
INSERT INTO products (id, name, slug, description, short_description, category_id, base_price, compare_price, sku, weight, images, ingredients, nutritional_info, spice_level, shelf_life, is_featured, is_customizable, tags) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440101',
    'Premium Mango Pickle',
    'premium-mango-pickle',
    'Traditional Aam ka Achaar made with authentic Malda mangoes, mustard oil, and aromatic spices. A perfect blend of sweet, sour, and spicy flavors that captures the essence of Bengali culinary tradition.',
    'Traditional Aam ka Achaar with authentic Malda mangoes',
    '550e8400-e29b-41d4-a716-446655440001',
    299.00,
    350.00,
    'SP-MANGO-001',
    500,
    '["https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Raw Mangoes", "Mustard Oil", "Mustard Seeds", "Fenugreek", "Red Chili Powder", "Turmeric", "Salt"]',
    '{"calories": 45, "fat": 3.2, "carbs": 4.1, "protein": 0.8, "sodium": 890}',
    'Medium',
    '12 months',
    true,
    true,
    '["bestseller", "organic", "traditional"]'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440102',
    'Mixed Vegetable Pickle',
    'mixed-vegetable-pickle',
    'A delightful combination of seasonal vegetables including cauliflower, carrots, turnips, and green chilies, pickled with traditional Bengali spices.',
    'Seasonal vegetables with traditional Bengali spices',
    '550e8400-e29b-41d4-a716-446655440002',
    249.00,
    299.00,
    'SP-VEG-001',
    500,
    '["https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Cauliflower", "Carrots", "Turnips", "Green Chilies", "Mustard Oil", "Spices"]',
    '{"calories": 38, "fat": 2.8, "carbs": 3.5, "protein": 1.2, "sodium": 750}',
    'Hot',
    '10 months',
    true,
    false,
    '["organic", "mixed", "vegetables"]'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440103',
    'Garlic Ginger Pickle',
    'garlic-ginger-pickle',
    'Immunity-boosting pickle made with fresh garlic and ginger, perfect for health-conscious pickle lovers. Known for its medicinal properties.',
    'Immunity-boosting garlic and ginger combination',
    '550e8400-e29b-41d4-a716-446655440003',
    199.00,
    249.00,
    'SP-HEALTH-001',
    300,
    '["https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Fresh Garlic", "Ginger", "Mustard Oil", "Red Chili", "Turmeric", "Salt"]',
    '{"calories": 52, "fat": 4.1, "carbs": 2.8, "protein": 1.5, "sodium": 680}',
    'Extra Hot',
    '8 months',
    false,
    false,
    '["health", "immunity", "garlic", "ginger"]'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440104',
    'Lime & Chili Pickle',
    'lime-chili-pickle',
    'Tangy lime pickle with green chilies and mustard oil. A zesty accompaniment that adds a burst of flavor to any meal.',
    'Tangy lime with green chilies',
    '550e8400-e29b-41d4-a716-446655440004',
    179.00,
    220.00,
    'SP-CITRUS-001',
    400,
    '["https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Fresh Limes", "Green Chilies", "Mustard Oil", "Mustard Seeds", "Turmeric"]',
    '{"calories": 35, "fat": 2.5, "carbs": 3.2, "protein": 0.9, "sodium": 620}',
    'Mild',
    '6 months',
    false,
    false,
    '["tangy", "citrus", "lime"]'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440105',
    'Traditional Cauliflower Pickle',
    'traditional-cauliflower-pickle',
    'Classic Bengali gobi ka achaar made with fresh cauliflower florets and traditional mustard seed paste.',
    'Classic Bengali cauliflower pickle',
    '550e8400-e29b-41d4-a716-446655440002',
    229.00,
    279.00,
    'SP-VEG-002',
    500,
    '["https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Cauliflower", "Mustard Seeds", "Mustard Oil", "Turmeric", "Red Chili"]',
    '{"calories": 42, "fat": 3.1, "carbs": 3.8, "protein": 1.1, "sodium": 710}',
    'Medium',
    '10 months',
    false,
    false,
    '["traditional", "cauliflower", "bengali"]'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440106',
    'Spicy Carrot Pickle',
    'spicy-carrot-pickle',
    'Crunchy carrots in a fiery spice blend, perfect for those who love intense heat and bold flavors.',
    'Fiery spiced crunchy carrots',
    '550e8400-e29b-41d4-a716-446655440002',
    189.00,
    229.00,
    'SP-VEG-003',
    450,
    '["https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    '["Fresh Carrots", "Red Chili Powder", "Mustard Oil", "Fenugreek", "Asafoetida"]',
    '{"calories": 48, "fat": 3.5, "carbs": 4.2, "protein": 1.0, "sodium": 780}',
    'Extra Hot',
    '12 months',
    false,
    false,
    '["spicy", "carrots", "hot"]'
  );

-- Insert inventory for products
INSERT INTO inventory (product_id, variant_name, quantity, low_stock_threshold) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', 'Glass-500g', 150, 20),
  ('550e8400-e29b-41d4-a716-446655440101', 'Plastic-500g', 200, 30),
  ('550e8400-e29b-41d4-a716-446655440102', 'Glass-500g', 120, 15),
  ('550e8400-e29b-41d4-a716-446655440102', 'Plastic-500g', 180, 25),
  ('550e8400-e29b-41d4-a716-446655440103', 'Glass-300g', 100, 15),
  ('550e8400-e29b-41d4-a716-446655440103', 'Plastic-300g', 150, 20),
  ('550e8400-e29b-41d4-a716-446655440104', 'Glass-400g', 90, 12),
  ('550e8400-e29b-41d4-a716-446655440104', 'Plastic-400g', 130, 18),
  ('550e8400-e29b-41d4-a716-446655440105', 'Glass-500g', 80, 10),
  ('550e8400-e29b-41d4-a716-446655440105', 'Plastic-500g', 120, 15),
  ('550e8400-e29b-41d4-a716-446655440106', 'Glass-450g', 70, 10),
  ('550e8400-e29b-41d4-a716-446655440106', 'Plastic-450g', 110, 15);

-- Insert sample coupons
INSERT INTO coupons (code, name, description, type, value, minimum_amount, usage_limit, expires_at) VALUES
  ('WELCOME10', 'Welcome Discount', 'Get 10% off on your first order', 'percentage', 10.00, 299.00, 1000, '2024-12-31 23:59:59'),
  ('FREESHIP', 'Free Shipping', 'Free shipping on all orders', 'free_shipping', 0.00, 499.00, 500, '2024-12-31 23:59:59'),
  ('BULK20', 'Bulk Order Discount', 'Get ₹200 off on orders above ₹1500', 'fixed_amount', 200.00, 1500.00, 200, '2024-12-31 23:59:59'),
  ('FESTIVAL25', 'Festival Special', 'Get 25% off during festival season', 'percentage', 25.00, 999.00, 300, '2024-12-31 23:59:59');

-- Insert sample newsletter subscription
INSERT INTO newsletter_subscriptions (email, name, preferences) VALUES
  ('demo@shahipickle.com', 'Demo User', '{"recipes": true, "offers": true, "news": true}');