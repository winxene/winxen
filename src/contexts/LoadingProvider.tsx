'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import TerminalLoader from '@/components/ui/TerminalLoader';

const LoadingContext = createContext<boolean>(false);

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    // Check if user has visited before using localStorage
    const visited = localStorage.getItem('hasVisitedSite');

    if (visited) {
      // Already visited, don't show loader
      setShouldShowLoader(false);
      setIsLoading(false);
    } else {
      // First visit, show loader and mark as visited
      setShouldShowLoader(true);
      localStorage.setItem('hasVisitedSite', 'true');
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={isLoading}>
      {shouldShowLoader && <TerminalLoader isVisible={isLoading} onComplete={handleLoaderComplete} />}
      {children}
    </LoadingContext.Provider>
  );
}
