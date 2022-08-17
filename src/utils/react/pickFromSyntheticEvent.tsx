import React from 'react';

// Оптимизируем код
function pickFromSyntheticEvent<T extends HTMLElement>() {
  // возвращается функцию, которая принимает ключ, который содержится в SyntheticEvent
  // -> которая возвращает функцию, которую примет наш callback (onChange)
  // -> которая возвращает функцию, которую примет event (e)
  // -> которая сделает callback (e.currentTarget) и возьмёт из него ключ [key]
  return <K extends keyof T>(key: K) =>
    <E extends (t: T[K]) => void>(fn: E) =>
    (e: React.SyntheticEvent<T>) =>
      fn(e.currentTarget[key]);
}
export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');
