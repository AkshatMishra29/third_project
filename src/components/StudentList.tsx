import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Mail, Phone, CalendarDays } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { Student } from '../types/Student';

interface StudentListProps {
  onSelectStudent: (student: Student) => void;
  onAddStudent: () => void;
}

const StudentList: React.FC<StudentListProps> = ({ onSelectStudent, onAddStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || student.class === selectedClass;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  const getAverageGrade = (student: Student) => {
    if (student.grades.length === 0) return 0;
    return student.grades.reduce((sum, grade) => sum + grade.percentage, 0) / student.grades.length;
  };

  const getGradeBadgeColor = (average: number) => {
    if (average >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (average >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (average >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (average >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getGradeLabel = (average: number) => {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <button
          onClick={onAddStudent}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Classes</option>
              <option value="10th Grade">10th Grade</option>
              <option value="11th Grade">11th Grade</option>
              <option value="12th Grade">12th Grade</option>
            </select>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const averageGrade = getAverageGrade(student);
          const attendanceRate = (student.attendance.filter(record => record.status === 'present').length / student.attendance.length) * 100;
          
          return (
            <div key={student._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={student.profile.avatar || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                  <p className="text-gray-600 text-sm">{student.studentId}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {student.class} - {student.section}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Average Grade</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getGradeBadgeColor(averageGrade)}`}>
                    {getGradeLabel(averageGrade)} ({averageGrade.toFixed(1)}%)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Attendance</span>
                  <span className="text-sm font-semibold text-gray-900">{attendanceRate.toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Assignments</span>
                  <span className="text-sm font-semibold text-gray-900">{student.grades.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {student.email && (
                    <a href={`mailto:${student.email}`} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {student.profile.phone && (
                    <a href={`tel:${student.profile.phone}`} className="text-gray-400 hover:text-emerald-600 transition-colors">
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => onSelectStudent(student)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">No students found</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;