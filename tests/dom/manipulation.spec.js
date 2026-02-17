import { describe, test, expect, beforeEach } from 'vitest';
import { insertAtIdx } from '../../src/dom/manipulation';
import { logDOM } from '../helpers';

describe("DOM manipulation", () => {
  describe("insertAtIdx", () => {
    let parent;
    let child1;
    let child2;
    let newElement;

    beforeEach(() => {
      parent = document.createElement("div");
      child1 = document.createElement('span');
      child2 = document.createElement('span');
      newElement = document.createElement('div');

      child1.textContent = 'child1';
      child2.textContent = 'child2';
      newElement.textContent = 'new';
      
      parent.appendChild(child1);
      parent.appendChild(child2);
    });

    test("appends element when index is null", () => {
      insertAtIdx(newElement, parent, null);

      expect(parent.childNodes.length).toBe(3);
      expect(parent.lastChild).toBe(newElement);
      logDOM(parent);
    });

    test("unshift element at the beginning when index is 0", () => {
      insertAtIdx(newElement, parent, 0);
      
      expect(parent.childNodes.length).toBe(3);
      expect(parent.firstChild).toBe(newElement);
    });
  });
});