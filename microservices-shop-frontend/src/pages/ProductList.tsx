import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

interface Product {
  id: string;
  skuCode: string;
  name: string;
  price: number;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/product').then((res) => setProducts(res.data));
  }, []);

  const handleOrder = async (product: Product) => {
    const quantity = quantities[product.id] || 1;
    await api.post('/api/order', {
      skuCode: product.skuCode,
      price: product.price,
      quantity,
    });
    alert('Order placed successfully!');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products ({products.length})</h2>
        <button
          onClick={() => navigate('/add-product')}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded-md font-medium"
        >
          Create Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-[#f3f4f6] p-4 rounded-md flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{product.name} - <span className="font-normal text-gray-600">Price: {product.price}</span></p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">Quantity:</span>
                <input
                  type="number"
                  min="1"
                  className="w-16 p-1 border rounded bg-white text-sm"
                  onChange={(e) => setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <button
              onClick={() => handleOrder(product)}
              className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded-md font-medium"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};