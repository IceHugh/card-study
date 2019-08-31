import localForage from 'localforage';
import { CardData, CategoryData } from '../types';
async function getListFromLocal() {
  const categorysLocal: CategoryData[] = await localForage.getItem('categorys');
  return categorysLocal || [];
}
async function getLocaByUuid(uuid: string) {
  const categoryLocal: CategoryData = await localForage.getItem(uuid);
  return categoryLocal;
}
async function getLocaCardsByUlid(uuid: string) {
  const categoryLocal: CategoryData = await getLocaByUuid(uuid);
  return categoryLocal.cards || [];
}
async function removeLocalByUlid(ulid: string) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const _index = categorysLocal.findIndex(val => val.ulid === ulid);
  if (_index > -1) {
    categorysLocal.splice(_index, 1);
    await localForage.setItem('categorys', categorysLocal);
    return categorysLocal;
  }
  return null;
}
async function removeCardsByUlid(ulid: string) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    currCategory.cards = [];
    await localForage.setItem('categorys', currCategory);
  }
}
/**
 * 同步卡片
 *
 * @param {string} ulid 分类uLid
 * @param {CardData[]} cards
 */
async function syncCardsByUlid(ulid: string, cards: CardData[]) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    currCategory.cards = cards;
    await localForage.setItem('categorys', currCategory);
  }
}
async function addCardByUuid(ulid: string, card: CardData) {
  const categorysLocal: CategoryData[] = await getListFromLocal();
  const currCategory = categorysLocal.find(val => val.ulid === ulid);
  if (currCategory) {
    currCategory.cards.push(card);
    await localForage.setItem('categorys', currCategory);
  }
}
export default {
  getListFromLocal,
  getLocaByUuid,
  getLocaCardsByUlid,
  removeLocalByUlid,
  removeCardsByUlid,
  syncCardsByUlid,
};
