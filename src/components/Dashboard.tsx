import React from 'react';
import { BarChart3, Users, TrendingUp, Award, AlertTriangle, Calendar } from 'lucide-react';
import { getPerformanceMetrics } from '../data/mockData';

const Dashboard: React.FC = () => {
  const metrics = getPerformanceMetrics();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Academic Year 2024-25</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.totalStudents}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Grade</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.averageGrade.toFixed(1)}%</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.attendanceRate.toFixed(1)}%</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Top Performers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metrics.topPerformers.length}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject Performance</h2>
          <div className="space-y-4">
            {metrics.subjectPerformance.map((subject: any) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{subject.subject}</span>
                  <span className="text-sm font-semibold text-gray-900">{subject.averageScore.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(subject.averageScore, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{subject.totalAssignments} assignments</span>
                  <span>{subject.passRate.toFixed(1)}% pass rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Insights</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-1">Top Performers</h3>
                  <div className="space-y-1">
                    {metrics.topPerformers.map((student: any) => (
                      <p key={student._id} className="text-sm text-emerald-800">
                        {student.name} - {student.average.toFixed(1)}%
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {metrics.improvementNeeded.length > 0 && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-1">Needs Improvement</h3>
                    <div className="space-y-1">
                      {metrics.improvementNeeded.map((student: any) => (
                        <p key={student._id} className="text-sm text-orange-800">
                          {student.name} - {student.average.toFixed(1)}%
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;