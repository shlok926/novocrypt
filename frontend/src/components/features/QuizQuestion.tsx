import React from 'react';
import { Card } from '../ui/Card';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correct?: number;
  onAnswer?: (index: number) => void;
  showAnswer?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correct,
  onAnswer,
  showAnswer = false,
}) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    onAnswer?.(index);
  };

  return (
    <Card variant="default" className="space-y-4">
      <h3 className="font-semibold text-white">{question}</h3>
      
      <div className="space-y-2">
        {options.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = showAnswer && idx === correct;
          const isWrong = showAnswer && isSelected && idx !== correct;

          let bgColor = 'bg-white hover:bg-transparent';
          let borderColor = 'border-slate-800';

          if (isCorrect) {
            bgColor = 'bg-green-50';
            borderColor = 'border-green-300';
          } else if (isWrong) {
            bgColor = 'bg-red-50';
            borderColor = 'border-red-300';
          } else if (isSelected) {
            bgColor = 'bg-blue-50';
            borderColor = 'border-blue-300';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showAnswer}
              className={`w-full rounded-lg border-2 p-3 text-left transition-all ${bgColor} ${borderColor}`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full border-2 ${borderColor} flex items-center justify-center`}>
                  {isSelected && <div className="h-3 w-3 rounded-full bg-current" />}
                </div>
                <span className="text-sm font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
