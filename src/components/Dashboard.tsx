import React, { useCallback, useRef, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import ModuleEditor from "./ModuleEditor";
import { useModules } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Dashboard = () => {
  const { modules, activeModuleId, setActiveModuleId } = useModules();
  const [isEditing, setIsEditing] = useState(false);
  const moduleRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToModule = useCallback((moduleId) => {
    if (moduleRefs.current[moduleId]) {
      moduleRefs.current[moduleId].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if(!isEditing){
      setActiveModuleId("1");
    }
  }, []);


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onModuleClick={scrollToModule}
        activeModuleId={activeModuleId}
      />
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full px-4 sm:px-8 py-6 scroll-area">
          <div className="max-w-4xl mx-auto pb-24">
            {activeModuleId ? (
              isEditing ? (
                <div
                  className="ProseMirror mb-4"
                  ref={(el) => (moduleRefs.current[activeModuleId] = el)}
                >
                  <ModuleEditor moduleId={activeModuleId} onSave={handleSave} />
                </div>
              ) : (
                modules.map((module) => (
                  <div
                    key={module.id}
                    className="ProseMirror mb-4"
                    ref={(el) => (moduleRefs.current[module.id] = el)}
                  >
                    <h2 className="text-xl font-bold">{module.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: module.content }} />
                  </div>
                ))
              )
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Nenhum módulo selecionado</h2>
                <p className="text-muted-foreground">
                  Selecione um módulo na barra lateral ou crie um novo.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};