export function getPrefixedAttributes<T extends {}, P extends string>(
  object: T,
  prefix: P,
) {
  return Object.fromEntries(
    Object.entries(object).filter(([k]) => k.startsWith(prefix)),
  ) as PrefixedAttributes<T, P>;
}

type PrefixedAttributes<T, P extends string> = {
  [K in keyof T as K extends `${P}${string}` ? K : never]: T[K];
};

export function prefixAttributes<T extends {}, P extends string>(
  object: T,
  prefix: P,
) {
  return Object.fromEntries(
    Object.entries(object).map(([k, v]) => [prefix + capitalize(k), v]),
  ) as PrefixAttributes<T, P>;
}

type PrefixAttributes<T, P extends string> = {
  [K in keyof T as K extends string ? Prefix<K, P> : K]: T[K];
};

type Prefix<S extends string, P extends string> = `${P}${Capitalize<S>}`;

export function unprefixAttributes<T extends {}, P extends string>(
  object: T,
  prefix: P,
) {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([k]) => k.startsWith(prefix))
      .map(([k, v]) => [uncapitalize(k.slice(prefix.length)), v]),
  ) as UnprefixAttributes<T, P>;
}

type UnprefixAttributes<T, P extends string> = {
  [K in keyof T as K extends string ? Unprefix<K, P> : K]: T[K];
};

type Unprefix<S extends string, P extends string> = S extends `${P}${infer T}`
  ? Uncapitalize<T>
  : never;

export function uncapitalize<S extends string>(string: S) {
  return (string[0].toLowerCase() + string.slice(1)) as Uncapitalize<S>;
}

export function capitalize<S extends string>(string: S) {
  return (string[0].toUpperCase() + string.slice(1)) as Capitalize<S>;
}
