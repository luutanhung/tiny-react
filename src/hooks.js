let currComp = null;
let hookIdx = 0;

export const componentHooks = new WeakMap();

export function useState(initialValue) {
  const hooks = componentHooks.get(currComp) || [];
  if (hooks[hookIdx] === undefined) {
    hooks[hookIdx] = initialValue;
    if (currComp) {
       componentHooks.set(currComp, hooks);
    }
  }

  const stateIdx = hookIdx;
  const instance = currComp;

  const setState = (newVal) => {
    hooks[stateIdx] = newVal;
    if (instance && instance.__rerender) {
      instance.__rerender();
    }
  }

  const val = hooks[stateIdx];
  hookIdx += 1;

  return [val, setState]
}

export function setCurrentCommponent(component) {
  currComp = component;
}

export function getCurrentComponent() {
  return currComp;
}

export function setHookIdx(val) {
  hookIdx = val;
}