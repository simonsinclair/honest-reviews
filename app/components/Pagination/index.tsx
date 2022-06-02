import { Link } from '@remix-run/react';
import pgr from '@simonsinclair/pgr';

type Props = {
  totalPages: number;
  currentPage: number;
  length?: number;
};

export const Pagination = ({ totalPages, currentPage, length = 5 }: Props) => (
  <ol className="flex gap-1">
    {pgr(totalPages, currentPage, length, (pageNumber) => {
      const isCurrentPage = currentPage === pageNumber;
      return (
        <li key={pageNumber}>
          <Link
            to={`?page=${pageNumber}`}
            aria-current={isCurrentPage ? 'page' : undefined}
            className={
              isCurrentPage
                ? 'block rounded-full p-2 font-medium leading-none shadow shadow-sky-400 hover:shadow-sky-400'
                : 'block rounded-full p-2 font-medium leading-none shadow hover:shadow-sky-400'
            }
          >
            <div className="flex h-6 w-6 items-center justify-center">
              {pageNumber}
            </div>
          </Link>
        </li>
      );
    })}
  </ol>
);
