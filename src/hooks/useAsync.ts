import * as React from 'react';

const { useState, useCallback, useEffect } = React;

export type STATUS_TYPE = 'idle' | 'pending' | 'success' | 'error';

function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) {
  /**
   * declare status
   */

  const [state, setState] = useState<{
    status: STATUS_TYPE;
    value: T | null;
    error: E | null;
  }>({
    status: 'idle',
    value: null,
    error: null,
  });

  /**
   * The execute function wraps asyncFunction and
   * handles setting state for pending, value, and error.
   * useCallback ensures the below useEffect is not called
   * on every render, but only if asyncFunction changes.
   */
  const execute = useCallback(async () => {
    setState((pre) => ({
      ...pre,
      status: 'pending',
      value: null,
      error: null,
    }));

    try {
      const response = await asyncFunction();
      setState((pre) => ({
        ...pre,
        status: 'success',
        value: response,
      }));
    } catch (error: any) {
      setState((pre) => ({
        ...pre,
        status: 'error',
        error: error,
      }));
    }
  }, [asyncFunction]);

  /**
   * Call execute if we want to fire it right away.
   * Otherwise execute can be called later, such as
   * in an onClick handler.
   */
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status: state.status,
    value: state.value,
    error: state.error,
  };
}
export default useAsync;
