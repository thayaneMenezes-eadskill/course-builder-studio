import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

// Added sanitization and improved active tab handling for TabsComponent
const sanitizeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const TabsComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const { tabs } = node.attrs;
  const [activeTab, setActiveTab] = useState('tab-0');
  const isEditable = editor.isEditable;

  const handleTitleChange = (index: number, value: string) => {
    const sanitizedValue = sanitizeHTML(value);
    const newTabs = [...tabs];
    newTabs[index].title = sanitizedValue;
    updateAttributes({ tabs: newTabs });
  };

  const handleContentChange = (index: number, value: string) => {
    const sanitizedValue = sanitizeHTML(value);
    const newTabs = [...tabs];
    newTabs[index].content = sanitizedValue;
    updateAttributes({ tabs: newTabs });
  };

  const addTab = () => {
    const newTabs = [...tabs, { title: `Tab ${tabs.length + 1}`, content: 'Novo conteúdo' }];
    updateAttributes({ tabs: newTabs });
    setActiveTab(`tab-${tabs.length}`);
  };

  const removeTab = (index: number) => {
    const newTabs = tabs.filter((_, i) => i !== index);
    updateAttributes({ tabs: newTabs });
    setActiveTab(newTabs.length > 0 ? `tab-${Math.min(index, newTabs.length - 1)}` : 'tab-0');
  };

  return (
    <NodeViewWrapper className="my-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center">
          <TabsList>
            {tabs.map((tab, index) => (
              <div key={index} className="flex items-center">
                {isEditable ? (
                  <div className="flex items-center px-3 py-1.5">
                    <input
                      type="text"
                      className="bg-transparent border-none w-full focus:outline-none"
                      value={tab.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(`tab-${index}`);
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTab(index);
                      }}
                      className="ml-1 h-5 w-5"
                    >
                      <Minus size={12} />
                    </Button>
                  </div>
                ) : (
                  <TabsTrigger value={`tab-${index}`}>
                    {tab.title}
                  </TabsTrigger>
                )}
              </div>
            ))}
          </TabsList>
          
          {isEditable && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={addTab}
              className="ml-2"
            >
              <Plus size={16} />
            </Button>
          )}
        </div>
        
        {tabs.map((tab, index) => (
          <TabsContent key={index} value={`tab-${index}`}>
            {isEditable ? (
              <textarea
                className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                value={tab.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Conteúdo da tab"
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: tab.content }} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </NodeViewWrapper>
  );
};
