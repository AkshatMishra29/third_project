export interface Student {
  _id?: string;
  studentId: string;
  name: string;
  email: string;
  class: string;
  section: string;
  enrollmentDate: string;
  grades: Grade[];
  attendance: AttendanceRecord[];
  profile: {
    avatar?: string;
    phone?: string;
    address?: string;
    parentContact?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  _id?: string;
  subject: string;
  assignment: string;
  maxMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  date: string;
  category: 'exam' | 'assignment' | 'quiz' | 'project';
}

export interface AttendanceRecord {
  _id?: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject?: string;
}

export interface PerformanceMetrics {
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  topPerformers: Student[];
  improvementNeeded: Student[];
  subjectPerformance: SubjectPerformance[];
}

export interface SubjectPerformance {
  subject: string;
  averageScore: number;
  totalAssignments: number;
  passRate: number;
}