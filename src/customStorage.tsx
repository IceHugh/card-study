import localForage from 'localforage';
class CustomStorage {
  name: string;
  defaultValue: any;
  constructor(name: string, defaultValue: any) {
    this.name = name;
    this.defaultValue = defaultValue;
  }
  async get() {
    let result: any;
    try {
      result = await localForage.getItem(this.name);
      if (result === null || result === undefined) {
        result = this.defaultValue;
      }
    } catch (error) {
      result = this.defaultValue;
    }
    return result;
  }
  async set(data: any) {
    try {
      if (data === undefined) return;
      await localForage.setItem(this.name, data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default {
  categorys: new CustomStorage('categorys', []),
};
