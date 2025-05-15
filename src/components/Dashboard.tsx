import React, { useCallback, useRef, useState, useEffect, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import ModuleEditor from "./ModuleEditor";
import { useModules } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TiptapEditor } from "./TiptapEditor";

interface DashboardProps {
  children?: ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { modules, activeModuleId, setActiveModuleId } = useModules();
  const [isEditing, setIsEditing] = useState(false);
  const moduleRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToModule = useCallback((moduleId: string) => {
    const el = moduleRefs.current[moduleId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    if (scrollAreaRef.current) {
      const sv = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (sv) (sv as HTMLElement).scrollTop = 0;
    }
    if (modules.length > 0) {
      const first = [...modules].sort((a, b) => a.order - b.order)[0].id;
      setActiveModuleId(first);
    }
  }, [modules, setActiveModuleId]);

  useEffect(() => {
    if (isEditing) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-module-id");
            if (id) setActiveModuleId(id);
          }
        });
      },
      { root: null, threshold: 0.3 }
    );
    modules.forEach((m) => {
      const el = moduleRefs.current[m.id];
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [modules, isEditing, setActiveModuleId]);

  return (
       <div className="flex h-screen overflow-hidden">
      <Sidebar
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onModuleClick={scrollToModule}
        activeModuleId={activeModuleId}
      />

      <div className="flex-1 overflow-hidden relative">
        <ScrollArea ref={scrollAreaRef} className="h-full sm:px-8 pt-8 scroll-area">
          <div className="mx-auto h-full">
            
            {isEditing ? (
             
              activeModuleId ? (
                <div
                  className="ProseMirror mb-4"
                  ref={(el) => (moduleRefs.current[activeModuleId] = el)}
                >
                  <ModuleEditor moduleId={activeModuleId} onSave={handleSave} />
                </div>
              ) : (
                <p>Nenhum módulo selecionado para editar.</p>
              )
            
            ) : children ? (
              children
              
            ) : activeModuleId ? (
              modules.map((module) => (
                <div
                  key={module.id}
                  className="mb-4 w-full flex flex-col"
                  ref={(el) => (moduleRefs.current[module.id] = el)}
                  data-module-id={module.id}
                >
                  <h2 className="text-xl font-bold">{module.title}</h2>
                  <div className="w-full mt-2">
                    <TiptapEditor 
                      content={module.content} 
                      editable={false} 
                      onChange={() => {}} 
                      placeholder="" 
                    />
                  </div>
                </div>
              ))
              
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