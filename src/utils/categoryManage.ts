import customStorage from 'customStorage';
import { CardData, CategoryData } from '../types';
import Api from 'api';

async function getListFromLocal() {
  const categorysLocal: CategoryData[] = await customStorage.categorys.get();
  return categorysLocal || [];
}

async function removeLocalByUlid(ulid: string) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const _index = categorysLocal.findIndex(val => val.ulid === ulid);
  if (_index > -1) {
    categorysLocal.splice(_index, 1);
    await customStorage.categorys.set(categorysLocal);
    return categorysLocal;
  }
  return null;
}
async function removeCardsByUlid(ulid: string) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    currCategory.cards = [];
    await customStorage.categorys.set(categorysLocal);
  }
}
async function replaceCategoryByUlid(
  ulid: string,
  newCategory: CategoryData,
  categorys?: CategoryData[]
) {
  let _categorys = categorys;
  if (!categorys) {
    _categorys = await getListFromLocal();
  }
  if (_categorys) {
    const _categoryIndex = _categorys.findIndex(val => val.ulid === ulid);
    if (_categoryIndex > -1) {
      _categorys[_categoryIndex] = newCategory;
      await customStorage.categorys.set(_categorys);
    }
  }
}
/**
 * 和服务器同步卡片，只同步本人创建的分类
 *
 * @param {string} ulid 分类uLid
 */
async function syncCardsByUlid(ulid: string) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    const serverPromise = await Api.syncCategory(currCategory);
    const serverData = await serverPromise.json();
    const serverCategory = serverData.data;
    if (serverCategory) {
      await replaceCategoryByUlid(ulid, serverCategory, categorysLocal);
    }
  }
}
/**
 * 通过ulid添加卡片到本地
 *
 * @param {string} ulid
 * @param {CardData} card
 * @returns
 */
async function addCardByUlid(ulid: string, card: CardData) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    currCategory.cards.push(card);
    await customStorage.categorys.set(categorysLocal);
  } else {
    return null;
  }
}
export default {
  getListFromLocal,
  removeLocalByUlid,
  removeCardsByUlid,
  syncCardsByUlid,
  addCardByUlid,
};
