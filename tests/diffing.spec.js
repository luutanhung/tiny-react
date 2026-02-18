import { describe, test } from 'vitest';
import { diffArrays } from '../src';
import { log } from './helpers';

describe("diffing", () => {
  describe("diffArrays", () => {
    test("returns an array of operations", () => {
      const oldArr = ['A', 'B', 'C'];
      const newArr = ['C', 'B', 'D'];
      const equalFn = (a, b) => a === b;
      const seq = diffArrays(oldArr, newArr, equalFn);
      // log(seq);
    });
  })
})