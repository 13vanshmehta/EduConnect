import React, { useEffect, useState } from "react";
import { HomeIcon, UsersIcon, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/get-attendance") // Change URL if needed
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        const processedData = processAttendanceData(data);
        setStudents(processedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to merge attendance only for duplicate roll numbers
  const processAttendanceData = (data) => {
    const attendanceMap = new Map();

    data.forEach(({ RollNo, Name, IsPresent }) => {
      if (!attendanceMap.has(RollNo)) {
        attendanceMap.set(RollNo, {
          RollNo,
          Name,
          totalLectures: 0,
          attended: 0,
        });
      }
      let student = attendanceMap.get(RollNo);
      student.totalLectures += 1;
      if (IsPresent === true) student.attended += 1;
    });

    return [...attendanceMap.values()].map((student) => ({
      ...student,
      percentage: ((student.attended / student.totalLectures) * 100).toFixed(2),
    }));
  };

  // Function to filter students based on attendance percentage
  const filteredStudents = students.filter((student) => {
    const percentage = parseFloat(student.percentage);
    if (filter === "100") return percentage === 100;
    if (filter === "75") return percentage >= 75 && percentage < 100;
    if (filter === "less75") return percentage < 75;
    return true; // Show all
  });

  // Function to export attendance data as CSV
  const exportToCSV = () => {
    const headers = "Roll No,Name,Total Lectures,Attended,Percentage\n";
    const rows = students
      .map(student => `${student.RollNo},${student.Name},${student.totalLectures},${student.attended},${student.percentage}%`)
      .join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4 pb-16 pt-21">
      <h2 className="text-4xl font-bold text-center mb-4">STUDENT ATTENDANCE</h2>
      
      {/* Filter Options */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-semibold">Filter by Attendance:</label>
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="100">100%</option>
          <option value="75">≥ 75%</option>
          <option value="less75">&lt; 75%</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2 border">Roll No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Total Lectures</th>
              <th className="p-2 border">Attended</th>
              <th className="p-2 border">Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.RollNo} className="text-center bg-gray-100">
                  <td className="p-2 border">{student.RollNo}</td>
                  <td className="p-2 border">{student.Name}</td>
                  <td className="p-2 border">{student.totalLectures}</td>
                  <td className="p-2 border">{student.attended}</td>
                  <td className="p-2 border">{student.percentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="text-center mt-4">
        <button onClick={exportToCSV} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
          Export CSV
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 flex justify-around border-t">
        <button onClick={() => navigate("/teacher/dashboard")} className="flex flex-col items-center text-purple-600 font-bold">
          <HomeIcon size={24} />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/teacher/students")} className="flex flex-col items-center text-gray-600 font-bold">
          <UsersIcon size={24} />
          <span>Students</span>
        </button>
        <button onClick={() => navigate("/teacher/settings")} className="flex flex-col items-center text-gray-600 font-bold">
          <SettingsIcon size={24} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default StudentAttendance;