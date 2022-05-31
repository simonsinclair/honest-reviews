import { useMatches } from '@remix-run/react';

export const useRouteData = <T>(routeId: string) => {
  const matches = useMatches();

  const data = matches.find((match) => match.id === routeId)?.data;
  if (!data) {
    throw new Error(`No data found for route matching ID ${routeId}.`);
  }

  return data as T;
};
