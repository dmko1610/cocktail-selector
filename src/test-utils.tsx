import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

type RouteConfig = {
  path: string;
  element: ReactElement;
};

interface RenderWithRouterOptions extends RenderOptions {
  initialEntries?: string[];
  routes: RouteConfig[];
}

export function renderWithRouter(
  ui: ReactElement,
  { initialEntries = ['/'], routes, ...renderOptions }: RenderWithRouterOptions
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </MemoryRouter>,
    renderOptions
  );
}
