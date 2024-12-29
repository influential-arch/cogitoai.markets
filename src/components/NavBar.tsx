import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl">CogitoAI.Markets</div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="neon-glow"
            onClick={() => navigate("/login")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button
            className="neon-glow"
            onClick={() => navigate("/register")}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};