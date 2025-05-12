
import React from "react";
import { Sidebar } from "./Sidebar";
import ModuleEditor from "./ModuleEditor";
import { useModules } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Dashboard = () => {
  const { modules, activeModuleId } = useModules();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4 sm:px-8 py-6">
          <div className="max-w-4xl mx-auto pb-24">
            {activeModuleId ? (
              <ModuleEditor moduleId={activeModuleId} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold">No module selected</h2>
                <p className="text-muted-foreground">
                  Please select a module from the sidebar or create a new one.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
