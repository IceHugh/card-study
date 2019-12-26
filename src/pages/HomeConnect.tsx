import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CategoryData } from 'types';
import { addCategory } from 'store/actions';
import { RootState, Action } from 'store/types';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  activeIndex: state.category.index,
  categorys: state.category.categorys,
});
const mapActionsToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      addCategory: (category: CategoryData) => addCategory(category),
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
