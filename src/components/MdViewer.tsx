import React, { Component } from 'react';
import styled from 'styled-components';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import 'highlight.js/styles/atelier-lakeside-dark.css';
import 'styles/tui-theme.css';

const ViewerContainer = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 10px;
  overflow-y: auto;
  background: var(--tui-bg-main);
`;
interface ViewerProps {
  viewHeight: number;
  viewContent?: string;
}
class MdViewer extends Component<ViewerProps> {
  // private canvas_box: React.RefObject<HTMLDivElement>;
  private viewer: React.RefObject<HTMLDivElement>;
  private mdViewer: any;
  constructor(props: ViewerProps) {
    super(props);
    this.viewer = React.createRef();
  }
  componentDidMount() {
    const dom = this.viewer.current;
    const { viewContent } = this.props;
    if (dom) {
      this.mdViewer = new Viewer({
        el: dom,
        // height: '500px',
        initialValue: viewContent,
        // codeBlockLanguages: [
        //   'javascript',
        //   'bash',
        //   'nginx',
        //   'docker',
        //   'typescript',
        //   'html',
        //   'css',
        // ],
      });
    }
  }
  render() {
    return <ViewerContainer ref={this.viewer}></ViewerContainer>;
  }
}

export default MdViewer;
