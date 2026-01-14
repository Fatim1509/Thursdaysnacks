import ContentCard from './ContentCard';
import { useState, useRef } from 'react';

/**
 * ContentRow Component
 * Displays a horizontal scrollable row of content cards (Netflix-style)
 */
export default function ContentRow({ title, items, type = 'movie' }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Scroll left
  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -800, behavior: 'smooth' });
      checkArrows();
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 800, behavior: 'smooth' });
      checkArrows();
    }
  };

  // Check if arrows should be shown
  const checkArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    checkArrows();
  };

  return (
    <div className="mb-8">
      {/* Row Title */}
      <h2 className="text-white text-2xl font-bold mb-4 px-4 md:px-8">{title}</h2>

      {/* Scrollable Row Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 z-40 bg-black bg-opacity-50 hover:bg-opacity-80 text-white px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            ◀
          </button>
        )}

        {/* Content Cards */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="content-row flex overflow-x-scroll space-x-4 px-4 md:px-8 py-2"
        >
          {items && items.length > 0 ? (
            items.map((item) => (
              <ContentCard key={item.id} item={item} type={type} />
            ))
          ) : (
            <div className="text-light-gray">No content available</div>
          )}
        </div>

        {/* Right Arrow */}
        {showRightArrow && items && items.length > 5 && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-40 bg-black bg-opacity-50 hover:bg-opacity-80 text-white px-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
}
