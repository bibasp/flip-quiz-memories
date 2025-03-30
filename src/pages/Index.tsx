
import { useState } from 'react';
import FlipCard from '@/components/FlipCard';
import SearchBox from '@/components/SearchBox';
import CategoryFilter from '@/components/CategoryFilter';
import { QuestionsProvider, useQuestions } from '@/context/QuestionsContext';

const F1VisaQuestions = () => {
  const { filteredQuestions, categories, selectedCategory, setSelectedCategory, searchQuestions } = useQuestions();

  return (
    <div className="container py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-visa-navy">
          F1 Visa Interview Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice and memorize answers to common F1 visa interview questions. Click on a card to flip and see the answer.
        </p>
      </header>

      <div className="max-w-5xl mx-auto">
        <SearchBox onSearch={searchQuestions} />
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">No questions found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <FlipCard
                key={question.id}
                question={question.question}
                answer={question.answer}
                category={question.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const IndexPage = () => {
  return (
    <QuestionsProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-visa-soft-blue">
        <F1VisaQuestions />
      </div>
    </QuestionsProvider>
  );
};

export default IndexPage;
