import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      {children}
    </div>
  );
}