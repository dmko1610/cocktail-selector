import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { VALID_CODES } from '../../constants';

describe('Sidebar', () => {
  it('displays all cocktail codes as navigation links', () => {
    render(
      <MemoryRouter>
        <Sidebar codes={VALID_CODES} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(4);
    links.forEach((link) => expect(link).toBeInTheDocument());
  });

  it('links point to correct paths', () => {
    render(
      <MemoryRouter>
        <Sidebar codes={VALID_CODES} />
      </MemoryRouter>
    );

    VALID_CODES.forEach((code) => {
      const link = screen.getByText(code[0].toUpperCase() + code.slice(1));
      expect(link.getAttribute('href')).toBe(`/${code}`);
    });
  });
});
