import { assoc } from '../js/assoc';

// библиотека nanoid

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

// здесь generateRandomString() вызывается всего 1 раз при объявлении
export const assignId = assoc('id', generateRandomString());

// теперь generateRandomString() будет вызываться каждый раз
export const generateID = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);
