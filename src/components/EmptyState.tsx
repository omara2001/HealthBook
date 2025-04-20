
import React from 'react';
import { Calendar, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'doctors' | 'appointments';
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center">
      <div className="rounded-full bg-muted p-3">
        {type === 'doctors' ? (
          <Search className="h-10 w-10 text-muted-foreground" />
        ) : (
          <Calendar className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
      <h3 className="mt-4 text-lg font-medium">No results found</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyState;
