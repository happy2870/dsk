'use client';

import { cn } from '../../utils';
import { HeaderDropdown, type DropdownChild } from './HeaderDropdown';

// Header.Logo
interface HeaderLogoProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function HeaderLogo({ onClick, children, className }: HeaderLogoProps) {
  return (
    <button onClick={onClick} className={cn('cursor-pointer', className)}>
      {children}
    </button>
  );
}

// Header.Nav
interface HeaderNavProps {
  children: React.ReactNode;
}

function HeaderNav({ children }: HeaderNavProps) {
  return (
    <nav className="flex items-center gap-8 mb-[3px]">
      {children}
    </nav>
  );
}

// Header.NavLink
interface HeaderNavLinkProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

function HeaderNavLink({ active, disabled, onClick, children }: HeaderNavLinkProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-md text-[18px] transition-colors cursor-pointer',
        disabled && 'cursor-not-allowed opacity-50',
        active ? 'text-[#0069FF] font-bold' : 'text-black',
      )}
    >
      {children}
    </button>
  );
}

// Header.NavDropdown
interface HeaderNavDropdownProps {
  name: string;
  items: DropdownChild[];
  onSelect?: (item: DropdownChild) => void;
}

function HeaderNavDropdown({ name, items, onSelect }: HeaderNavDropdownProps) {
  return <HeaderDropdown name={name} items={items} onSelect={onSelect} />;
}

// Header.Actions
interface HeaderActionsProps {
  children: React.ReactNode;
}

function HeaderActions({ children }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-1 pr-5 ml-auto">
      {children}
    </div>
  );
}

// Header (root)
interface HeaderProps {
  children: React.ReactNode;
}

function HeaderRoot({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white h-[65px] border-b border-[#DDDDDD]">
      <div className="flex items-center gap-[48px] px-6 h-full">
        {children}
      </div>
    </header>
  );
}

export const Header = Object.assign(HeaderRoot, {
  Logo: HeaderLogo,
  Nav: HeaderNav,
  NavLink: HeaderNavLink,
  NavDropdown: HeaderNavDropdown,
  Actions: HeaderActions,
});
