import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

interface Props {
  offset: number;
  limit: number;
  setOffset: (newOffset: number) => void;
}

const TOTAL_POKEMON = 1300;

const Pagination: React.FC<Props> = ({ offset, limit, setOffset }) => {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(TOTAL_POKEMON / limit);
  const hasNextPage = offset + limit < TOTAL_POKEMON;
  const hasPrevPage = offset > 0;

  const handleFirstPage = () => setOffset(0);
  const handlePrevPage = () => setOffset(Math.max(offset - limit, 0));
  const handleNextPage = () => setOffset(offset + limit);
  const handleLastPage = () => setOffset((totalPages - 1) * limit);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // Pages to show around current page

    if (totalPages <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= delta + 3) {
        for (let i = 1; i <= delta + 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - delta - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - delta - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    setOffset((page - 1) * limit);
  };

  return (
    <div className="flex flex-col items-center gap-6 my-8">
      <div className="flex items-center gap-2 mt-12">
        {/* First Page Button */}
        <button
          onClick={handleFirstPage}
          disabled={!hasPrevPage}
          className={`
            group relative flex items-center justify-center w-10 h-10 
            rounded-lg border transition-all duration-300 font-mono text-sm
            ${
              !hasPrevPage
                ? "border-gray-700/50 text-gray-600 cursor-not-allowed"
                : "border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/25 active:scale-95"
            }
          `}
          aria-label="First page"
        >
          <FaAngleDoubleLeft size={16} />
          {hasPrevPage && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>

        {/* Previous Page Button */}
        <button
          onClick={handlePrevPage}
          disabled={!hasPrevPage}
          className={`
            group relative flex items-center justify-center w-10 h-10 
            rounded-lg border transition-all duration-300 font-mono text-sm
            ${
              !hasPrevPage
                ? "border-gray-700/50 text-gray-600 cursor-not-allowed"
                : "border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/25 active:scale-95"
            }
          `}
          aria-label="Previous page"
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="flex items-center justify-center w-10 h-10 text-gray-500 font-mono text-sm">
                  •••
                </span>
              ) : (
                <button
                  onClick={() => handlePageClick(page as number)}
                  className={`
                    group relative flex items-center justify-center w-10 h-10 
                    rounded-lg border transition-all duration-300 font-mono text-sm font-bold
                    ${
                      page === currentPage
                        ? "border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-pink-500/20 to-green-500/20 text-white shadow-lg shadow-cyan-400/30"
                        : "border-gray-700/50 text-gray-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 active:scale-95"
                    }
                  `}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                  {page === currentPage && (
                    <>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/10 via-pink-400/10 to-green-400/10 blur-sm" />
                    </>
                  )}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className={`
            group relative flex items-center justify-center w-10 h-10 
            rounded-lg border transition-all duration-300 font-mono text-sm
            ${
              !hasNextPage
                ? "border-gray-700/50 text-gray-600 cursor-not-allowed"
                : "border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/25 active:scale-95"
            }
          `}
          aria-label="Next page"
        >
          <FaChevronRight size={16} />
        </button>

        {/* Last Page Button */}
        <button
          onClick={handleLastPage}
          disabled={!hasNextPage}
          className={`
            group relative flex items-center justify-center w-10 h-10 
            rounded-lg border transition-all duration-300 font-mono text-sm
            ${
              !hasNextPage
                ? "border-gray-700/50 text-gray-600 cursor-not-allowed"
                : "border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-400/25 active:scale-95"
            }
          `}
          aria-label="Last page"
        >
          <FaAngleDoubleRight size={16} />
          {hasNextPage && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-pink-400/50 to-green-400/50 blur-sm animate-pulse" />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
          <span>Start</span>
          <span className="text-cyan-400">
            {Math.round((currentPage / totalPages) * 100)}%
          </span>
          <span>End</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="text-center text-xs font-mono text-gray-500">
        <div className="flex items-center gap-4">
          <span>
            Showing <span className="text-cyan-300">{offset + 1}</span>-
            <span className="text-pink-300">
              {Math.min(offset + limit, TOTAL_POKEMON)}
            </span>
          </span>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <span>
            Total{" "}
            <span className="text-yellow-300">
              {TOTAL_POKEMON.toLocaleString()}
            </span>{" "}
            Pokemon
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
