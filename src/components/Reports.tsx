import React from 'react';
import { BarChart as BarChartIcon, Users, Clock, CheckCircle2, TrendingUp, Calendar, Tag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useTickets } from '../context/TicketContext';

export default function Reports() {
  const { tickets, getTicketStats } = useTickets();
  const stats = getTicketStats();

  // Calculate ticket categories
  const ticketsByCategory = Object.entries(
    tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, count]) => ({
    name: name === 'technical' ? 'תמיכה טכנית' :
          name === 'billing' ? 'חשבונות' :
          name === 'financial' ? 'כספים' : 'כללי',
    count,
    color: name === 'technical' ? '#3B82F6' :
           name === 'billing' ? '#F59E0B' :
           name === 'financial' ? '#10B981' : '#6366F1'
  }));

  // Calculate ticket statuses
  const ticketsByStatus = Object.entries(
    tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, value]) => ({
    name: status === 'new' ? 'חדש' :
          status === 'in_progress' ? 'בטיפול' :
          status === 'pending' ? 'ממתין' : 'סגור',
    value,
    color: status === 'new' ? '#3B82F6' :
           status === 'in_progress' ? '#F59E0B' :
           status === 'pending' ? '#6366F1' : '#10B981'
  }));

  // Calculate ticket trends (last 7 days)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const ticketTrends = last7Days.map(date => {
    const dayTickets = tickets.filter(t => t.createdAt.startsWith(date));
    const resolvedTickets = tickets.filter(t => 
      t.status === 'resolved' && t.updatedAt.startsWith(date)
    );

    return {
      date: new Date(date).toLocaleDateString('he-IL', { month: 'numeric', day: 'numeric' }),
      new: dayTickets.length,
      resolved: resolvedTickets.length
    };
  });

  // Calculate response times
  const responseTimeRanges = {
    '< שעה': 0,
    '1-3 שעות': 0,
    '3-6 שעות': 0,
    '6-12 שעות': 0,
    '12-24 שעות': 0,
    '> 24 שעות': 0
  };

  const responseTimeData = Object.entries(responseTimeRanges).map(([time, tickets]) => ({
    time,
    tickets: Math.floor(Math.random() * 20) + 5 // Mock data for demonstration
  }));

  const statCards = [
    {
      title: 'סה"כ פניות פתוחות',
      value: stats.open.toString(),
      change: '+12.5%',
      icon: BarChartIcon,
      color: 'blue',
    },
    {
      title: 'זמן תגובה ממוצע',
      value: stats.responseTime,
      change: '-15.3%',
      icon: Clock,
      color: 'yellow',
    },
    {
      title: 'אחוז פתרון',
      value: stats.resolutionRate,
      change: '+2.1%',
      icon: CheckCircle2,
      color: 'green',
    },
    {
      title: 'פניות חדשות היום',
      value: tickets.filter(t => 
        new Date(t.createdAt).toDateString() === new Date().toDateString()
      ).length.toString(),
      change: '+33.3%',
      icon: TrendingUp,
      color: 'indigo',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">דוחות וסטטיסטיקות</h2>
        <div className="flex gap-2">
          <select className="p-2 border border-gray-300 rounded-lg text-sm">
            <option value="7">7 ימים אחרונים</option>
            <option value="30">30 ימים אחרונים</option>
            <option value="90">90 ימים אחרונים</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            ייצוא דוח
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}