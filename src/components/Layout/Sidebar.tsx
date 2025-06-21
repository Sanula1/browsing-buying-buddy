
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  MapPin, 
  Users, 
  Heart, 
  UserCheck, 
  ClipboardList,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Building2, label: 'Temples', path: '/temples' },
    { icon: MapPin, label: 'Villages', path: '/villages' },
    { icon: Users, label: 'Families', path: '/families' },
    { icon: Heart, label: 'Dana', path: '/dana' },
    { icon: UserCheck, label: 'Members', path: '/members' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={cn(
      "bg-gradient-to-b from-orange-50 to-orange-100 border-r border-orange-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-orange-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-orange-800">Dana Management</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-orange-700 hover:bg-orange-200"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "bg-orange-200 text-orange-800 font-medium" 
                      : "text-orange-700 hover:bg-orange-100",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-orange-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-red-600 hover:bg-red-50 hover:text-red-700",
            collapsed ? "justify-center px-2" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
