import { NavLink } from '@remix-run/react';
import pgr from '@simonsinclair/pgr';

type Props = {
  totalPages: number;
  currentPage: number;
  length?: number;
};

export const Pagination = ({ totalPages, currentPage, length = 5 }: Props) => (
  <ol className="flex gap-1">
    {pgr(totalPages, currentPage, length, (pageNumber) => (
      <li key={pageNumber}>
        <NavLink
          to={`?page=${pageNumber}`}
          className="block rounded-full p-2 font-medium leading-none shadow transition-colors hover:shadow-md"
        >
          <div className="flex h-6 w-6 items-center justify-center">
            {pageNumber}
          </div>
        </NavLink>
      </li>
    ))}
  </ol>
);
