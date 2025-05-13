import React from 'react';
import { BarChart3, Users, BookOpen, Clock } from 'lucide-react';
import { courses, progress, currentUser } from '../../data/mockData';
import CourseCard from '../courses/CourseCard';

const DashboardPage: React.FC = () => {
  const recentCourses = courses.slice(0, 3);
  
  // Calculate stats based on role
  const isTeacher = currentUser.role === 'teacher' || currentUser.role === 'admin';
  
  const stats = [
    {
      id: 1,
      title: isTeacher ? 'Total Students' : 'Enrolled Courses',
      value: isTeacher ? '428' : '3',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      change: '+5%',
      trend: 'up',
    },
    {
      id: 2,
      title: isTeacher ? 'Active Courses' : 'Completed Courses',
      value: isTeacher ? courses.length.toString() : '1',
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      change: '+2%',
      trend: 'up',
    },
    {
      id: 3,
      title: isTeacher ? 'Course Completion' : 'Average Progress',
      value: isTeacher ? '76%' : '58%',
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
      change: '+12%',
      trend: 'up',
    },
    {
      id: 4,
      title: 'Avg. Learning Time',
      value: isTeacher ? '45 min' : '32 min',
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      change: '+8%',
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-5 transition-all hover:shadow-md">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="rounded-md bg-blue-50 p-3">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="ml-2 text-xs text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity / Courses Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {isTeacher ? 'Your Courses' : 'Recently Accessed Courses'}
          </h2>
          <a href="#view-all" className="text-sm font-medium text-blue-600 hover:text-blue-800">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {isTeacher 
                        ? `Student Alex completed Module 3 in Advanced Data Structures` 
                        : `You completed Quiz 2 in Introduction to Programming`}
                    </p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;