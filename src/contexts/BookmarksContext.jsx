import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarksContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('mldl_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setBookmarks([]);
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('mldl_bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  const addBookmark = (resource) => {
    const bookmarkId = `${resource.category}_${resource.url}`;
    
    // Check if already bookmarked
    const exists = bookmarks.some(b => 
      `${b.category}_${b.url}` === bookmarkId
    );
    
    if (!exists) {
      const newBookmark = {
        ...resource,
        bookmarkId,
        bookmarkedAt: new Date().toISOString()
      };
      setBookmarks(prev => [...prev, newBookmark]);
      return true;
    }
    return false;
  };

  const removeBookmark = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.bookmarkId !== bookmarkId));
  };

  const isBookmarked = (category, url) => {
    const bookmarkId = `${category}_${url}`;
    return bookmarks.some(b => b.bookmarkId === bookmarkId);
  };

  const toggleBookmark = (resource) => {
    const bookmarkId = `${resource.category}_${resource.url}`;
    
    if (isBookmarked(resource.category, resource.url)) {
      removeBookmark(bookmarkId);
      return false;
    } else {
      addBookmark(resource);
      return true;
    }
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
        clearAllBookmarks
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContext;
