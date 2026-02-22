import markdownItContainer from 'markdown-it-container'

export default ({ marp }) => marp
    .use(markdownItContainer, 'matrix')
    .use(markdownItContainer, 'row')
    .use(markdownItContainer, 'column')
