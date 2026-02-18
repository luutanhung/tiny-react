export const ArrayDiffOp = Object.freeze({
  ADD: "add",
  REMOVE: "remove",
  MOVE: "move",
  NOOP: "noop",
});

class ArrayWrapper {
  array = [];
  originalIndices = [];
  equalFn;

  constructor(array, equalFn = (a, b) => a === b) {
    this.array = [...array];
    this.originalIndices = array.map((_, idx) => idx);
    this.equalFn = equalFn;
  }

  get length() {
    return this.array.length;
  }

  findOriginalIndexAt(idx) {
    return this.originalIndices[idx];
  }

  findIndexStartingFrom(item, idx) {
    for (let i = idx; i < this.length; i += 1) {
      if (this.equalFn(item, this.array[i])) {
        return i;
      }
    }
    return -1;
  }

  isRemoved(idx, newArr = []) {
    if (idx >= this.length) {
      return false;
    }
    
    const item = this.array[idx];
    const foundIdxInNewArr = newArr.findIndex((newItem) => this.equalFn(newItem, item));

    // Returns true if item does not exist in the new array.
    return foundIdxInNewArr === -1;
  }

  isNoop(idx, newArr = []) {
    if (idx >= this.length) {
      return false;
    }

    const contempItem = this.array[idx];
    const newItem = newArr[idx];
    return this.equalFn(contempItem, newItem); 
  }

  removeItem(idx) {
    const operation = {
      op: ArrayDiffOp.REMOVE,
      index: idx,
      item: this.array[idx],
    };

    this.array.splice(idx, 1);
    this.originalIndices.splice(idx, 1);
    return operation;
  }

  noopItem(idx) {
    const operation = {
      op: ArrayDiffOp.NOOP,
      originalIndex: this.findOriginalIndexAt(idx),
      index: idx,
      item: this.array[idx],
    };
    return operation;
  }

  isAddition(item, fromIdx) {
    return this.findIndexStartingFrom(item, fromIdx) === -1;
  }

  addItem(item, idx) {
    const operation = {
      op: ArrayDiffOp.ADD,
      index: idx,
      item,
    };

    this.array.splice(idx, 0, item);
    this.originalIndices.splice(idx, 0, -1);
    return operation;
  }

  moveItem(item, toIdx) {
    const fromIdx = this.findIndexStartingFrom(item, toIdx);

    const operation = {
      op: ArrayDiffOp.MOVE,
      originalIndex: this.findOriginalIndexAt(fromIdx),
      from: fromIdx,
      to: toIdx,
      item: this.array[fromIdx],
    };

    const [_item] = this.array.splice(fromIdx, 1);
    this.array.splice(toIdx, 0, _item);

    const [originalIdx] = this.originalIndices.splice(fromIdx, 1);
    this.originalIndices.splice(toIdx, 0, originalIdx);
    return operation;
  }

  removeItemsAfterIndex(idx) {
    const operations = [];
    while (this.length > idx) {
      operations.push(this.removeItem(idx));
    }
    return operations;
  }
}

export function diffArrays(oldArr, newArr, equalFn = (a, b) => a === b) {
  const opSeq = [];
  
  const arrWrapper = new ArrayWrapper(oldArr, equalFn);

  for (let idx = 0; idx < newArr.length; idx += 1) {
    // Case: Removal.
    if (arrWrapper.isRemoved(idx)) {
      opSeq.push(arrWrapper.removeItem(idx, newArr));
      idx -= 1;
      continue;
    }

    // Case: No operation.
    if (arrWrapper.isNoop(idx, newArr)) {
      opSeq.push(arrWrapper.noopItem(idx));
      continue;
    }

    const item = newArr[idx];

    // Case: Addition.
    if (arrWrapper.isAddition(item, idx)) {
      opSeq.push(arrWrapper.addItem(item, idx));
      continue;
    }

    // Case: Movement.
    opSeq.push(arrWrapper.moveItem(item, idx));

  }
  // Case: Remove extra items.
  opSeq.push(...arrWrapper.removeItemsAfterIndex(newArr.length));

  return opSeq;
}

export function diffObjects(oldObj, newObj) {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  const removed = oldKeys.filter((k) => !(k in newObj));
  const added = [], updated = [];
  newKeys.forEach((k) => {
    if (k in oldObj) {
      if (newObj[k] !== oldObj[k]) {
        updated.push(k);
      }
    } else {
      added.push(k);
    }
  });

  return {
    added,
    removed,
    updated,
  };
}