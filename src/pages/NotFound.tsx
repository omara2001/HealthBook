
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold text-medical-800">404</h1>
      <h2 className="mb-8 text-2xl font-medium">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
