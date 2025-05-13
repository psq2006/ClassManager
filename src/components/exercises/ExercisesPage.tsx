import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, Award } from 'lucide-react';
import { exercises } from '../../data/mockData';
import { Exercise } from '../../types';

const ExercisesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredExercises = exercises.filter(exercise => 
    exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status calculation would normally use real data from the user's progress
  const getExerciseStatus = (exercise: Exercise): 'completed' | 'pending' | 'overdue' => {
    const dueDate = exercise.dueDate ? new Date(exercise.dueDate) : null;
    const now = new Date();
    
    // Mocking a random completion status for demo purposes
    const randomStatus = Math.random() > 0.6;
    
    if (randomStatus) return 'completed';
    if (dueDate && dueDate < now) return 'overdue';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Exercises</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search exercises..."
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
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + New Exercise
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Exercises' },
          { id: 'pending', label: 'Pending', icon: <Clock size={14} className="mr-1" /> },
          { id: 'completed', label: 'Completed', icon: <CheckCircle size={14} className="mr-1" /> },
          { id: 'overdue', label: 'Overdue', icon: <Clock size={14} className="mr-1 text-red-500" /> },
        ].map(filter => (
          <button
            key={filter.id}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              statusFilter === filter.id 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setStatusFilter(filter.id)}
          >
            {filter.icon}
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
      
      {/* Exercises */}
      <div className="space-y-4">
        {filteredExercises.map(exercise => {
          const status = getExerciseStatus(exercise);
          
          // Filter by status if not 'all'
          if (statusFilter !== 'all' && status !== statusFilter) return null;
          
          return (
            <div key={exercise.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  </div>
                  <div className="flex items-center">
                    {status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" />
                        Completed
                      </span>
                    )}
                    {status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Clock size={14} className="mr-1" />
                        Pending
                      </span>
                    )}
                    {status === 'overdue' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <Clock size={14} className="mr-1" />
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Course: </span>
                    <span>Course {exercise.courseId}</span>
                  </div>
                  <div>
                    <span className="font-medium">Due: </span>
                    <span>{exercise.dueDate ? new Date(exercise.dueDate).toLocaleDateString() : 'No deadline'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Points: </span>
                    <span>{exercise.totalPoints} pts</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Questions: </span>
                  <span>{exercise.questions.length} questions</span>
                  {exercise.timeLimit && (
                    <span className="ml-4">
                      <span className="font-medium">Time Limit: </span>
                      <span>{exercise.timeLimit} min</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 flex justify-between">
                <div>
                  {status === 'completed' ? (
                    <div className="flex items-center text-green-700">
                      <Award size={16} className="mr-1" /> 
                      <span className="text-sm font-medium">Score: 85%</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {exercise.questions.length} questions
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    {status === 'completed' ? 'Review' : 'Start'}
                  </button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No exercises found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;