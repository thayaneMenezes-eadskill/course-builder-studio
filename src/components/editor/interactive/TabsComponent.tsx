import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { TiptapEditor } from '../../TiptapEditor';

export const TabsComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, editor }) => {
  const { tabs } = node.attrs;
  const [localTabs, setLocalTabs] = useState(tabs);
  const [activeTab, setActiveTab] = useState('tab-0');
  const isEditable = editor.isEditable;

  useEffect(() => {
    setLocalTabs(tabs);
  }, [tabs]);

  const handleTitleChange = (index: number, value: string) => {
    const newTabs = [...localTabs];
    newTabs[index].title = value;
    setLocalTabs(newTabs);
    updateAttributes({ tabs: newTabs });
  };

  const handleContentChange = (index: number, value: string) => {
    const newTabs = [...localTabs];
    newTabs[index].content = value;
    setLocalTabs(newTabs);
    updateAttributes({ tabs: newTabs });
  };

  const addTab = () => {
    const newTabs = [...localTabs, { title: `Tab ${localTabs.length + 1}`, content: 'Novo conteúdo' }];
    setLocalTabs(newTabs);
    updateAttributes({ tabs: newTabs });
    setActiveTab(`tab-${localTabs.length}`);
  };

  const removeTab = (index: number) => {
    if (localTabs.length > 1) {
      const newTabs = localTabs.filter((_, i) => i !== index);
      setLocalTabs(newTabs);
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
      <NodeViewWrapper className="mt-4 mb-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center">
            <TabsList className="flex-1">
              {localTabs && localTabs.map((tab, index) => (
                <TabsTrigger asChild key={index} value={`tab-${index}`}>
                  <div
                    className="flex items-center px-3 py-1.5 text-gray-800"
                    onClick={(e) => { e.stopPropagation(); setActiveTab(`tab-${index}`); }}
                  >
                    <input
                      type="text"
                      className="bg-transparent border-none w-full focus:outline-none"
                      value={tab.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => { e.stopPropagation(); removeTab(index); }}
                      className="ml-1 h-5 w-5"
                      disabled={localTabs.length <= 1}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              variant="ghost"
              size="icon"
              onClick={addTab}
              onMouseDown={(e) => e.stopPropagation()}
              className="ml-2"
            >
              <Plus size={16} />
            </Button>
          </div>

          {localTabs && localTabs.map((tab, index) => (
            <TabsContent key={index} value={`tab-${index}`} className="mt-0 p-0 h-auto">
              <textarea
                className="w-full p-1 bg-transparent border rounded resize-none mt-0"
                value={tab.content}
                onChange={(e) => handleContentChange(index, e.target.value)}
                placeholder="Conteúdo da tab"
              />
            </TabsContent>
          ))}
        </Tabs>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="mt-0 mb-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center ">
          <TabsList className="flex-1">
            {localTabs && localTabs.map((tab, index) => (
              <div
                className="w-full flex items-center px-3 py-1.5 text-gray-800"
              >
                <TabsTrigger
                  key={index}
                  className=' w-full'
                  value={`tab-${index}`}
                  onClick={() => setActiveTab(`tab-${index}`)}
                >
                  {tab.title}
                </TabsTrigger>
              </div>
            ))}
          </TabsList>

        </div>
        {localTabs && localTabs.map((tab, index) => (
          <TabsContent key={index} value={`tab-${index}`} className="mt-0 p-0 h-auto">
            <TiptapEditor 
              content={tab.content} 
              editable={false} 
              onChange={() => {}} 
              placeholder="" 
            />
          </TabsContent>
        ))}

      </Tabs>
    </NodeViewWrapper>
  );
};
