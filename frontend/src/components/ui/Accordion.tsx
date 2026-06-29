import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  id: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-slate-800 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className={`
              w-full px-6 py-4 text-left font-semibold
              flex items-center justify-between
              transition-colors duration-200
              border-b border-slate-700 hover:bg-slate-800/50
              ${
                openItems.includes(item.id)
                  ? 'bg-slate-900 text-cyan-400'
                  : 'bg-slate-900/50 text-slate-200'
              }
            `}
          >
            <span>{item.title}</span>
            <ChevronDown
              size={20}
              className={`
                transition-transform duration-200
                ${openItems.includes(item.id) ? 'rotate-180' : ''}
              `}
            />
          </button>

          {openItems.includes(item.id) && (
            <div className="px-6 py-4 bg-slate-950/50 text-slate-200 border-t border-slate-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

Accordion.displayName = 'Accordion';
