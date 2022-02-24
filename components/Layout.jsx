import React from 'react';
import { Header } from '.';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
