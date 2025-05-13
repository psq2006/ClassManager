export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  thumbnail: string;
  totalModules: number;
  durationHours: number;
  enrolledStudents?: number;
  tags?: string[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'presentation' | 'link';
  url: string;
  courseId: string;
  createdAt: string;
  size?: string;
  duration?: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  courseId: string;
  questions: Question[];
  dueDate?: string;
  totalPoints: number;
  timeLimit?: number;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Progress {
  userId: string;
  courseId: string;
  modulesCompleted: number;
  exercisesCompleted: number;
  lastAccessed: string;
  overallProgress: number;
  grades: {
    exerciseId: string;
    score: number;
    totalPoints: number;
    completedAt: string;
  }[];
}