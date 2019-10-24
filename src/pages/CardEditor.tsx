import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import localForage from 'localforage';
import 'codemirror/lib/codemirror.css';
import 'styles/pages/Editor.css';
import 'highlight.js/styles/atelier-lakeside-dark.css';
// import Api from 'api';
import { CardForm, SaveButton } from 'components';
// import { async } from 'q';
import { CardData } from 'types';
import categoryManage from 'utils/categoryManage';
import generateUlid from 'utils/generateUlid';

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
  saveCardForCategory = async (card: CardData) => {
    await categoryManage.addCardByUlid(this.category, card);
    toast.success('saved success!');
  };
  saveCard = async () => {
    const { title, desc, category } = this;
    const { history } = this.props;
    const content: string = this.editor.getMarkdown();
    console.log(title, desc);
    if (!title && !desc && !content) {
      toast.error('请输入完整信息');
      return;
    }
    const _ulid = generateUlid();
    const card: CardData = {
      authName: 'hugh',
      title,
      desc,
      type: 'client',
      ulid: _ulid,
      date: +new Date(),
      content,
    };
    await this.saveCardForCategory(card);
    await localForage.setItem('prevCategory', category);
    history.goBack();
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
