import React, { useState } from 'react';
import { 
  CameraIcon, 
  FileTextIcon, 
  BellIcon, 
  HomeIcon,
  UsersIcon,
  SettingsIcon,
} from 'lucide-react';

// AI Attendance Capture Component
const AIAttendanceCapture = ({ onAttendanceCaptured }) => {
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadStatus('');
      setUploadError('');
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return;

    try {
      setIsSubmitting(true);
      setUploadStatus('Uploading...');
      setUploadError('');

      const formData = new FormData();
      formData.append('image_data', imageFile);

      const response = await fetch('http://localhost:8000/upload-photo/', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically for FormData
        mode: 'cors',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || 
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      setUploadStatus('Upload successful!');
      console.log('Upload result:', result);

      // Simulate AI processing
      const generatedAttendanceRecords = [];
      onAttendanceCaptured(generatedAttendanceRecords);
      
      // Clear the image after successful upload
      setImageFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(
        error instanceof Error 
          ? error.message 
          : 'Failed to connect to the server. Please ensure the backend is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-full">
      <div className="flex items-center justify-center mb-4">
        <CameraIcon className="w-16 h-16 text-purple-600" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">AI Attendance Capture</h3>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="w-full p-2 border rounded text-gray-700 focus:ring-2 focus:ring-purple-500"
        />
        {imageFile && (
          <div className="w-full">
            <img 
              src={URL.createObjectURL(imageFile)} 
              alt="Uploaded" 
              className="max-w-full h-auto rounded mt-4 shadow-md"
            />
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Submit Image'}
            </button>
          </div>
        )}
        {uploadStatus && (
          <p className="text-green-600 font-medium">{uploadStatus}</p>
        )}
        {uploadError && (
          <p className="text-red-600 font-medium">{uploadError}</p>
        )}
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNavigation = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { icon: HomeIcon, label: 'Home', value: 'home' },
    { icon: UsersIcon, label: 'Students', value: 'students' },
    { icon: SettingsIcon, label: 'Settings', value: 'settings' }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="grid grid-cols-3">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => handleTabClick(item.value)}
            className={`flex flex-col items-center justify-center p-3 ${
              activeTab === item.value 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Notification System Component
const NotificationSystem = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [students] = useState([]);

  const sendNotification = () => {
    if (selectedStudents.length && message) {
      // Simulate notification sending
      console.log('Sending notifications', { students: selectedStudents, message });
      alert('Notifications sent successfully!');
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded flex items-center justify-center"
      >
        <BellIcon className="mr-2" /> Send Notifications
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Send Parent Notifications</h2>
            <div className="space-y-4">
              <select 
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                  setSelectedStudents(selected);
                }}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <input 
                type="text"
                placeholder="Notification Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex space-x-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gray-200 text-gray-800 p-2 rounded"
                >
                  Cancel
                </button>
                <button 
                  onClick={sendNotification}
                  disabled={!selectedStudents.length || !message}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Teacher Dashboard
const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('12A');
  // Removed unused currentPage state

  const handleNavigate = (page) => {
    console.log(`Navigated to: ${page}`);
  };

  return (
    <div className="p-6 pb-20 space-y-6 min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Teacher Dashboard - <span className="text-purple-600">{selectedClass}</span>
      </h1>
      
      <select 
        value={selectedClass} 
        onChange={(e) => setSelectedClass(e.target.value)}
        className="w-[180px] mb-6 p-2 border rounded focus:ring-2 focus:ring-purple-500"
      >
        <option value="12A">12A</option>
        <option value="12B">12B</option>
        <option value="11A">11A</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIAttendanceCapture 
          onAttendanceCaptured={() => {}} 
        />
        
        <div className="flex flex-col bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex-grow flex flex-col space-y-4 justify-center">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded flex items-center justify-center">
                <FileTextIcon className="mr-2" /> Generate Report
              </button>
              <NotificationSystem />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation onNavigate={handleNavigate} />
    </div>
  );
};

export default TeacherDashboard;