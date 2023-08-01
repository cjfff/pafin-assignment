// simulate the function of redis

class Redis {
  data: Record<
    string,
    {
      value: any;
      /** second */
      expire: number;
    }
  >;
  constructor() {
    this.data = {};
  }

  set(key: string, value: any, expire: number) {
    this.data[key] = {
      value,
      expire: Date.now() + expire * 1000,
    };
    return key;
  }

  get(key: string) {
    const data = this.data[key];
    if (data && data.expire > Date.now()) {
      return data.value;
    }
    return null;
  }
}

export default new Redis();
