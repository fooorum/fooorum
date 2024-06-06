export default abstract class Cache<K, V> extends Map<K, V> {
  protected abstract obtain(key: K): Promise<V | undefined>;

  protected async update(key: K): Promise<V | undefined> {
    const value = await this.obtain(key);
    if (value !== undefined) this.set(key, value);
    return value;
  }

  async fetch(key: K, update = false): Promise<V | undefined> {
    if (update || !this.has(key)) {
      return await this.update(key);
    } else {
      return this.get(key)!;
    }
  }
}
