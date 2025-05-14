
import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export const TabsComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const { tabs } = node.attrs;
  const [activeTab, setActiveTab] = useState('tab-0');
  const isEditable = editor.isEditable;

  const handleTitleChange = (index: number, value: string) => {
    const newTabs = [...tabs];
    newTabs[index].title = value;
    updateAttributes({ tabs: newTabs });
  };

  const handleContentChange = (index: number, value: string) => {
    const newTabs = [...tabs];
    newTabs[index].content = value;
    updateAttributes({ tabs: newTabs });
  };

  const addTab = () => {
    const newTabs = [...tabs, { title: `Tab ${tabs.length + 1}`, content: 'Novo conteúdo' }];
    updateAttributes({ tabs: newTabs });
    setActiveTab(`tab-${tabs.length}`);
  };

  const removeTab = (index: number) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((_, i) => i !== index);
      updateAttributes({ tabs: newTabs });
      setActiveTab(newTabs.length > 0 ? `tab-${Math.min(index, newTabs.length - 1)}` : 'tab-0');
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    if (isEditable) {
      e.stopPropagation();
    }
  };

  if (isEditable) {
    return (
      <NodeViewWrapper className="my-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center">
            <TabsList className="flex-1">
              {tabs && tabs.map((tab, index) => (
                <div key={index} className="flex items-center">
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
                      disabled={tabs.length <= 1}
                    >
                      <Minus size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsList>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={addTab}
              className="ml-2"
            >
              <Plus size={16} />
            </Button>
          </div>
          
          {tabs && tabs.map((tab, index) => (
            <TabsContent key={index} value={`tab-${index}`}>
              <textarea
                className="w-full p-2 bg-transparent border rounded resize-none min-h-[100px]"
                value={tab.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Conteúdo da tab"
                onClick={stopPropagation}
              />
            </TabsContent>
          ))}
        </Tabs>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-4">
      <Tabs defaultValue="tab-0" className="w-full">
        <TabsList>
          {tabs && tabs.map((tab, index) => (
            <TabsTrigger key={index} value={`tab-${index}`}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabs && tabs.map((tab, index) => (
          <TabsContent key={index} value={`tab-${index}`}>
            <div dangerouslySetInnerHTML={{ __html: tab.content }} />
          </TabsContent>
        ))}
      </Tabs>
    </NodeViewWrapper>
  );
};
