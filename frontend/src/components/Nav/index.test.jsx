import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { describe, it, expect } from 'vitest';
import { ROUTES } from '../../constants/route.constant';
import Nav from './';

describe('<Nav />', () => {
  it('should navigate to /waiters when "Waiters" link is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );
    const WaitersLink = screen.getByText('Waiters');

    history.push(ROUTES.COOKS.path);
    fireEvent.click(WaitersLink);
    expect(history.location.pathname).toBe(ROUTES.WAITERS.path);
  });

  it('should navigate to /cooks when "Cooks" link is clicked', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );
    const cooksLink = screen.getByText('Cooks');

    history.push(ROUTES.WAITERS.path);
    fireEvent.click(cooksLink);
    expect(history.location.pathname).toBe(ROUTES.COOKS.path);
  });

  const highlightedClasses = 'bg-gray-100 text-black';
  const unhighlightedClasses = 'hover:bg-blue-800 text-white';

  it('should highlight "Waiters" link when on /waiters route', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.WAITERS.path]}>
        <Nav />
      </MemoryRouter>
    );

    const waitersLink = screen.getByText('Waiters');
    const cooksLink = screen.getByText('Cooks');

    expect(waitersLink).toHaveClass(highlightedClasses);
    expect(cooksLink).toHaveClass(unhighlightedClasses);
  });

  it('should highlight "Cooks" link when on /cooks route', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.COOKS.path]}>
        <Nav />
      </MemoryRouter>
    );

    const waitersLink = screen.getByText('Waiters');
    const cooksLink = screen.getByText('Cooks');

    expect(waitersLink).toHaveClass(unhighlightedClasses);
    expect(cooksLink).toHaveClass(highlightedClasses);
  });
});
