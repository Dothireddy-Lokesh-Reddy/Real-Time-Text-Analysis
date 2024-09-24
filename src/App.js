import { useState, useEffect, useRef } from "react";
import "./App.css";
const App = () => {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textArea = useRef()
  useEffect(() => {
    textArea.current.focus();
  }, [])
  useEffect(() => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const uniqueWords = new Set(words);
    setUniqueWordCount(uniqueWords.size);
    const characters = text.replace(/[\s\W]/g, '').length;
    setCharCount(characters);
  }, [text]);
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleReplaceChange = (e) => {
    setReplace(e.target.value);
  };
  const replaceText = () => {
    if (search) {
      setText(text.replaceAll(search, replace));
      setSearch('');
      setReplace('');
    }
  };
  return (
    <div className="container">
      <h1 className="hero-heading">Real-Time Text Analysis</h1>
      <textarea
        className="text-container"
        placeholder="Type your text here..."
        onChange={handleTextChange}
        value={text}
        ref={textArea}
      ></textarea>
      <section className="bottom-section">
        <div className="stats">
          <p className="text-para">Unique Words: <span className="count">{uniqueWordCount}</span></p>
          <p className="text-para">Character Count (Excluding. Spaces/ Punctuation): <span className="count">{charCount}</span></p>
        </div>
        <div className="replacement-container">
          <div className="input-section">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search for..."
              id="search"
            />
          </div>
          <div className="input-section">
            <label htmlFor="Replace With">Replace With</label>
            <input
              type="text"
              value={replace}
              onChange={handleReplaceChange}
              placeholder="Replace with..."
              id="Replace With"
            />
          </div>
          <button onClick={replaceText} className="replace-btn">Replace All</button>
        </div>
      </section>
    </div>
  );
};
export default App;
