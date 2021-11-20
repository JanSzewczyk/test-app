interface StackReturnType<T> {
  dataStore: T[];
  top: number;
  push: (element: T) => void;
  pop: () => T;
  peek: () => T;
  length: () => number;
}

export const stack = <T = string>(): StackReturnType<T> => ({
  dataStore: [],
  top: 0,
  push(element: T) {
    this.dataStore[this.top++] = element;
  },
  pop() {
    --this.top;
    return this.dataStore.pop() as T;
  },
  peek() {
    return this.dataStore[this.top - 1];
  },
  length() {
    return this.top;
  }
});
