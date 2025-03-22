import { cleanup, render, screen } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Admin from './page';

const mocks = vi.hoisted(() => ({
  getCurrentSession: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('../login/lib/actions', () => ({
  getCurrentSession: mocks.getCurrentSession,
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));

vi.mock('@/components/Page', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageContainer', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/PageHeader', () => ({
  default: vi.fn(({ preTitle, title }: { preTitle: string; title: string }) => (
    <div>
      <div>{preTitle}</div>
      <div>{title}</div>
    </div>
  )),
}));

vi.mock('@/components/PageBody', () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )),
}));

vi.mock('@/components/NavHeader', () => ({
  default: vi.fn(() => <div>NavHeader</div>),
}));

vi.mock('@/components/NavMenu', () => ({
  default: vi.fn(() => <div>NavMenu</div>),
}));

vi.mock('@/components/PageFooter', () => ({
  default: vi.fn(() => <div>PageFooter</div>),
}));

vi.mock('./partials/AdminTabs', () => ({
  default: vi.fn(() => <div>AdminTabs</div>),
}));

vi.mock('./partials/SecurityTab', () => ({
  default: vi.fn(() => <div>SecurityTab</div>),
}));

vi.mock('./partials/UserModal', () => ({
  default: vi.fn(() => <div>UserModal</div>),
}));

vi.mock('./partials/UsersTable', () => ({
  default: vi.fn(() => <div>UsersTable</div>),
}));

describe('Admin Page', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should redirect to login if user is not authenticated', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: null });

    await Admin();

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should redirect to home if user is not an admin', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: { id: 1, role: 'user' } });

    await Admin();

    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('should render admin page if user is an admin', async () => {
    mocks.getCurrentSession.mockResolvedValue({ user: { id: 1, role: 'admin' } });

    render(await Admin());

    expect(screen.getByText('Admin')).toBeDefined();
    expect(screen.getByText('Configuration')).toBeDefined();
    expect(screen.getByText('NavHeader')).toBeDefined();
    expect(screen.getByText('NavMenu')).toBeDefined();
    expect(screen.getByText('AdminTabs')).toBeDefined();
    expect(screen.getByText('UsersTable')).toBeDefined();
    expect(screen.getByText('PageFooter')).toBeDefined();
  });
});