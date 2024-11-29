import { Blueprint } from '@/app/models/blueprint';
import React, { useState } from 'react';

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

interface BookmarkProps {
  bookmarks: Bookmark[];
  onCreateBookmark: (name: string) => void;
  onSelectBookmark: (bookmarkName: Bookmark) => void;
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({
  bookmarks = [],
  onCreateBookmark,
  onSelectBookmark,
}) => {
  const [newBookmarkName, setNewBookmarkName] = useState('');

  const handleCreateBookmark = () => {
    if (newBookmarkName.trim()) {
      onCreateBookmark(newBookmarkName.trim());
      setNewBookmarkName('');
    }
  };

  return (
    <div>
      <div className="create-bookmark">
        <input
          type="text"
          value={newBookmarkName}
          onChange={(e) => setNewBookmarkName(e.target.value)}
          placeholder="Set Name"
        />
        <button onClick={handleCreateBookmark}>Create Bookmark Group</button>
      </div>
      <div className="bookmarks-list">
        {bookmarks.map((bookmark, index) => (
          <div key={index} className="bookmark-item">
            <h3
              className="bookmark-name"
              onClick={() => onSelectBookmark(bookmark)}
            >
              {bookmark.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
