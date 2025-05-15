
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, WandSparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const handleCreateNewCourse = () => {
    navigate("/dashboard");
  };

  const handleGenerateWithAI = () => {
    // For now, this also navigates to dashboard
    // Could be updated later to go to an AI course generation page
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-[80%] md:w-[70%] lg:w-[60%] h-[60%] rounded-lg shadow-lg bg-white p-8 flex flex-col justify-center">
        <h1 className="text-3xl font-heading font-bold text-center mb-8">Welcome to Course Builder Studio</h1>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
          <Card 
            className="w-full md:w-1/2 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary"
            onClick={handleCreateNewCourse}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <Plus size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Criar Novo Curso</h2>
              <p className="text-muted-foreground">Comece um novo curso do zero</p>
            </CardContent>
          </Card>

          <Card 
            className="w-full md:w-1/2 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 hover:border-primary"
            onClick={handleGenerateWithAI}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mt-4">
                <WandSparkles size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Gerar Curso com IA</h2>
              <p className="text-muted-foreground">Use nossa IA para criar um curso rapidamente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
