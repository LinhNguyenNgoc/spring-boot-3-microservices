import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export const AddProduct: React.FC = () => {
  const [skuCode, setSkuCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/api/product', { skuCode, name, description, price });
    navigate('/');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU Code</label>
          <input type="text" className="w-full p-2 border rounded mt-1" value={skuCode} onChange={(e) => setSkuCode(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" className="w-full p-2 border rounded mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea className="w-full p-2 border rounded mt-1 h-24" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" className="w-full p-2 border rounded mt-1" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <button type="submit" className="bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2 rounded-md font-medium">
          Add Product
        </button>
      </form>
    </div>
  );
};