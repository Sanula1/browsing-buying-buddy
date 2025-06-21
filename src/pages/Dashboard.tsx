
import React from 'react';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CalendarDays, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Dana Management System overview</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Morning Dana - Colombo Temple</p>
                  <p className="text-sm text-gray-600">Family Perera</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Tomorrow</p>
                  <p className="text-xs text-gray-500">6:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Evening Dana - Kandy Temple</p>
                  <p className="text-sm text-gray-600">Family Silva</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Dec 25</p>
                  <p className="text-xs text-gray-500">6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">Afternoon Dana - Galle Temple</p>
                  <p className="text-sm text-gray-600">Family Fernando</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Dec 26</p>
                  <p className="text-xs text-gray-500">12:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <div className="font-medium text-blue-900">Add New Temple</div>
              <div className="text-sm text-blue-600 mt-1">Register a new temple</div>
            </button>
            
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <div className="font-medium text-green-900">Create Assignment</div>
              <div className="text-sm text-green-600 mt-1">Assign dana to families</div>
            </button>
            
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <div className="font-medium text-purple-900">Add Family</div>
              <div className="text-sm text-purple-600 mt-1">Register new family</div>
            </button>
            
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <div className="font-medium text-orange-900">View Reports</div>
              <div className="text-sm text-orange-600 mt-1">Generate reports</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
