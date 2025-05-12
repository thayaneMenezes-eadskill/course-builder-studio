
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModules } from "@/contexts/ModuleContext";
import { Plus, ChevronLeft, ChevronRight, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { modules, addModule, deleteModule, activeModuleId, setActiveModuleId } = useModules();

  const handleAddModule = () => {
    const newOrder = modules.length > 0 
      ? Math.max(...modules.map(m => m.order)) + 1 
      : 0;
    
    addModule({
      title: `Module ${newOrder + 1}`,
      content: `<h1>Module ${newOrder + 1}</h1><p>Start editing this module.</p>`,
      order: newOrder,
    });
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleDeleteModule = (id: string) => {
    if (modules.length <= 1) {
      return; // Prevent deleting the last module
    }
    deleteModule(id);
  };

  return (
    <div
      className={`h-screen flex flex-col border-r border-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="text-lg font-bold text-sidebar-foreground">Course Builder</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="p-4">
        <Button
          onClick={handleAddModule}
          className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground"
        >
          {collapsed ? (
            <Plus size={20} />
          ) : (
            <>
              <Plus size={16} className="mr-2" /> Add Module
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {modules.sort((a, b) => a.order - b.order).map((module) => (
            <div
              key={module.id}
              className={`flex items-center justify-between rounded-md mb-1 px-3 py-2 cursor-pointer transition-colors ${
                activeModuleId === module.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
              }`}
              onClick={() => handleModuleClick(module.id)}
            >
              {collapsed ? (
                <div className="w-6 h-6 rounded-full bg-sidebar-primary text-white flex items-center justify-center text-xs">
                  {module.order + 1}
                </div>
              ) : (
                <>
                  <span className="truncate flex-1">{module.title}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-50 hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteModule(module.id);
                        }}
                        disabled={modules.length <= 1}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
