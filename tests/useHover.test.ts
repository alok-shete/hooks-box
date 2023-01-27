import { renderHook } from '@testing-library/react';

import { useHover } from './../src';

test('demo', async () => {
  const { result } = renderHook(() => useHover());

  console.log(result.current.at(0));
  //   act(() => {
  //     result.current.at(0).current = window;
  //     const event = new Event('mouseover');
  //     if (result.current.at(0)) {
  //       result.current.at(0).dispatchEvent(event);
  //     }
  //   });
});
