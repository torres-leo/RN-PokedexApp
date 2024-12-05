import {useEffect, useState} from 'react';

export default function useDebounce(input: string = '', timer: number = 800) {
  const [debounce, setDebounce] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(input);
    }, timer);

    return () => clearTimeout(timeout);
  }, [input, timer]);

  return debounce;
}
