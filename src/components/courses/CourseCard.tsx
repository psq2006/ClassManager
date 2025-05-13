import React from 'react';
import { Clock, Users, BookOpen } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags?.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
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
            <span>{course.enrolledStudents}</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-between">
        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
          View Course
        </button>
        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors">
          Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;