import { describe, test } from 'vitest';
import { diffArray } from '../src';
import { log } from './helpers';

describe("diffing", () => {
  describe("diffArray", () => {
    test.only("returns an array of operations", () => {
      const oldArr = ['A', 'B', 'C'];
      const newArr = ['C', 'B', 'D'];
      const equalFn = (a, b) => a === b;
      const seq = diffArray(oldArr, newArr, equalFn);
      // log(seq);
    });
  })
})