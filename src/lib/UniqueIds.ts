const Id = Symbol("Id");

export default function UniqueIds(): Record<string, number> {
  return new Proxy(
    {
      [Id]: 0,
    },
    {
      get(target, prop, receiver) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver);
        } else {
          const currentId = Reflect.get(target, Id);
          Reflect.set(target, prop, currentId);
          Reflect.set(target, Id, currentId + 1);
          return currentId;
        }
      },
    }
  );
}
