import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 flex items-center gap-2 hover:bg-primary/10"
    >
      <Home className="h-4 w-4" />
      Back to Home
    </Button>
  );
};