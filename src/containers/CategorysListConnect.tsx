import React, { useEffect } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CategoryList } from 'components';
import { CategorysData } from 'types';
import { getLocalCategorys, activeCategory } from 'store/actions';
import { RootState, Action } from 'store/types';

interface CategorysProps {
  activeIndex: number;
  categorys: CategorysData;
  getLocalCategorys: Function;
  activeCategory: Function;
}
const CategoryListContainer: React.SFC<CategorysProps> = ({
  activeIndex,
  categorys,
  getLocalCategorys,
  activeCategory,
}: CategorysProps) => {
  const categorySelect = (index: number) => {
    activeCategory(index);
  };
  const categoryDel = async (index: number) => {
    // const currCategory = categorys[index];
    // if (currCategory) {
    //   const _categorys = await categoryManage.removeLocalByUlid(
    //     currCategory.ulid
    //   );
    //   if (_categorys) {
    //     setCategorys(_categorys);
    //     setSelectIndex(index - 1);
    //   }
    // }
  };
  const categorySync = async (index: number) => {
    // const currCategory = categorys[index];
    // categoryManage.syncCardsByUlid(currCategory.ulid);
  };
  useEffect(() => {
    getLocalCategorys();
    console.log(categorys);
  }, []);
  return (
    <CategoryList
      onSelect={categorySelect}
      onDel={categoryDel}
      onSync={categorySync}
      selectIndex={activeIndex}
      categorys={categorys}
    />
  );
};
const mapStateToProps = (state: RootState) => ({
  categorys: state.category.categorys,
  activeIndex: state.category.index,
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      getLocalCategorys: () => getLocalCategorys(),
      activeCategory: (i: number) => activeCategory(i),
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListContainer);
