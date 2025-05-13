import React from 'react';
import { BarChart, BookOpen, Award, GraduationCap } from 'lucide-react';
import { courses, progress } from '../../data/mockData';

const ProgressPage: React.FC = () => {
  // Calculate overall progress stats
  const overallProgress = progress.reduce((acc, curr) => acc + curr.overallProgress, 0) / progress.length;
  const completedModules = progress.reduce((acc, curr) => acc + curr.modulesCompleted, 0);
  const totalExercisesCompleted = progress.reduce((acc, curr) => acc + curr.exercisesCompleted, 0);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Learning Progress</h1>
      
      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Progress</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{Math.round(overallProgress)}%</p>
            </div>
            <div className="rounded-md bg-blue-50 p-3">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Courses Enrolled</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{courses.length}</p>
            </div>
            <div className="rounded-md bg-green-50 p-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {completedModules} modules completed
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Exercises Completed</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalExercisesCompleted}</p>
            </div>
            <div className="rounded-md bg-purple-50 p-3">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            82% average score
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Achievements</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">12</p>
            </div>
            <div className="rounded-md bg-orange-50 p-3">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            3 new this month
          </div>
        </div>
      </div>
      
      {/* Course Progress Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {courses.map((course, index) => {
            // Find progress data for this course
            const courseProgress = progress.find(p => p.courseId === course.id);
            const progressPercentage = courseProgress ? courseProgress.overallProgress : 0;
            
            return (
              <div 
                key={course.id} 
                className={`p-4 ${index !== courses.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                      <p className="text-xs text-gray-500">
                        {courseProgress ? `${courseProgress.modulesCompleted} of ${course.totalModules} modules completed` : 'Not started'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{Math.round(progressPercentage)}%</div>
                </div>
                
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <div>Last accessed: {courseProgress ? new Date(courseProgress.lastAccessed).toLocaleDateString() : 'Never'}</div>
                  <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                    Continue Learning
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Recent Grades */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercise
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {progress.flatMap(p => 
                p.grades.map(grade => (
                  <tr key={`${p.userId}-${grade.exerciseId}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Exercise {grade.exerciseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Course {p.courseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(grade.completedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          (grade.score / grade.totalPoints) >= 0.8 
                            ? 'bg-green-100 text-green-800' 
                            : (grade.score / grade.totalPoints) >= 0.6 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {grade.score}/{grade.totalPoints} ({Math.round((grade.score / grade.totalPoints) * 100)}%)
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;