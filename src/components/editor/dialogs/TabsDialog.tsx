
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsDialogProps {
  editor: Editor;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TabsDialog = ({ editor, children, open, onOpenChange }: TabsDialogProps) => {
  const [tabItems, setTabItems] = useState([
    { title: "Tab 1", content: "" },
    { title: "Tab 2", content: "" },
  ]);
  const [activeTab, setActiveTab] = useState("0");

  const addTab = () => {
    setTabItems([...tabItems, { title: `Tab ${tabItems.length + 1}`, content: "" }]);
    setActiveTab((tabItems.length).toString());
  };

  const removeTab = (index: number) => {
    if (tabItems.length > 1) {
      setTabItems(tabItems.filter((_, i) => i !== index));
      setActiveTab("0");
    }
  };

  const updateTabTitle = (index: number, title: string) => {
    const newTabs = [...tabItems];
    newTabs[index].title = title;
    setTabItems(newTabs);
  };

  const updateTabContent = (index: number, content: string) => {
    const newTabs = [...tabItems];
    newTabs[index].content = content;
    setTabItems(newTabs);
  };

  const addTabsComponent = () => {
    if (tabItems.length > 0 && tabItems.every(tab => tab.title)) {
      editor.chain().focus().setTabs({ tabs: tabItems }).run();
      setTabItems([
        { title: "Tab 1", content: "" },
        { title: "Tab 2", content: "" },
      ]);
      setActiveTab("0");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Abas</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center mb-4">
            <TabsList className="flex-1 overflow-x-auto">
              {tabItems.map((tab, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex space-x-1 ml-2">
              <Button variant="outline" size="icon" onClick={addTab}>
                <Plus size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => removeTab(parseInt(activeTab))}
                disabled={tabItems.length <= 1}
              >
                <Minus size={16} />
              </Button>
            </div>
          </div>
          
          {tabItems.map((tab, index) => (
            <TabsContent key={index} value={index.toString()}>
              <div className="space-y-4">
                <div>
                  <label htmlFor={`tab-title-${index}`} className="block text-sm mb-1">
                    Título da Aba
                  </label>
                  <Input
                    id={`tab-title-${index}`}
                    value={tab.title}
                    onChange={(e) => updateTabTitle(index, e.target.value)}
                    placeholder="Título da aba"
                  />
                </div>
                <div>
                  <label htmlFor={`tab-content-${index}`} className="block text-sm mb-1">
                    Conteúdo
                  </label>
                  <Textarea
                    id={`tab-content-${index}`}
                    value={tab.content}
                    onChange={(e) => updateTabContent(index, e.target.value)}
                    placeholder="Conteúdo da aba"
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <Button onClick={addTabsComponent} className="mt-4">Adicionar Abas</Button>
      </DialogContent>
    </Dialog>
  );
};
