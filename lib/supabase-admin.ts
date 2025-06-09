import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Admin client with service role key for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Admin functions
export const adminFunctions = {
  // Get all orders with user details
  async getAllOrders(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email,
          phone
        ),
        order_items (
          *,
          products (
            name,
            images
          )
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error, count };
  },

  // Get dashboard analytics
  async getDashboardStats() {
    const [ordersResult, productsResult, usersResult, revenueResult] = await Promise.all([
      supabaseAdmin.from('orders').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('profiles').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('orders').select('total_amount').eq('payment_status', 'paid')
    ]);

    const totalRevenue = revenueResult.data?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

    return {
      totalOrders: ordersResult.count || 0,
      totalProducts: productsResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalRevenue
    };
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: string, adminNotes?: string) {
    const updateData: any = { status, updated_at: new Date().toISOString() };
    if (adminNotes) updateData.admin_notes = adminNotes;
    if (status === 'shipped') updateData.shipped_at = new Date().toISOString();
    if (status === 'delivered') updateData.delivered_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    return { data, error };
  },

  // Get low stock products
  async getLowStockProducts() {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .select(`
        *,
        products (
          name,
          sku,
          images
        )
      `)
      .lt('quantity', 'low_stock_threshold');

    return { data, error };
  },

  // Update product inventory
  async updateInventory(productId: string, variantName: string, quantity: number) {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .update({ quantity, updated_at: new Date().toISOString() })
      .eq('product_id', productId)
      .eq('variant_name', variantName)
      .select()
      .single();

    return { data, error };
  },

  // Create or update product
  async upsertProduct(product: any) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .upsert(product)
      .select()
      .single();

    return { data, error };
  },

  // Delete product
  async deleteProduct(productId: string) {
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', productId);

    return { error };
  },

  // Get sales analytics
  async getSalesAnalytics(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('created_at, total_amount, status')
      .gte('created_at', startDate.toISOString())
      .eq('payment_status', 'paid');

    return { data, error };
  },

  // Customer management
  async getAllCustomers(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabaseAdmin
      .from('profiles')
      .select(`
        *,
        orders (
          id,
          total_amount,
          created_at,
          payment_status
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error, count };
  },

  // Product management
  async getAllProducts(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        categories (
          name
        ),
        inventory (
          quantity,
          low_stock_threshold
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error, count };
  },

  // Inventory management
  async getInventoryReport() {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .select(`
        *,
        products (
          name,
          sku,
          base_price,
          images
        )
      `)
      .order('quantity', { ascending: true });

    return { data, error };
  },

  // Analytics functions
  async getRevenueAnalytics(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('created_at, total_amount, payment_status')
      .gte('created_at', startDate.toISOString())
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: true });

    return { data, error };
  },

  async getTopProducts(limit = 10) {
    const { data, error } = await supabaseAdmin
      .from('order_items')
      .select(`
        product_id,
        product_name,
        quantity,
        unit_price,
        products (
          name,
          images
        )
      `)
      .limit(limit);

    return { data, error };
  },

  // Newsletter management
  async getNewsletterSubscribers(page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .order('subscribed_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error, count };
  },

  // Coupon management
  async getAllCoupons() {
    const { data, error } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async createCoupon(coupon: any) {
    const { data, error } = await supabaseAdmin
      .from('coupons')
      .insert(coupon)
      .select()
      .single();

    return { data, error };
  },

  async updateCoupon(id: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('coupons')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  async deleteCoupon(id: string) {
    const { error } = await supabaseAdmin
      .from('coupons')
      .delete()
      .eq('id', id);

    return { error };
  }
};