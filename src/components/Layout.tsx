import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home, User } from 'lucide-react';
import { ThemeToggle } from './ui/theme-toggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', label: 'Doctors', icon: <Home className="h-5 w-5" /> },
    { href: '/appointments', label: 'My Appointments', icon: <Calendar className="h-5 w-5" /> },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-md bg-medical-600 p-1">
              <User className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-medical-800 dark:text-medical-200">HealthBook</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-medical-600 ${
                        location.pathname === item.href ? 'text-medical-600' : 'text-foreground'
                      }`}
                    >
                      {React.cloneElement(item.icon, { 
                        className: `h-4 w-4 ${location.pathname === item.href ? 'text-medical-600' : 'text-foreground'}`
                      })}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 lg:p-8">{children}</main>
      
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                to={item.href}
                className={`flex flex-col items-center py-3 text-xs font-medium ${
                  location.pathname === item.href ? 'text-medical-600' : 'text-foreground'
                }`}
              >
                {React.cloneElement(item.icon, { 
                  className: `h-5 w-5 ${location.pathname === item.href ? 'text-medical-600' : 'text-foreground'}`
                })}
                <span className="mt-1">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Padding to account for mobile navigation */}
      <div className="pb-16 md:pb-0" />
    </div>
  );
};

export default Layout;
