import React, { useState } from 'react';
import { Search, Filter, FileText, Video, Link, PlusCircle, Presentation as FilePresentation } from 'lucide-react';
import { resources } from '../../data/mockData';
import { Resource } from '../../types';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? resource.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'presentation':
        return <FilePresentation className="h-5 w-5 text-orange-600" />;
      case 'link':
        return <Link className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
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
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <PlusCircle size={18} className="mr-1" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter by Type */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: null, label: 'All', icon: null },
          { id: 'document', label: 'Documents', icon: <FileText size={14} /> },
          { id: 'video', label: 'Videos', icon: <Video size={14} /> },
          { id: 'presentation', label: 'Presentations', icon: <FilePresentation size={14} /> },
          { id: 'link', label: 'Links', icon: <Link size={14} /> },
        ].map(type => (
          <button
            key={type.id?.toString() || 'all'}
            className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
              selectedType === type.id 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            {type.icon && <span>{type.icon}</span>}
            <span>{type.label}</span>
          </button>
        ))}
      </div>
      
      {/* Resources List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Added
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResources.map((resource) => (
              <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{resource.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">
                    {/* This would use course.title, but for simplicity we'll use courseId */}
                    Course {resource.courseId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-500">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {resource.type === 'video' && resource.duration && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {resource.duration}
                    </span>
                  )}
                  {(resource.type === 'document' || resource.type === 'presentation') && resource.size && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {resource.size}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={resource.url} className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No resources found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;