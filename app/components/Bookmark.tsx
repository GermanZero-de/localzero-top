import { Blueprint } from '@/app/models/blueprint';
import React, { useState } from 'react';

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

interface BookmarkProps {
  bookmarks: Bookmark[];
  onCreateBookmark: (name: string) => void;
  onAddMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
  onSelectBookmark: (bookmarkName: Bookmark) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({
  bookmarks = [],
  onCreateBookmark,
  onAddMeasureToBookmark,
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
            <ul>
              {bookmark.measures.map((measure, measureIndex) => (
                <li key={measureIndex}>{measure.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
