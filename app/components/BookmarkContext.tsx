import React, { createContext, useContext, useState, useEffect } from 'react';
import { Blueprint } from '@/app/models/blueprint';
import {
  loadBookmarksFromStorage,
  saveBookmarksToStorage,
  createBookmark as createBookmarkUtil,
  deleteBookmark as deleteBookmarkUtil,
  addMeasureToBookmark as addMeasureToBookmarkUtil,
  encodeBookmarksToURL,
  decodeBookmarksFromURL,
  Bookmark,
} from '@/app/components/BookmarkUtils';
import { AppData } from '@/app/models/appData';

interface BookmarkContextType {
  bookmarks: Bookmark[];
  createBookmark: (name: string) => void;
  deleteBookmark: (name: string) => void;
  addMeasureToBookmark: (bookmarkName: string, measure: Blueprint) => void;
  shareBookmarks: () => void;
  loadBookmarksFromURL: (queryString: string, appData: AppData) => void;
  isMeasureBookmarked: (measureCode: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(loadBookmarksFromStorage());
  }, []);

  const createBookmark = (name: string) => {
    const updatedBookmarks = createBookmarkUtil(bookmarks, name);
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  const deleteBookmark = (name: string) => {
    const updatedBookmarks = deleteBookmarkUtil(bookmarks, name);
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  const addMeasureToBookmark = (bookmarkName: string, measure: Blueprint) => {
    const updatedBookmarks = addMeasureToBookmarkUtil(
      bookmarks,
      bookmarkName,
      measure,
    );
    setBookmarks(updatedBookmarks);
    saveBookmarksToStorage(updatedBookmarks);
  };

  const shareBookmarks = () => {
    if (!bookmarks.length) {
      alert('No bookmarks to share');
      return;
    }

    const queryString = encodeBookmarksToURL(bookmarks);
    if (!queryString) {
      alert('Failed to generate bookmark link');
      return;
    }

    const currentURL = new URL(window.location.href);
    currentURL.search = queryString;

    navigator.clipboard
      .writeText(currentURL.toString())
      .then(() => alert('Link to all bookmarks copied!'))
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link to clipboard');
      });
  };

  const loadBookmarksFromURL = (queryString: string, appData: AppData) => {
    const urlBookmarks = decodeBookmarksFromURL(queryString, appData);
    if (urlBookmarks.length) {
      setBookmarks(urlBookmarks);
      saveBookmarksToStorage(urlBookmarks);
    }
  };

  const isMeasureBookmarked = (measureCode: string): boolean => {
    return bookmarks.some((bookmark) =>
      bookmark.measures.some((measure) => measure.code === measureCode),
    );
  };

  const value = {
    bookmarks,
    createBookmark,
    deleteBookmark,
    addMeasureToBookmark,
    shareBookmarks,
    loadBookmarksFromURL,
    isMeasureBookmarked,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
