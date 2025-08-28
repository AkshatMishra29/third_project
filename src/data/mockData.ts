import { Student, Grade, AttendanceRecord } from '../types/Student';

export const mockStudents: Student[] = [
  {
    _id: '1',
    studentId: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    class: '10th Grade',
    section: 'A',
    enrollmentDate: '2024-09-01',
    profile: {
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+1-555-0123',
      parentContact: '+1-555-0124'
    },
    grades: [
      { subject: 'Mathematics', assignment: 'Mid-term Exam', maxMarks: 100, obtainedMarks: 92, percentage: 92, grade: 'A', date: '2024-10-15', category: 'exam' },
      { subject: 'Mathematics', assignment: 'Assignment 1', maxMarks: 50, obtainedMarks: 45, percentage: 90, grade: 'A', date: '2024-10-01', category: 'assignment' },
      { subject: 'Science', assignment: 'Lab Report', maxMarks: 30, obtainedMarks: 28, percentage: 93, grade: 'A', date: '2024-10-10', category: 'project' },
      { subject: 'English', assignment: 'Essay Writing', maxMarks: 25, obtainedMarks: 22, percentage: 88, grade: 'B+', date: '2024-10-05', category: 'assignment' },
      { subject: 'History', assignment: 'Quiz 1', maxMarks: 20, obtainedMarks: 18, percentage: 90, grade: 'A', date: '2024-09-28', category: 'quiz' }
    ],
    attendance: [
      { date: '2024-11-01', status: 'present' },
      { date: '2024-10-31', status: 'present' },
      { date: '2024-10-30', status: 'present' }
    ],
    createdAt: '2024-09-01',
    updatedAt: '2024-11-01'
  },
  {
    _id: '2',
    studentId: 'STU002',
    name: 'Bob Smith',
    email: 'bob.smith@school.edu',
    class: '10th Grade',
    section: 'A',
    enrollmentDate: '2024-09-01',
    profile: {
      avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+1-555-0125',
      parentContact: '+1-555-0126'
    },
    grades: [
      { subject: 'Mathematics', assignment: 'Mid-term Exam', maxMarks: 100, obtainedMarks: 78, percentage: 78, grade: 'B', date: '2024-10-15', category: 'exam' },
      { subject: 'Mathematics', assignment: 'Assignment 1', maxMarks: 50, obtainedMarks: 38, percentage: 76, grade: 'B', date: '2024-10-01', category: 'assignment' },
      { subject: 'Science', assignment: 'Lab Report', maxMarks: 30, obtainedMarks: 24, percentage: 80, grade: 'B', date: '2024-10-10', category: 'project' },
      { subject: 'English', assignment: 'Essay Writing', maxMarks: 25, obtainedMarks: 20, percentage: 80, grade: 'B', date: '2024-10-05', category: 'assignment' },
      { subject: 'History', assignment: 'Quiz 1', maxMarks: 20, obtainedMarks: 15, percentage: 75, grade: 'B', date: '2024-09-28', category: 'quiz' }
    ],
    attendance: [
      { date: '2024-11-01', status: 'present' },
      { date: '2024-10-31', status: 'absent' },
      { date: '2024-10-30', status: 'present' }
    ],
    createdAt: '2024-09-01',
    updatedAt: '2024-11-01'
  },
  {
    _id: '3',
    studentId: 'STU003',
    name: 'Carol Davis',
    email: 'carol.davis@school.edu',
    class: '10th Grade',
    section: 'B',
    enrollmentDate: '2024-09-01',
    profile: {
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+1-555-0127',
      parentContact: '+1-555-0128'
    },
    grades: [
      { subject: 'Mathematics', assignment: 'Mid-term Exam', maxMarks: 100, obtainedMarks: 85, percentage: 85, grade: 'B+', date: '2024-10-15', category: 'exam' },
      { subject: 'Mathematics', assignment: 'Assignment 1', maxMarks: 50, obtainedMarks: 42, percentage: 84, grade: 'B+', date: '2024-10-01', category: 'assignment' },
      { subject: 'Science', assignment: 'Lab Report', maxMarks: 30, obtainedMarks: 26, percentage: 87, grade: 'B+', date: '2024-10-10', category: 'project' },
      { subject: 'English', assignment: 'Essay Writing', maxMarks: 25, obtainedMarks: 23, percentage: 92, grade: 'A', date: '2024-10-05', category: 'assignment' },
      { subject: 'History', assignment: 'Quiz 1', maxMarks: 20, obtainedMarks: 17, percentage: 85, grade: 'B+', date: '2024-09-28', category: 'quiz' }
    ],
    attendance: [
      { date: '2024-11-01', status: 'present' },
      { date: '2024-10-31', status: 'present' },
      { date: '2024-10-30', status: 'late' }
    ],
    createdAt: '2024-09-01',
    updatedAt: '2024-11-01'
  },
  {
    _id: '4',
    studentId: 'STU004',
    name: 'David Wilson',
    email: 'david.wilson@school.edu',
    class: '10th Grade',
    section: 'B',
    enrollmentDate: '2024-09-01',
    profile: {
      avatar: 'https://images.pexels.com/photos/3771511/pexels-photo-3771511.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      phone: '+1-555-0129',
      parentContact: '+1-555-0130'
    },
    grades: [
      { subject: 'Mathematics', assignment: 'Mid-term Exam', maxMarks: 100, obtainedMarks: 65, percentage: 65, grade: 'C', date: '2024-10-15', category: 'exam' },
      { subject: 'Mathematics', assignment: 'Assignment 1', maxMarks: 50, obtainedMarks: 30, percentage: 60, grade: 'C', date: '2024-10-01', category: 'assignment' },
      { subject: 'Science', assignment: 'Lab Report', maxMarks: 30, obtainedMarks: 20, percentage: 67, grade: 'C', date: '2024-10-10', category: 'project' },
      { subject: 'English', assignment: 'Essay Writing', maxMarks: 25, obtainedMarks: 18, percentage: 72, grade: 'B-', date: '2024-10-05', category: 'assignment' },
      { subject: 'History', assignment: 'Quiz 1', maxMarks: 20, obtainedMarks: 12, percentage: 60, grade: 'C', date: '2024-09-28', category: 'quiz' }
    ],
    attendance: [
      { date: '2024-11-01', status: 'absent' },
      { date: '2024-10-31', status: 'present' },
      { date: '2024-10-30', status: 'present' }
    ],
    createdAt: '2024-09-01',
    updatedAt: '2024-11-01'
  }
];

export const getPerformanceMetrics = (): any => {
  const totalStudents = mockStudents.length;
  const allGrades = mockStudents.flatMap(student => student.grades);
  const averageGrade = allGrades.reduce((sum, grade) => sum + grade.percentage, 0) / allGrades.length;
  
  const presentDays = mockStudents.flatMap(student => 
    student.attendance.filter(record => record.status === 'present')
  ).length;
  
  const totalAttendanceRecords = mockStudents.flatMap(student => student.attendance).length;
  const attendanceRate = (presentDays / totalAttendanceRecords) * 100;
  
  const studentAverages = mockStudents.map(student => ({
    ...student,
    average: student.grades.reduce((sum, grade) => sum + grade.percentage, 0) / student.grades.length
  }));
  
  const topPerformers = studentAverages
    .filter(student => student.average >= 85)
    .sort((a, b) => b.average - a.average)
    .slice(0, 3);
  
  const improvementNeeded = studentAverages
    .filter(student => student.average < 75)
    .sort((a, b) => a.average - b.average)
    .slice(0, 3);
  
  const subjects = ['Mathematics', 'Science', 'English', 'History'];
  const subjectPerformance = subjects.map(subject => {
    const subjectGrades = allGrades.filter(grade => grade.subject === subject);
    const averageScore = subjectGrades.reduce((sum, grade) => sum + grade.percentage, 0) / subjectGrades.length;
    const passRate = (subjectGrades.filter(grade => grade.percentage >= 60).length / subjectGrades.length) * 100;
    
    return {
      subject,
      averageScore,
      totalAssignments: subjectGrades.length,
      passRate
    };
  });
  
  return {
    totalStudents,
    averageGrade,
    attendanceRate,
    topPerformers,
    improvementNeeded,
    subjectPerformance
  };
};