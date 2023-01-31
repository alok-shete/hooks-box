import { useState, useEffect } from 'react';



export const KeyCodes = {
  Enter: 'Enter',
  Space: 'Space',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Escape: 'Escape',
  Tab: 'Tab',
  Backspace: 'Backspace',
  Delete: 'Delete',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
};

const useKeyPress = (targetKey: string, callback?: () => void): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === targetKey) {
      setKeyPressed(true);
      if (callback) callback();
    }
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.code === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyPressed;
};

export default useKeyPress;
