
import React, { createContext, useContext, useState } from 'react';
import { questionData } from '@/data/questions';

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface QuestionsContextProps {
  questions: Question[];
  filteredQuestions: Question[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuestions: (query: string) => void;
}

const QuestionsContext = createContext<QuestionsContextProps | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions] = useState<Question[]>(questionData);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questionData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const allCategories = [...new Set(questions.map((q) => q.category))];

  // Filter questions based on category and search query
  const filterQuestions = (category: string, query: string) => {
    let filtered = questions;
    
    // Filter by category if not "All"
    if (category !== "All") {
      filtered = filtered.filter((q) => q.category === category);
    }
    
    // Filter by search query if it exists
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (q) => 
          q.question.toLowerCase().includes(lowerQuery) || 
          q.answer.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredQuestions(filtered);
  };

  // Handler for category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterQuestions(category, searchQuery);
  };

  // Handler for search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterQuestions(selectedCategory, query);
  };

  const value = {
    questions,
    filteredQuestions,
    categories: allCategories,
    selectedCategory,
    setSelectedCategory: handleCategorySelect,
    searchQuestions: handleSearch,
  };

  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
