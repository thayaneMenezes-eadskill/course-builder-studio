
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
  loading: boolean;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const API_URL = "https://poc-backend.nxtskill.com.br";

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load modules from API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/modules`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch modules");
        }
        
        const data = await response.json();
        
        // Transform dates from strings to Date objects
        const formattedModules = data.map((module: any) => ({
          ...module,
          createdAt: new Date(module.createdAt)
        }));
        
        setModules(formattedModules);
        
        if (formattedModules.length > 0 && !activeModuleId) {
          setActiveModuleId(formattedModules[0].id);
        }
      } catch (error) {
        console.error("Error loading modules from API:", error);
        toast.error("Failed to load course modules");
        
        // Create a default module if there are none available
        const defaultModule: Module = {
          id: uuidv4(),
          title: "Introduction",
          content: "<h1>Welcome to your course</h1><p>Start editing this module.</p>",
          order: 0,
          createdAt: new Date()
        };
        
        try {
          const response = await fetch(`${API_URL}/modules`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(defaultModule),
          });
          
          if (!response.ok) {
            throw new Error("Failed to create default module");
          }
          
          setModules([defaultModule]);
          setActiveModuleId(defaultModule.id);
        } catch (createError) {
          console.error("Error creating default module:", createError);
          toast.error("Failed to create default module");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const addModule = async (module: NewModule) => {
    try {
      const newModule: Module = {
        ...module,
        id: uuidv4(),
        createdAt: new Date()
      };

      const response = await fetch(`${API_URL}/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newModule),
      });

      if (!response.ok) {
        throw new Error("Failed to create module");
      }

      setModules(prev => [...prev, newModule]);
      setActiveModuleId(newModule.id);
      toast.success("Module created successfully");
    } catch (error) {
      console.error("Error creating module:", error);
      toast.error("Failed to create module");
    }
  };

  const updateModule = async (id: string, data: Partial<Module>) => {
    try {
      // Get current module data to merge with updates
      const currentModule = modules.find(module => module.id === id);
      
      if (!currentModule) {
        throw new Error("Module not found");
      }
      
      const updatedModule = { ...currentModule, ...data };
      
      const response = await fetch(`${API_URL}/modules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedModule),
      });

      if (!response.ok) {
        throw new Error("Failed to update module");
      }

      setModules(prev => 
        prev.map(module => 
          module.id === id ? { ...module, ...data } : module
        )
      );
    } catch (error) {
      console.error("Error updating module:", error);
      toast.error("Failed to update module");
    }
  };

  const deleteModule = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/modules/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete module");
      }

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
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module");
    }
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
    loading
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
