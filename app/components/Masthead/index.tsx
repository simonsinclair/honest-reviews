import { Link } from '@remix-run/react';

export const Masthead = () => (
  <div className="bg-sky-900">
    <header className="container mx-auto flex items-center justify-between gap-4 px-4 antialiased">
      <Link to="/products" className="text-lg text-white hover:text-sky-200">
        <strong>Honest Reviews</strong>
      </Link>
      <nav>
        <Link
          to="/products"
          className="block border-b-4 border-b-sky-300 px-4 pt-6 pb-5 font-bold text-white hover:text-sky-200"
        >
          Products
        </Link>
      </nav>
    </header>
  </div>
);
