
import { Calendar, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface MemberSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MemberSidebar = ({ activeTab, setActiveTab }: MemberSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "assignments", label: "My Assignments", icon: Calendar },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-orange-200">
      <div className="p-6 border-b border-orange-200">
        <h1 className="text-2xl font-bold text-orange-800">Dana Manager</h1>
        <p className="text-sm text-orange-600 mt-1">Member Portal</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center px-6 py-3 text-left transition-colors",
                "hover:bg-orange-50 hover:text-orange-700",
                activeTab === item.id
                  ? "bg-orange-100 text-orange-800 border-r-2 border-orange-500"
                  : "text-gray-600"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-left transition-colors hover:bg-red-50 hover:text-red-700 text-gray-600 mt-4"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};
