interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
}

export type { HTMLEvent }