import { useState } from 'react';
import './App.css';
import { toDocx as toDocx2 } from 'mdast2docx';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm'
import { toDocx } from '@m2d/core';
// import { htmlPlugin } from '@m2d/html';
// import { imagePlugin } from '@m2d/image';
// import { listPlugin } from '@m2d/list';
// import { mathPlugin } from '@m2d/math';
import { tablePlugin } from '@m2d/table';
import React from 'react';

const SAMPLE = `
# Duplicate table issue

This example demonstrates how m2d/core is duplicating table data

Click 'Convert MD to Docx' and m2d/core will output a docx with two of the same table

| A | B | C |
|---|---|---|
| 1 | 2 | 3 |
| 4 | 5 | 6 |

`;

function App() {

  const [markdown, setMarkdown] = useState(SAMPLE)

  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  console.log({ mdast });

  const convertMdToDocx1 = async () => {
    const docxBlob = await toDocx(mdast, { title: "My Document" }, { plugins: [tablePlugin()]});
    const url = URL.createObjectURL(docxBlob as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "docWithIssues.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  const convertMdToDocx2 = async () => {
    const docxBlob = await toDocx2(mdast, { title: "My Document" }, { plugins: [tablePlugin()]});
    const url = URL.createObjectURL(docxBlob as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "docWithNoIssue.docx";
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
        <button onClick={convertMdToDocx1}>
          Convert MD to Docx with m2d/core [ISSUE]
        </button>
        <br /><br />
        <button onClick={convertMdToDocx2}>
          Convert MD to Docx with mdast2docx [NO ISSUE]
        </button>        
      </div>
    </>
  );
}

export default App;
