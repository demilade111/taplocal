
import { Button } from "@/components/ui/button";
import { UserIcon, Wrench } from "lucide-react";

interface UserRoleSelectionProps {
  onSelectRole: (role: "client" | "professional") => void;
}

export const UserRoleSelection = ({ onSelectRole }: UserRoleSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="h-auto py-8 border-2 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 hover:border-taplocal-purple"
        onClick={() => onSelectRole("client")}
      >
        <UserIcon className="w-12 h-12 text-taplocal-purple" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">I'm a Client</h3>
          <p className="font-normal text-sm text-gray-500">Looking to book services</p>
        </div>
      </Button>
      
      <Button
        variant="outline"
        className="h-auto py-8 border-2 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 hover:border-taplocal-teal"
        onClick={() => onSelectRole("professional")}
      >
        <Wrench className="w-12 h-12 text-taplocal-teal" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">I'm a Professional</h3>
          <p className="font-normal text-sm text-gray-500">Offering my services</p>
        </div>
      </Button>
    </div>
  );
};
