import { patchText } from '../../src';
import { describe, it, expect, beforeEach } from 'vitest';

describe('patchText', () => {
  let oldVNode;
  let newVNode;
  let textNode;

  beforeEach(() => {
    // Create a fresh text node before each test
    textNode = document.createTextNode('');
    
    // Setup base oldVNode
    oldVNode = {
      el: textNode,
      value: 'initial text'
    };
  });

  it('should update text node value when new value is different', () => {
    // Arrange
    oldVNode.value = 'Hello World';
    newVNode = {
      value: 'Updated Text'
    };
    
    // Set initial text node value
    oldVNode.el.nodeValue = 'Hello World';

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('Updated Text');
  });

  it('should not update text node when values are the same', () => {
    // Arrange
    oldVNode.value = 'Same Text';
    newVNode = {
      value: 'Same Text'
    };
    
    // Set initial text node value
    const initialValue = 'Same Text';
    oldVNode.el.nodeValue = initialValue;

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe(initialValue);
  });

  it('should handle empty string values correctly', () => {
    // Arrange
    oldVNode.value = 'non-empty';
    newVNode = {
      value: ''
    };
    oldVNode.el.nodeValue = 'non-empty';

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('');
  });

  it('should handle numeric values converted to strings', () => {
    // Arrange
    oldVNode.value = '123';
    newVNode = {
      value: 456
    };
    oldVNode.el.nodeValue = '123';

    // Act
    patchText(oldVNode, newVNode);

    // Assert - nodeValue expects string, but function compares with !==
    expect(oldVNode.el.nodeValue).toBe('456');
  });

  // it('should handle null values', () => {
  //   // Arrange
  //   oldVNode.value = 'text';
  //   newVNode = {
  //     value: null
  //   };
  //   oldVNode.el.nodeValue = 'text';

  //   // Act
  //   patchText(oldVNode, newVNode);

  //   // Assert
  //   expect(oldVNode.el.nodeValue).toBe(null);
  // });

  // it('should handle undefined values', () => {
  //   // Arrange
  //   oldVNode.value = 'text';
  //   newVNode = {
  //     value: undefined
  //   };
  //   oldVNode.el.nodeValue = 'text';

  //   // Act
  //   patchText(oldVNode, newVNode);

  //   // Assert
  //   expect(oldVNode.el.nodeValue).toBe(undefined);
  // });

  it('should handle boolean values', () => {
    // Arrange
    oldVNode.value = 'false';
    newVNode = {
      value: true
    };
    oldVNode.el.nodeValue = 'false';

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('true');
  });

  it('should work when oldVNode has no value property', () => {
    // Arrange
    oldVNode = {
      el: textNode
      // no value property
    };
    textNode.nodeValue = 'some text';
    
    newVNode = {
      value: 'new text'
    };

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('new text');
  });

  // it('should work when newVNode has no value property', () => {
  //   // Arrange
  //   oldVNode.value = 'old text';
  //   oldVNode.el.nodeValue = 'old text';
    
  //   newVNode = {
  //     // no value property
  //   };

  //   // Act
  //   patchText(oldVNode, newVNode);

  //   // Assert
  //   expect(oldVNode.el.nodeValue).toBe('old text'); // Should remain unchanged
  // });

  it('should handle special characters and emojis', () => {
    // Arrange
    oldVNode.value = 'regular text';
    newVNode = {
      value: 'Special chars: !@#$%^&*() and emojis: 🎉🚀🌟'
    };
    oldVNode.el.nodeValue = 'regular text';

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('Special chars: !@#$%^&*() and emojis: 🎉🚀🌟');
  });

  it('should handle very long text values', () => {
    // Arrange
    const longText = 'a'.repeat(10000);
    oldVNode.value = 'short';
    newVNode = {
      value: longText
    };
    oldVNode.el.nodeValue = 'short';

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe(longText);
    expect(oldVNode.el.nodeValue.length).toBe(10000);
  });

  it('should preserve the reference to the same text node', () => {
    // Arrange
    oldVNode.value = 'before';
    newVNode = {
      value: 'after'
    };
    const originalTextNode = oldVNode.el;

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el).toBe(originalTextNode); // Same node reference
    expect(oldVNode.el.nodeValue).toBe('after');
  });

  it('should handle value change from null to string', () => {
    // Arrange
    oldVNode.value = null;
    newVNode = {
      value: 'string value'
    };
    oldVNode.el.nodeValue = null;

    // Act
    patchText(oldVNode, newVNode);

    // Assert
    expect(oldVNode.el.nodeValue).toBe('string value');
  });

  // it('should handle value change from string to null', () => {
  //   // Arrange
  //   oldVNode.value = 'string value';
  //   newVNode = {
  //     value: null
  //   };
  //   oldVNode.el.nodeValue = 'string value';

  //   // Act
  //   patchText(oldVNode, newVNode);

  //   // Assert
  //   expect(oldVNode.el.nodeValue).toBe(null);
  // });
});