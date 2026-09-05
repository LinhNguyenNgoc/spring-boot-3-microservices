import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import keycloak from './keycloak';
import { Header } from './components/Header';
import { ProductList } from './pages/ProductList';
import { AddProduct } from './pages/AddProduct';

export const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      setAuthenticated(authenticated);
    });
  }, []);

  if (!authenticated) return <div>Loading & Authenticating...</div>;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;