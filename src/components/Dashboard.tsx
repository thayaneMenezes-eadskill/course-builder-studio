
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import ModuleEditor from "./ModuleEditor";
import { useModules } from "@/contexts/ModuleContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Dashboard = () => {
  const { modules, activeModuleId, setActiveModuleId } = useModules();
  const [isEditing, setIsEditing] = useState(false);
  const moduleRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [userClickedModule, setUserClickedModule] = useState<string | null>(null);

  const scrollToModule = useCallback((moduleId) => {
    if (moduleRefs.current[moduleId]) {
      moduleRefs.current[moduleId].scrollIntoView({ behavior: "smooth", block: "start" });
      // Set the clicked module as active
      setActiveModuleId(moduleId);
      // Track that the user clicked a module
      setUserClickedModule(moduleId);
      
      // Clear the user click tracking after a delay to return to scroll-based tracking
      setTimeout(() => {
        setUserClickedModule(null);
      }, 2000); // 2 seconds delay
    }
  }, [setActiveModuleId]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    
    // Reset scroll position to top
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    }
    
    // Set the first module as active
    if (modules.length > 0) {
      const sortedModules = [...modules].sort((a, b) => a.order - b.order);
      setActiveModuleId(sortedModules[0].id);
    }
  }, [modules, setActiveModuleId]);

  // Implementação do Intersection Observer para detectar módulos visíveis
  useEffect(() => {
    if (isEditing || userClickedModule) return; // Don't monitor during editing or when a user clicked a module

    // Track the most visible module
    let maxVisibleModule = {
      id: null as string | null,
      visibleRatio: 0
    };

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: Array.from({ length: 11 }, (_, i) => i / 10) // 0, 0.1, 0.2, ..., 1.0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const moduleId = entry.target.getAttribute('data-module-id');
        
        if (moduleId) {
          const visibleRatio = entry.intersectionRatio;
          
          // Update the most visible module if this one has a higher ratio
          if (visibleRatio > maxVisibleModule.visibleRatio) {
            maxVisibleModule = {
              id: moduleId,
              visibleRatio: visibleRatio
            };
          }
        }
      });

      // Only update active module if we found one with sufficient visibility
      if (maxVisibleModule.id && maxVisibleModule.visibleRatio >= 0.5) { // At least 50% visible
        setActiveModuleId(maxVisibleModule.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each module
    modules.forEach(module => {
      const element = moduleRefs.current[module.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [modules, isEditing, setActiveModuleId, userClickedModule]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onModuleClick={scrollToModule}
        activeModuleId={activeModuleId}
      />
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4 sm:px-8 py-6 scroll-area">
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
                    data-module-id={module.id}
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
