import { isEmpty } from '../helpers';

export function setEventListeners(el, events = {}) {
  if (isEmpty(events)) return;
  if (!el.listeners) {
    el.listeners = {};
  }
  for (const [eventName, handler] of Object.entries(events)) {
    el.addEventListener(eventName, handler);
    el.listeners[eventName] = handler;
  }
}

export function removeEventListeners(el) {
  if (!el.listeners) return;
  for (const [eventName, handler] of Object.entries(el.listeners)) {
    el.removeEventListener(eventName, handler);
  }
  el.listeners = {};
}

export function addEventListener(el, eventName, handler) {
  if (!el.listeners) {
    el.listeners = {};
  }
  el.addEventListener(eventName, handler);
  el.listeners[eventName] = handler;
  return handler;
}

export function removeEventListener(el, eventName) {
  if (!el.listeners || !(eventName in el.listeners)) return;
  const handler = el.listeners[eventName];
  el.removeEventListener(eventName, handler);
}