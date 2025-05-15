
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, WandSparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Landing = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState("");

  const handleCreateNewCourse = () => {
    setIsFlipped(true);
  };

  const handleCancel = () => {
    setIsFlipped(false);
    setCourseTitle("");
    setTitleError("");
  };

  const validateAndSubmit = async () => {
    // Clear previous error
    setTitleError("");

    // Validate title
    if (!courseTitle || courseTitle.trim().length < 3) {
      setTitleError("O título deve ter pelo menos 3 caracteres");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://poc-backend.nxtskill.com.br/v2/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseTitle.trim(),
          status: "DRAFT",
          author_id: `auth0|${Math.floor(Math.random() * 1000000000)}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const data = await response.json();
      toast.success("Curso criado com sucesso!");
      navigate("/dashboard", { state: { courseId: data.id } });
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error("Erro ao criar curso. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateWithAI = () => {
    // For now, this also navigates to dashboard
    // Could be updated later to go to an AI course generation page
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className={`w-[80%] md:w-[70%] lg:w-[60%] h-[60%] perspective-1000 transition-all duration-500 ${isFlipped ? "pointer-events-none" : ""}`}>
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
          {/* Front side - Welcome */}
          <div className={`absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-white p-8 flex flex-col justify-center ${isFlipped ? "invisible" : ""}`}>
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

          {/* Back side - Course Title Form */}
          <div className="absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-white p-8 flex flex-col justify-center rotate-y-180">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-2xl font-bold text-center mb-6">Qual o título do seu curso?</h2>
              
              <div className="space-y-4">
                <div>
                  <Input
                    id="course-title"
                    placeholder="Digite o título do curso"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className={`text-lg ${titleError ? "border-destructive" : ""}`}
                  />
                  {titleError && (
                    <p className="text-sm text-destructive mt-1">{titleError}</p>
                  )}
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                    className="w-1/2 mr-2"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={validateAndSubmit} 
                    disabled={isSubmitting}
                    className="w-1/2 ml-2"
                  >
                    {isSubmitting ? "Criando..." : "Criar Curso"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
