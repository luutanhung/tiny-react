let currComp = null;
let hookIdx = 0;

export const componentHooks = new WeakMap();

export function useState(initialValue) {
  const hooks = componentHooks.get(currComp) || [];
  if (hooks[hookIdx] === undefined) {
    hooks[hookIdx] = initialValue;
  }

  const stateIdx = hookIdx;
  const instance = currComp;

  const setState = (newVal) => {
    hooks[stateIdx] = newVal;
    instance?.__rerender();
  }

  const val = hooks[stateIdx];
  hookIdx += 1;
  if (currComp) {
    componentHooks.set(currComp, hooks);
  }

  return [val, setState]
}

export function setCurrentCommponent(component) {
  currComp = component;
}

export function getCurrentComponent() {
  return currComp;
}

export function setHookIdx(hookIdx) {
  hookIdx = hookIdx;
}