import { patchStyles } from '../../src';
import { describe, it, expect, beforeEach } from 'vitest';

describe('patchStyles', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
  });

  it('should add new style properties', () => {
    const oldStyle = {};
    const newStyle = { color: 'red' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('red');
  });

  it('should remove style properties that are no longer present', () => {
    el.style.color = 'red';
    el.style.fontSize = '16px';

    const oldStyle = { color: 'red', fontSize: '16px' };
    const newStyle = { color: 'red' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('red');
    expect(el.style.fontSize).toBe('');
  });

  it('should update changed style properties', () => {
    el.style.color = 'red';

    const oldStyle = { color: 'red' };
    const newStyle = { color: 'blue' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('blue');
  });

  it('should handle multiple style changes at once', () => {
    el.style.color = 'red';
    el.style.fontSize = '14px';
    el.style.margin = '10px';

    const oldStyle = { color: 'red', fontSize: '14px', margin: '10px' };
    const newStyle = { color: 'green', fontSize: '16px', padding: '5px' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('green');
    expect(el.style.fontSize).toBe('16px');
    expect(el.style.margin).toBe('');
    expect(el.style.padding).toBe('5px');
  });

  it('should handle empty style objects', () => {
    const oldStyle = {};
    const newStyle = {};

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.cssText).toBe('');
  });

  it('should handle removing all styles', () => {
    el.style.color = 'red';
    el.style.fontSize = '16px';

    const oldStyle = { color: 'red', fontSize: '16px' };
    const newStyle = {};

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('');
    expect(el.style.fontSize).toBe('');
  });

  it('should handle adding all styles to empty element', () => {
    const oldStyle = {};
    const newStyle = { color: 'red', fontSize: '16px', margin: '10px' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('red');
    expect(el.style.fontSize).toBe('16px');
    expect(el.style.margin).toBe('10px');
  });

  it('should handle complex CSS property values', () => {
    const oldStyle = {};
    const newStyle = {
      transform: 'rotate(45deg) scale(1.5)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      background: 'linear-gradient(to right, red, blue)'
    };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.transform).toBe('rotate(45deg) scale(1.5)');
    expect(el.style.boxShadow).toBe('0 4px 6px rgba(0, 0, 0, 0.1)');
    expect(el.style.background).toBe('linear-gradient(to right, red, blue)');
  });

  it('should handle camelCase CSS properties', () => {
    const oldStyle = {};
    const newStyle = {
      backgroundColor: 'yellow',
      fontSize: '14px',
      zIndex: '10'
    };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.backgroundColor).toBe('yellow');
    expect(el.style.fontSize).toBe('14px');
    expect(el.style.zIndex).toBe('10');
  });

  it('should preserve unchanged style properties', () => {
    el.style.color = 'red';
    el.style.fontSize = '16px';

    const oldStyle = { color: 'red', fontSize: '16px' };
    const newStyle = { color: 'red', fontSize: '16px' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('red');
    expect(el.style.fontSize).toBe('16px');
  });

  it('should handle null or undefined style values', () => {
    const oldStyle = { color: 'red' };
    const newStyle = { color: null };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.color).toBe('');
  });

  it('should handle numeric style values', () => {
    const oldStyle = {};
    const newStyle = { opacity: 0.5, zIndex: 10 };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.opacity).toBe('0.5');
    expect(el.style.zIndex).toBe('10');
  });

  it('should handle style properties with special characters', () => {
    const oldStyle = {};
    const newStyle = {
      fontFamily: 'Arial, "Helvetica Neue", sans-serif',
      content: '"hello"'
    };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.fontFamily).toBe('Arial, "Helvetica Neue", sans-serif');
    expect(el.style.content).toBe('"hello"');
  });

  it('should handle whitespace in style values', () => {
    const oldStyle = {};
    const newStyle = { margin: '  10px  20px  ' };

    patchStyles(el, oldStyle, newStyle);

    expect(el.style.margin).toBe('10px 20px');
  });
});
