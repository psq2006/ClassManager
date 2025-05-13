import { User, Course, Resource, Exercise, Progress } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const courses: Course[] = [
  {
    id: '101',
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with this beginner-friendly course.',
    teacherId: '1',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalModules: 8,
    durationHours: 24,
    enrolledStudents: 126,
    tags: ['programming', 'beginner', 'fundamentals'],
    createdAt: '2023-09-15T10:30:00Z',
  },
  {
    id: '102',
    title: 'Advanced Data Structures',
    description: 'Master complex data structures and algorithms for efficient programming.',
    teacherId: '1',
    thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalModules: 12,
    durationHours: 36,
    enrolledStudents: 87,
    tags: ['data structures', 'algorithms', 'advanced'],
    createdAt: '2023-10-02T14:15:00Z',
  },
  {
    id: '103',
    title: 'Web Development Fundamentals',
    description: 'Build your first website with HTML, CSS, and JavaScript.',
    teacherId: '1',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    totalModules: 10,
    durationHours: 30,
    enrolledStudents: 215,
    tags: ['web', 'html', 'css', 'javascript'],
    createdAt: '2023-08-20T09:45:00Z',
  },
];

export const resources: Resource[] = [
  {
    id: '201',
    title: 'Programming Fundamentals PDF',
    description: 'A comprehensive guide to programming basics.',
    type: 'document',
    url: '/resources/programming_fundamentals.pdf',
    courseId: '101',
    createdAt: '2023-09-16T11:20:00Z',
    size: '2.4 MB',
  },
  {
    id: '202',
    title: 'Introduction to Variables',
    description: 'Video tutorial explaining variables and data types.',
    type: 'video',
    url: '/resources/intro_variables.mp4',
    courseId: '101',
    createdAt: '2023-09-17T13:45:00Z',
    duration: '18:32',
  },
  {
    id: '203',
    title: 'Algorithm Complexity Analysis',
    description: 'Presentation on Big O notation and algorithm analysis.',
    type: 'presentation',
    url: '/resources/algorithm_complexity.pptx',
    courseId: '102',
    createdAt: '2023-10-05T15:30:00Z',
    size: '4.1 MB',
  },
];

export const exercises: Exercise[] = [
  {
    id: '301',
    title: 'Programming Basics Quiz',
    description: 'Test your knowledge of programming fundamentals.',
    courseId: '101',
    questions: [
      {
        id: '1',
        text: 'What is a variable?',
        type: 'multiple-choice',
        options: [
          'A container for storing data values',
          'A mathematical function',
          'A programming language',
          'A hardware component',
        ],
        correctAnswer: 'A container for storing data values',
        points: 5,
      },
      {
        id: '2',
        text: 'Is JavaScript a compiled language?',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswer: 'False',
        points: 5,
      },
    ],
    dueDate: '2023-09-30T23:59:59Z',
    totalPoints: 10,
    timeLimit: 15,
    createdAt: '2023-09-20T10:00:00Z',
  },
  {
    id: '302',
    title: 'Data Structures Assessment',
    description: 'Practical assessment on implementing data structures.',
    courseId: '102',
    questions: [
      {
        id: '1',
        text: 'Explain the difference between an array and a linked list.',
        type: 'short-answer',
        correctAnswer: ['memory allocation', 'contiguous', 'pointers', 'dynamic'],
        points: 10,
      },
      {
        id: '2',
        text: 'Which data structure operates on a LIFO principle?',
        type: 'multiple-choice',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 'Stack',
        points: 5,
      },
    ],
    dueDate: '2023-10-15T23:59:59Z',
    totalPoints: 15,
    timeLimit: 30,
    createdAt: '2023-10-08T09:30:00Z',
  },
];

export const progress: Progress[] = [
  {
    userId: '2',
    courseId: '101',
    modulesCompleted: 5,
    exercisesCompleted: 3,
    lastAccessed: '2023-09-25T18:30:00Z',
    overallProgress: 62.5,
    grades: [
      {
        exerciseId: '301',
        score: 8,
        totalPoints: 10,
        completedAt: '2023-09-22T14:45:00Z',
      },
    ],
  },
  {
    userId: '3',
    courseId: '101',
    modulesCompleted: 7,
    exercisesCompleted: 4,
    lastAccessed: '2023-09-24T20:15:00Z',
    overallProgress: 87.5,
    grades: [
      {
        exerciseId: '301',
        score: 10,
        totalPoints: 10,
        completedAt: '2023-09-21T16:20:00Z',
      },
    ],
  },
  {
    userId: '2',
    courseId: '102',
    modulesCompleted: 3,
    exercisesCompleted: 1,
    lastAccessed: '2023-10-10T12:45:00Z',
    overallProgress: 25,
    grades: [
      {
        exerciseId: '302',
        score: 12,
        totalPoints: 15,
        completedAt: '2023-10-09T17:30:00Z',
      },
    ],
  },
];

export const currentUser: User = users[0]; // Default to first user (teacher)

export const setCurrentUser = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    return user;
  }
  return currentUser;
};