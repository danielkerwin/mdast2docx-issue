import { useEffect, useState } from 'react';
import './App.css';
import { toDocx } from 'mdast2docx';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import React from 'react';
import { marked } from "marked";


function App() {
  const [count, setCount] = useState(0);

  const markdown = `
    # Sample Document  
    This is a **bold** text and _italic_ text.  

    > A blockquote example  

    - List Item 1[^1]  
    - List Item 2[^2]  

    [Click Here](https://example.com)  

    This is a footnote reference.  

    [^1]: This is the first footnote content.
    [^2]: This is the second footnote content.
  `;
  const [parsed, setParsed] = useState('')

  const parse = async () => {
    const md = await marked(markdown)
    setParsed(md);
  }

  const mdast = unified().use(remarkParse).parse(markdown);

  const downloadDocX = async () => {
    const docxBlob = await toDocx(mdast, { title: "My Document" }, {});
    const url = URL.createObjectURL(docxBlob as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    parse();
  })

  return (
    <>
      <h1>mdast2docx footnote issue</h1>
      <div className="card" dangerouslySetInnerHTML={{ __html: parsed }}>
      </div>
      <div className="card">
        <button onClick={downloadDocX}>
          Convert MD to Docx
        </button>
      </div>
    </>
  );
}

export default App;
