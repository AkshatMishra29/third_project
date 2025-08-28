import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Student, Grade } from '../types/Student';

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'grades' | 'attendance'>('overview');

  const getAverageGrade = () => {
    if (student.grades.length === 0) return 0;
    return student.grades.reduce((sum, grade) => sum + grade.percentage, 0) / student.grades.length;
  };

  const getSubjectAverages = () => {
    const subjects: { [key: string]: { total: number; count: number } } = {};
    
    student.grades.forEach(grade => {
      if (!subjects[grade.subject]) {
        subjects[grade.subject] = { total: 0, count: 0 };
      }
      subjects[grade.subject].total += grade.percentage;
      subjects[grade.subject].count += 1;
    });

    return Object.entries(subjects).map(([subject, data]) => ({
      subject,
      average: data.total / data.count
    }));
  };

  const getAttendanceStats = () => {
    const total = student.attendance.length;
    const present = student.attendance.filter(record => record.status === 'present').length;
    const absent = student.attendance.filter(record => record.status === 'absent').length;
    const late = student.attendance.filter(record => record.status === 'late').length;
    
    return {
      total,
      present,
      absent,
      late,
      presentRate: total > 0 ? (present / total) * 100 : 0
    };
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBadgeColor = (grade: string) => {
    const gradeMap: { [key: string]: string } = {
      'A': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'B+': 'bg-blue-100 text-blue-800 border-blue-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'B-': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'D': 'bg-orange-100 text-orange-800 border-orange-200',
      'F': 'bg-red-100 text-red-800 border-red-200'
    };
    return gradeMap[grade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const averageGrade = getAverageGrade();
  const subjectAverages = getSubjectAverages();
  const attendanceStats = getAttendanceStats();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Students</span>
        </button>
      </div>

      {/* Student Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <img
            src={student.profile.avatar || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
            alt={student.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{student.studentId}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{student.class} - {student.section}</span>
              </div>
              {student.profile.phone && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{student.profile.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="text-3xl font-bold text-gray-900">{averageGrade.toFixed(1)}%</div>
            <div className="text-gray-600 text-sm">Overall Average</div>
            <div className={`text-sm font-semibold mt-1 ${getGradeColor(averageGrade)}`}>
              {averageGrade >= 90 ? 'Excellent' : averageGrade >= 80 ? 'Good' : averageGrade >= 70 ? 'Average' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'grades'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Grades
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'attendance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attendance
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Subject Performance
            </h2>
            <div className="space-y-4">
              {subjectAverages.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                    <span className={`text-sm font-semibold ${getGradeColor(subject.average)}`}>
                      {subject.average.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(subject.average, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{student.grades.length}</div>
                <div className="text-sm text-gray-600">Total Grades</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{attendanceStats.presentRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Attendance</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{subjectAverages.length}</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {student.grades.filter(g => g.category === 'exam').length}
                </div>
                <div className="text-sm text-gray-600">Exams</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'grades' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Grade History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Subject</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Assignment</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Score</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Grade</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {student.grades
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{grade.subject}</td>
                    <td className="py-4 px-6 text-gray-700">{grade.assignment}</td>
                    <td className="py-4 px-6">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                        {grade.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${getGradeColor(grade.percentage)}`}>
                        {grade.obtainedMarks}/{grade.maxMarks} ({grade.percentage}%)
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getBadgeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {new Date(grade.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.present}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.absent}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.late}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{attendanceStats.presentRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Attendance Rate</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Attendance History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-900">Subject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student.attendance
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-700">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          record.status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        {record.subject || 'All Subjects'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;