import { useAsync } from './../src';
import { act, renderHook } from '@testing-library/react-hooks';

describe('useAsync', () => {
  test('should return initial state', () => {
    const { result } = renderHook(() =>
      useAsync(() => Promise.resolve('test'), false),
    );
    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('should execute the async function and update state', async () => {
    const asyncFunction = jest.fn(() => Promise.resolve('test'));
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    await waitForNextUpdate();

    expect(asyncFunction).toHaveBeenCalled();
    console.log('result.current.value', result.current.value);
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe('test');
    expect(result.current.error).toBe(null);
  });

  it('should handle async function error and update state', async () => {
    const asyncFunction = jest.fn(() => Promise.reject(new Error()));
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction, false),
    );

    act(() => {
      result.current.execute();
    });

    await waitForNextUpdate();

    expect(asyncFunction).toHaveBeenCalled();
    expect(result.current.status).toBe('error');
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('should not execute the async function immediately', async () => {
    const asyncFunction = jest.fn(() => Promise.resolve('test'));
    const { result } = renderHook(() => useAsync(asyncFunction, false));

    // await waitForNextUpdate();

    expect(asyncFunction).not.toHaveBeenCalled();
    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);
  });
});
