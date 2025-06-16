import React, { useState } from 'react';
import { useGlobalContext } from './NewsContext';
import Search from './Search';

const NewsApi = () => {
  const { hits, removePost } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination Logic
  const totalPages = Math.ceil(hits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedHits = hits.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <section className="min-h-screen w-full bg-white px-4 sm:px-8 md:px-16 py-12">
      {/* Header */}
     <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-14 border-b border-gray-200 pb-6">
  <h1 className="text-4xl sm:text-6xl tracking-tight text-blue-600 font-light">
    Newsly
  </h1>
  <div className="w-full sm:w-[500px]">
    <Search />
  </div>
</div>

      {/* <marquee scrollamount="10" loop="infinite" className="text-red-600 m-5 border-2 ml-95 text-2xl max-w-2xl leading-relaxed">
          Fresh tech stories from around the world. Curated. Clean. Current.
        </marquee> */}
      {/* News List */}
      <div className="max-w-5xl mx-auto border-t border-gray-200 divide-y divide-gray-200">
        {selectedHits.map(({ title, author, objectID, url, num_comments }) => (
          <div key={objectID} className="py-6 flex flex-col sm:flex-row sm:justify-between gap-4 group">
            <div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200"
              >
                {title || 'Untitled'}
              </a>
              <p className="text-sm text-gray-500 mt-1">
                By <span className="font-medium text-gray-700">{author || 'Unknown'}</span> •{' '}
                {num_comments ?? 0} comments
              </p>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Read More →
              </a>
              <button
                onClick={() => removePost(objectID)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-6 mt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ← Prev
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default NewsApi;
