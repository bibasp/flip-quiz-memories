
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  question: string;
  answer: string;
  category: string;
}

const FlipCard = ({ question, answer, category }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={cn(
        "flip-card w-full h-[300px] cursor-pointer", 
        isFlipped && "flipped"
      )}
      onClick={toggleFlip}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of card - Question */}
        <Card className="flip-card-front absolute w-full h-full flex flex-col p-6 border-2 border-visa-purple/20 hover:border-visa-purple/40 transition-colors">
          <div className="text-sm font-medium text-visa-purple mb-2">{category}</div>
          <div className="text-xl font-semibold mb-4">{question}</div>
          <div className="text-sm text-muted-foreground mt-auto">Click to flip</div>
        </Card>

        {/* Back of card - Answer */}
        <Card className="flip-card-back absolute w-full h-full flex flex-col p-6 bg-visa-light-purple border-2 border-visa-purple/30">
          <div className="text-sm font-medium text-visa-purple mb-2">{category}</div>
          <div className="overflow-y-auto scrollbar-hide h-full pr-2">
            <p className="text-sm">{answer}</p>
          </div>
          <div className="text-sm text-muted-foreground mt-4">Click to flip back</div>
        </Card>
      </div>
    </div>
  );
};

export default FlipCard;
