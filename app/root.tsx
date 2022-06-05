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
import { Footer } from './components/Footer';
import { Masthead } from './components/Masthead';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Honest Reviews',
  description:
    'Honest product reviews to help buyers make the best purchase decisions.',
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
      <body className="flex min-h-screen flex-col overflow-y-scroll bg-gray-100">
        <Masthead />
        <div role="main" className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
