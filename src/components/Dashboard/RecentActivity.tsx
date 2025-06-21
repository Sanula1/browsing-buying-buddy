
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      message: 'New dana assignment created for Colombo Temple',
      time: '2 hours ago',
      status: 'pending',
      icon: Clock,
    },
    {
      id: 2,
      type: 'confirmation',
      message: 'Family Silva confirmed their assignment',
      time: '4 hours ago',
      status: 'confirmed',
      icon: CheckCircle,
    },
    {
      id: 3,
      type: 'warning',
      message: 'Assignment deadline approaching for Kandy Temple',
      time: '6 hours ago',
      status: 'warning',
      icon: AlertCircle,
    },
    {
      id: 4,
      type: 'cancelled',
      message: 'Assignment cancelled by Family Perera',
      time: '1 day ago',
      status: 'cancelled',
      icon: XCircle,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <Icon className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
