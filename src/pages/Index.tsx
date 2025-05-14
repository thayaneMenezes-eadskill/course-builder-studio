
import { Dashboard } from "@/components/Dashboard";
import ModuleViewer from "@/components/ModuleViewer";
import { useModules } from "@/contexts/ModuleContext";

const Index = () => {
  const { activeModuleId, getModuleById } = useModules();
  
  const module = activeModuleId ? getModuleById(activeModuleId) : null;

  return (
    <Dashboard>
      {module && (
        <ModuleViewer 
          title={module.title} 
          content={module.content} 
        />
      )}
    </Dashboard>
  );
};

export default Index;
