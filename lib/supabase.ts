import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          full_name: string | null;
          avatar_url: string | null;
          date_of_birth: string | null;
          gender: string | null;
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          preferences?: any;
        };
        Update: {
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          date_of_birth?: string | null;
          gender?: string | null;
          preferences?: any;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          category_id: string | null;
          base_price: number;
          compare_price: number | null;
          cost_price: number | null;
          sku: string | null;
          barcode: string | null;
          weight: number | null;
          dimensions: any;
          images: any;
          ingredients: any;
          nutritional_info: any;
          spice_level: string;
          shelf_life: string | null;
          storage_instructions: string | null;
          is_organic: boolean;
          is_customizable: boolean;
          is_active: boolean;
          is_featured: boolean;
          tags: any;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          status: string;
          payment_status: string;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          discount_amount: number;
          total_amount: number;
          shipping_address: any;
          billing_address: any | null;
          payment_method: string | null;
          payment_id: string | null;
          shipping_method: string | null;
          tracking_number: string | null;
          estimated_delivery_date: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          notes: string | null;
          admin_notes: string | null;
          coupon_code: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};