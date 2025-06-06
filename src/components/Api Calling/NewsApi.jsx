import React from 'react';
import { useGlobalContext } from './NewsContext';
import Search from './Search';

const NewsApi = () => {
  const { hits, removePost } = useGlobalContext();


  return (
    <section className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 md:px-10 py-10">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-6 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl text-gray-800 tracking-tight font-mono font-bold">
          Newsly
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl">
          Stay updated with the freshest tech news around the globe 🌍
        </p>
        <Search />
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {hits.map(({ title, author, objectID, url, num_comments }) => (
          <div
            key={objectID}
            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col gap-4"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500">
              By <span className="font-semibold text-gray-700">{author}</span> |{' '}
              <span className="font-semibold text-gray-700">{num_comments}</span> comments
            </p>

            <div className="flex justify-between items-center mt-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Read More
              </a>
              <button
                onClick={() => removePost(objectID)}
                className="bg-red-400 text-white text-sm px-4 py-2 rounded-full hover:bg-red-500 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsApi;
