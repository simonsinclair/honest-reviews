import { Link } from '@remix-run/react';

import { AwardIcon } from '~/components/Icons';

export const Masthead = () => (
  <div className="bg-sky-900">
    <header className="container mx-auto flex items-center justify-between gap-4 px-4 antialiased">
      <Link
        to="/products"
        className="flex items-center gap-1.5 text-lg text-white hover:text-sky-200"
      >
        <AwardIcon aria-hidden />
        <strong>Honest Reviews</strong>
      </Link>
      <nav>
        <Link
          to="/products"
          className="block border-b-4 border-b-sky-300 pt-6 pb-5 font-bold text-white hover:text-sky-200"
        >
          Products
        </Link>
      </nav>
    </header>
  </div>
);
