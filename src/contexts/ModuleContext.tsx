
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
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const STORAGE_KEY = "course-builder-modules";

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedModules = localStorage.getItem(STORAGE_KEY);
      if (storedModules) {
        const parsedModules = JSON.parse(storedModules).map((module: any) => ({
          ...module,
          createdAt: new Date(module.createdAt)
        }));
        
        setModules(parsedModules);

        if (parsedModules.length > 0 && !activeModuleId) {
          setActiveModuleId(parsedModules[0].id);
        }
      } else {
        const defaultModule: Module = {
          id: uuidv4(),
          title: "Introduction",
          content: "<h1>Welcome to your course</h1><p>Start editing this module.</p>",
          order: 0,
          createdAt: new Date()
        };
        
        setModules([defaultModule]);
        setActiveModuleId(defaultModule.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultModule]));
      }
    } catch (error) {
      console.error("Error loading modules from localStorage:", error);
      toast.error("Failed to load course modules");
    }
  }, []);

  useEffect(() => {
    if (modules.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    }
  }, [modules]);

  const addModule = (module: NewModule) => {
    const newModule: Module = {
      ...module,
      id: uuidv4(),
      createdAt: new Date()
    };

    setModules(prev => [...prev, newModule]);
    setActiveModuleId(newModule.id);
    toast.success("Module created successfully");
  };

  const updateModule = (id: string, data: Partial<Module>) => {
    setModules(prev => 
      prev.map(module => 
        module.id === id ? { ...module, ...data } : module
      )
    );
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
    getModuleById
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
