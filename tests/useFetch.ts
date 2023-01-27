// import { useFetch } from '../src';
// import { renderHook, act } from '@testing-library/react-hooks';
// import fetch from 'jest-fetch-mock';

// eslint-disable-next-line no-undef
describe('useFetch', () => {
  test('demo', () => {
    console.log('demo');
  });

  // beforeEach(() => {
  //   fetch.resetMocks();
  // });
  // test('should return data, error, loading, and retry', async () => {
  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useFetch('https://jsonplaceholder.typicode.com/todos/1'),
  //   );
  //   // await waitForNextUpdate();
  //   // console.log('result.current.loading', result.current);
  //   expect(result.current.data).toBe(null);
  //   expect(result.current.error).toBe(null);
  //   expect(result.current.loading).toBe(true);
  //   expect(result.current.retry).toBeInstanceOf(Function);
  //   act(() => {
  //     fetch.mockResponseOnce(
  //       JSON.stringify({
  //         title: 'delectus aut autem',
  //         completed: false,
  //       }),
  //     );
  //   });
  //   expect(result.current.data).toEqual({
  //     title: 'delectus aut autem',
  //     completed: false,
  //   });
  //   expect(result.current.error).toBe(null);
  //   expect(result.current.loading).toBe(false);
  // });
  // test('should handle errors', () => {
  //   let result;
  //   act(() => {
  //     result = renderHook(() =>
  //       useFetch('https://jsonplaceholder.typicode.com/todos/1'),
  //     );
  //   });
  //   if (!result) {
  //     return;
  //   }
  //   expect(result.current.data).toBe(null);
  //   expect(result.current.error).toBe(null);
  //   expect(result.current.loading).toBe(true);
  //   expect(result.current.retry).toBeInstanceOf(Function);
  //   act(() => {
  //     fetch.mockRejectOnce(new Error('Failed to fetch'));
  //   });
  //   expect(result.current.data).toBe(null);
  //   expect(result.current.error).toEqual(new Error('Failed to fetch'));
  //   expect(result.current.loading).toBe(false);
  // });
});
//   'should retry on error'
