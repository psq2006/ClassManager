import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { courses } from '../../data/mockData';
import CourseCard from './CourseCard';
import { Course } from '../../types';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-md flex items-center space-x-1 hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
            
            <div className="border border-gray-300 rounded-md flex">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + New Course
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {['all', 'programming', 'data structures', 'web'].map(category => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === category 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Courses Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </div>
      )}
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

interface CourseListItemProps {
  course: Course;
}

const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex hover:shadow-md transition-shadow">
      <div className="w-40 min-w-40 h-auto overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-1">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
              View
            </button>
            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors">
              Details
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{course.durationHours} hours</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1" />
            <span>{course.totalModules} modules</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{course.enrolledStudents} students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;