import React from 'react';
import ErroIllustration from '../assets/page-not-found.jpg';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-white">
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">404 - Page Not Found</h2>
      <img
        src={ErroIllustration}
        alt="page not found"
        className="w-96 max-w-full mx-auto"
      />
      <p className="mt-4 text-gray-600">Sorry, the page you’re looking for doesn’t exist.</p>
    </div>
  </div>
  );
};

export default ErrorPage;
