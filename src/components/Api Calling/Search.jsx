import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from './NewsContext';

const Search = () => {
  const { query, searchPost } = useGlobalContext();
  const [input, setInput] = useState(query);
  const inputRef = useRef(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (input !== query) {
        searchPost(input);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [input, query, searchPost]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xl">
      <input
        ref={inputRef}
        type="text"
        className="w-full py-3 px-5 rounded-xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-gray-400 text-gray-800 text-base"
        placeholder="Search latest tech news..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default Search;
