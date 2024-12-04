import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaShareAlt } from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';
import '../styles/Bookmark.scss';
import { BookmarkProvider } from '@/app/components/BookmarkContext';
import { Blueprint } from '@/app/models/blueprint';
import { useBookmarks } from '@/app/components/BookmarkContext';

interface Bookmark {
  name: string;
  measures: Blueprint[];
  date: string;
}

interface BookmarkProps {
  onSelectBookmark: (bookmark: Bookmark) => void;
  onClose: () => void;
}

const Bookmark: React.FC<BookmarkProps> = ({ onSelectBookmark, onClose }) => {
  const [newBookmarkName, setNewBookmarkName] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { bookmarks, createBookmark, deleteBookmark, shareBookmarks } =
    useBookmarks();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleCreateBookmark = () => {
    createBookmark(newBookmarkName);
    setNewBookmarkName('');
  };

  const onDeleteBookmark = (name: string) => {
    deleteBookmark(name);
  };

  const handleShareBookmarks = () => {
    shareBookmarks();
  };

  const handleViewBookmark = (bookmark: Bookmark) => {
    setIsClosing(true);
    setTimeout(() => {
      onSelectBookmark(bookmark);
      onClose();
    }, 0);
  };

  return (
    <BookmarkProvider>
      <div
        className={`bookmark-container ${isClosing ? 'closing' : ''} ${
          isOpen ? 'opening' : ''
        }`}
      >
        <div className="create-bookmark">
          <input
            type="text"
            value={newBookmarkName}
            onChange={(e) => setNewBookmarkName(e.target.value)}
            placeholder="Namen festlegen"
            className="bookmark-input"
          />
          <button className="create-button" onClick={handleCreateBookmark}>
            <MdCreateNewFolder />
          </button>
        </div>
        <div className="bookmarks-list">
          {bookmarks.map((bookmark, index) => (
            <div key={index} className="bookmark-item">
              <div className="bookmark-header">
                <button
                  className="view-bookmark"
                  onClick={() => handleViewBookmark(bookmark)}
                >
                  <div className="bookmark-view">
                    <h3 className="bookmark-name">{bookmark.name}</h3>
                    <FaEye />
                  </div>
                </button>

                <FaTrash
                  className="delete-bookmark"
                  onClick={() => onDeleteBookmark(bookmark.name)}
                />
              </div>
              <span className="bookmark-date">
                {new Date(bookmark.date).toLocaleDateString('de-DE')}{' '}
                {new Date(bookmark.date).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </div>
        <button className="share-bookmarks" onClick={handleShareBookmarks}>
          <span className="share-text">Teilen merkzettel</span>
          <FaShareAlt />
        </button>
      </div>
    </BookmarkProvider>
  );
};

export default Bookmark;
