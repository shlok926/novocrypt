import React from 'react';

interface LessonContentProps {
  title: string;
  sections: Array<{
    heading: string;
    content: string | React.ReactNode;
  }>;
}

export const LessonContent: React.FC<LessonContentProps> = ({ title, sections }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">{title}</h2>

      {sections.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-xl font-semibold text-white">{section.heading}</h3>
          <div className="prose prose-sm max-w-none text-slate-300">
            {typeof section.content === 'string' ? (
              <p>{section.content}</p>
            ) : (
              section.content
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
