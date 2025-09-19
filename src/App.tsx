import { useState } from 'react';
import './App.css';
import { toDocx } from 'mdast2docx';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'
// import { toDocx } from '@m2d/core';
// import { htmlPlugin } from '@m2d/html';
// import { imagePlugin } from '@m2d/image';
// import { listPlugin } from '@m2d/list';
// import { mathPlugin } from '@m2d/math';
// import { tablePlugin } from '@m2d/table';

const SAMPLE = `
# Sample Document
This is a **bold** text and _italic_ text.  

> A blockquote example  

- Reference 1[^1]
- Reference 2[^2]

[^1]: This is the first footnote content.\n
[^2]: This is the second footnote content.
`;

function App() {

  const [markdown, setMarkdown] = useState(SAMPLE)

  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  const convertMdToDocx = async () => {
    const docxBlob = await toDocx(mdast, { title: "My Document" }, {});
    const url = URL.createObjectURL(docxBlob as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <h4>mdast2docx footnote issue</h4>
      <textarea value={markdown} style={{
        width: '300px',
        height: '300px'
      }} onChange={(e) => setMarkdown(e.target.value)}></textarea>
      <div className="card">
        <button onClick={convertMdToDocx}>
          Convert MD to Docx
        </button>
      </div>
    </>
  );
}

export default App;
