import React, { createContext, useContext, useState, useEffect } from "react";
import { Module, NewModule } from "@/types/module";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface ModuleContextType {
  modules: Module[];
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
  addModule: (module: NewModule) => void;
  updateModule: (id: string, data: Partial<Module>) => void;
  deleteModule: (id: string) => void;
  getModuleById: (id: string) => Module | undefined;
  saveModules: () => Promise<void>;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    const loadModules = async () => {
      const courseId = localStorage.getItem('courseId');
      if (!courseId) return;
      try {
        const response = await fetch(`https://poc-backend.nxtskill.com.br/v2/course/${courseId}`);
        if (!response.ok) throw new Error('Failed to load course');
        const data = await response.json();
        // extract modules from course content payload
        let mods: Module[] = [];
        if (data.content) {
          const rawModules =
            typeof data.content === 'string'
              ? (() => { try { return JSON.parse(data.content).modules; } catch { return []; } })()
              : data.content.modules || [];
          // assign ids and order to each module
          mods = rawModules.map((m: any, idx: number) => ({
            id: m.id || uuidv4(),
            title: m.title,
            content: m.content,
            order: idx,
            createdAt: new Date(),
          }));
        }
        setModules(mods);
        if (mods.length > 0) {
          setActiveModuleId(mods[0].id);
        }
      } catch (err) {
        console.error('Error loading modules:', err);
        toast.error('Erro ao carregar módulos');
      }
    };
    loadModules();
  }, []);


  const saveModules = async () => {
    const courseId = localStorage.getItem('courseId');
    const courseTitle = localStorage.getItem('courseTitle') || '';
    if (!courseId) {
      toast.error('Course ID missing');
      return;
    }
    try {
  
      const payload = {
        title: courseTitle,
        content: {
          modules: modules.map(m => ({ title: m.title, content: m.content })),
        },
      };
      const response = await fetch(
        `https://poc-backend.nxtskill.com.br/v2/course/${courseId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error('Failed to save modules');
      toast.success('Módulos atualizados com sucesso');
    } catch (error) {
      console.error('Error saving modules:', error);
      toast.error('Erro ao atualizar módulos');
    }
  };

  const addModule = (module: NewModule) => {
    const newModule: Module = { ...module, id: uuidv4(), createdAt: new Date() };
    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    setActiveModuleId(newModule.id);
    toast.success('Módulo criado (não salvo)');
  };

  const updateModule = (id: string, data: Partial<Module>) => {
    const updatedModules = modules.map(module =>
      module.id === id ? { ...module, ...data } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (id: string) => {
    setModules(prev => prev.filter(module => module.id !== id));
    
    if (activeModuleId === id) {
      const remainingModules = modules.filter(module => module.id !== id);
      if (remainingModules.length > 0) {
        setActiveModuleId(remainingModules[0].id);
      } else {
        setActiveModuleId(null);
      }
    }
    
    toast.success("Module deleted successfully");
  };

  const getModuleById = (id: string) => {
    return modules.find(module => module.id === id);
  };

  const value = {
    modules,
    activeModuleId,
    setActiveModuleId,
    addModule,
    updateModule,
    deleteModule,
    getModuleById,
    saveModules
  };

  return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>;
};

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error("useModules must be used within a ModuleProvider");
  }
  return context;
};
