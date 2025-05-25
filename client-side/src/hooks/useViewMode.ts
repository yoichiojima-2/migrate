/**
 * Hook for managing view mode
 */
import { useState } from 'react';
import type { ViewMode } from '../types';

/**
 * Custom hook for managing view mode
 * @param initialMode - The initial view mode
 * @returns Object containing view mode state and setter
 */
export function useViewMode(initialMode: ViewMode = 'grouped') {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  // Toggle between grouped and individual view modes
  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'grouped' ? 'individual' : 'grouped');
  };

  // Set view mode to grouped
  const setGroupedView = () => {
    setViewMode('grouped');
  };

  // Set view mode to individual
  const setIndividualView = () => {
    setViewMode('individual');
  };

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    setGroupedView,
    setIndividualView,
    isGrouped: viewMode === 'grouped',
    isIndividual: viewMode === 'individual'
  };
}
