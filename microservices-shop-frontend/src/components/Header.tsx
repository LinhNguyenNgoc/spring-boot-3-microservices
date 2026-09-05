import React from 'react';
import keycloak from '../keycloak';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#1f2937] text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Spring Boot Microservices Shop</h1>
      <div className="text-right text-sm">
        <p className="font-semibold">Hi {keycloak.tokenParsed?.preferred_username || 'user'}</p>
        <button 
          onClick={() => keycloak.logout()} 
          className="text-gray-400 hover:underline text-xs"
        >
          Logout
        </button>
      </div>
    </header>
  );
};