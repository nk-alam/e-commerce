'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  MoreHorizontal,
  Package,
  Eye,
  Copy
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { adminFunctions } from '@/lib/supabase-admin';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  compare_price: number | null;
  sku: string | null;
  images: string[];
  spice_level: string;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  categories?: {
    name: string;
  };
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load products');
        return;
      }

      setProducts(data || []);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await adminFunctions.deleteProduct(productId);
      
      if (error) {
        toast.error('Failed to delete product');
        return;
      }

      toast.success('Product deleted successfully');
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const toggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !isActive })
        .eq('id', productId);

      if (error) {
        toast.error('Failed to update product status');
        return;
      }

      toast.success(`Product ${!isActive ? 'activated' : 'deactivated'} successfully`);
      loadProducts();
    } catch (error) {
      toast.error('Failed to update product status');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.is_active) ||
                         (statusFilter === 'inactive' && !product.is_active);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <Button className="bg-saffron hover:bg-saffron/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={product.images[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.is_featured && (
                    <Badge className="bg-saffron">Featured</Badge>
                  )}
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => toggleProductStatus(product.id, product.is_active)}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        {product.is_active ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-saffron">₹{product.base_price}</span>
                      {product.compare_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.compare_price}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.spice_level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>SKU: {product.sku || 'N/A'}</span>
                    <span>{product.categories?.name}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Created: {new Date(product.created_at).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
            </p>
            <Button className="bg-saffron hover:bg-saffron/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}