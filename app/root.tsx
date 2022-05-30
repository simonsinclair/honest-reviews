import type { MetaFunction, LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import css from '~/css/main.css';
import { Masthead } from './components/Masthead';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Honest Reviews',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: css,
    },
  ];
};

export default function App() {
  return (
    <html lang="en-GB">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Masthead />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
