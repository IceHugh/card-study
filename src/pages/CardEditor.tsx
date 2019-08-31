import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ulid } from 'ulid';
import styled from 'styled-components';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import localForage from 'localforage';
import 'codemirror/lib/codemirror.css';
import 'styles/pages/Editor.css';
import 'highlight.js/styles/atelier-lakeside-dark.css';
import Api from 'api';
import { CardForm, SaveButton } from 'components';
// import { async } from 'q';
import { CardData, CategoryData } from 'types';

const PageContainer = styled.main`
  width: 100%;
  height: 100%;
  background: var(--color-1);
`;
const MainContainer = styled.div`
  position: relative;
  min-width: 800px;
  max-width: 1080px;
  margin: 0 auto;
`;
const CardFormContainer = styled.header`
  width: 100%;
  padding-top: 10px;
`;
const EditorContainer = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
`;
const FooterContainer = styled.footer`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface State {
  loadStatus?: boolean;
}

export default class CardEditor extends Component<RouteComponentProps, State> {
  private container: any;
  private editor: any;
  private title: string = '';
  private desc: string = '';
  private category: string = '';
  private cardType: string = 'custom';
  private prevCategory: string = '';
  private timer: NodeJS.Timeout | null = null;
  constructor(props: RouteComponentProps) {
    super(props);
    console.log(props);
    const { state } = props.location;
    const { category, type } = state;
    this.category = category;
    this.cardType = type;
    this.container = React.createRef();
    this.state = {
      loadStatus: false,
    };
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  componentDidMount() {
    this.editor = new Editor({
      el: this.container.current,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: `${600}px`,
      hideModeSwitch: true,
      initialValue: '',
      codeBlockLanguages: [
        'javascript',
        'bash',
        'nginx',
        'docker',
        'typescript',
        'html',
        'css',
      ],
    });
    // const timer = setInterval(this.saveArticleLocal, 1000 * 60);
    // this.timer = timer;
    console.log(this.editor);

    // this.editor.on('load', (e: any) => {
    //   // console.log(e)
    // });
    // this.editor.on('focus', (e: any) => {
    //   // console.log(e);
    // });
    // this.editor.on('change', (e: any) => {
    //   // console.log(e);
    //   // console.log(this.editor.getMarkdown());
    // });
  }
  saveCardForCategory = async (cardId: string) => {
    const categorys: CategoryData[] = await localForage.getItem('categorys');
    if (!categorys) return;
    const currCategory: CategoryData = categorys.filter(
      (val: CategoryData) => val.ulid === this.category
    )[0];
    if (currCategory) {
      currCategory.cards.push(cardId);
      console.log(categorys);
      await localForage.setItem('categorys', categorys);
    } else {
      toast.error('不存在该分类，请先创建分类');
      throw Error('不存在该分类，请先创建分类');
    }
  };
  saveCard = async () => {
    const { title, desc, category } = this;
    const content: string = this.editor.getMarkdown();
    console.log(title, desc);
    if (!title && !desc && !content) {
      toast.error('请输入完整信息');
      return;
    }
    const _ulid = ulid();
    const card: CardData = {
      auth: 'hugh',
      title,
      desc,
      type: 'custom',
      ulid: _ulid,
      date: +new Date(),
      content,
    };
    await this.saveCardForCategory(_ulid);
    await localForage.setItem('prevCategory', category);
    this.saveCardByStorage(card);
    // Api.createCard(card);
  };
  saveCardByStorage = async (card: CardData) => {
    const { history } = this.props;
    console.log(history);
    try {
      let cards = await localForage.getItem('cards');
      if (cards && Array.isArray(cards)) {
        cards.push(card);
      } else {
        cards = [card];
      }
      await localForage.setItem('cards', cards);
      toast.success('saved success!');
      history.push('/');
      console.log('本地保存成功');
    } catch (error) {
      toast.error('saved error!');
      console.log('本地保存失败');
    }
  };
  titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.title = e.target.value;
  };
  descHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.desc = e.target.value;
  };
  categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.category = e.target.value;
  };
  render() {
    return (
      <PageContainer>
        <MainContainer>
          <CardFormContainer>
            <CardForm
              titleHandler={this.titleHandler}
              descHandler={this.descHandler}
              categoryHandler={this.categoryHandler}
              defaultCategory={this.prevCategory}
            />
          </CardFormContainer>
          <EditorContainer ref={this.container} />
          <FooterContainer>
            <SaveButton text='保存' onClick={this.saveCard} />
          </FooterContainer>
        </MainContainer>
      </PageContainer>
    );
  }
}
