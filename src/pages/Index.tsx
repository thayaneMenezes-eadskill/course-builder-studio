import { Dashboard } from "@/components/Dashboard";
import { useLocation } from "react-router-dom";

// Navigation state type for course data
type LocationState = {
  courseId: string;
  courseTitle?: string;
  courseContent?: string;
};

const Index = () => {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  return <Dashboard initialTitle={state.courseTitle} initialContent={state.courseContent} />;
};

export default Index;
