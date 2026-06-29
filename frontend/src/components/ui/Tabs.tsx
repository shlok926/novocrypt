import React, { useState } from 'react';

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue = tabs[0]?.value,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div className="w-full">
      {/* Tab List */}
      <div className="flex border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`
              px-6 py-3 font-medium text-sm transition-colors
              border-b-2 -mb-px
              ${
                activeTab === tab.value
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-600 border-transparent hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';
