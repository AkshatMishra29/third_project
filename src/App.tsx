import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudent from './components/AddStudent';
import { Student } from './types/Student';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedStudent(null);
    setShowAddStudent(false);
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveView('student-detail');
  };

  const handleAddStudent = () => {
    setShowAddStudent(true);
    setActiveView('add-student');
  };

  const handleSaveStudent = (studentData: Omit<Student, '_id'>) => {
    // In a real app, this would save to MongoDB
    console.log('Saving student:', studentData);
    
    // For demo purposes, just go back to the student list
    setShowAddStudent(false);
    setActiveView('students');
    
    // You could show a success message here
    alert('Student added successfully! (This would be saved to MongoDB in production)');
  };

  const handleBack = () => {
    if (activeView === 'student-detail') {
      setSelectedStudent(null);
      setActiveView('students');
    } else if (activeView === 'add-student') {
      setShowAddStudent(false);
      setActiveView('students');
    }
  };

  const renderContent = () => {
    if (activeView === 'student-detail' && selectedStudent) {
      return <StudentDetail student={selectedStudent} onBack={handleBack} />;
    }
    
    if (activeView === 'add-student') {
      return <AddStudent onBack={handleBack} onSave={handleSaveStudent} />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList onSelectStudent={handleSelectStudent} onAddStudent={handleAddStudent} />;
      case 'analytics':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h2>
              <p className="text-gray-600 mb-6">Detailed analytics and reporting features would be implemented here.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Performance Trends</h3>
                  <p className="text-blue-700 text-sm">Track student performance over time with interactive charts</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-lg">
                  <h3 className="font-semibold text-emerald-900 mb-2">Predictive Analytics</h3>
                  <p className="text-emerald-700 text-sm">Identify students at risk and suggest interventions</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Custom Reports</h3>
                  <p className="text-purple-700 text-sm">Generate detailed reports for parents and administrators</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600 mb-6">Application settings and configuration options.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="p-6 bg-gray-50 rounded-lg text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Database Connection</h3>
                  <p className="text-gray-700 text-sm mb-3">MongoDB connection settings and configuration</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Configure MongoDB</button>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">User Preferences</h3>
                  <p className="text-gray-700 text-sm mb-3">Customize the interface and notification settings</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit Preferences</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeView={activeView} onViewChange={handleViewChange} />
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;