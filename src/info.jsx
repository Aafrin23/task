import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { signOut } from 'firebase/auth'
import auth from './config/firebase'

function Studentinfo(){

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        course: '',
        email: ''
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        fetchStudents();
    }, []);

    // Function to fetch students from the backend
    function fetchStudents() {
        fetch('http://localhost:5000/students')
            .then(response => response.json())
            .then(data => {
              console.log(data)
              setStudents(data)})
            .catch(error => console.error('Error fetching students:', error));
    }

     // Function to handle changes in form input fields
     function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Function to handle saving the new student to the backend
    function handleSave(e) {
        e.preventDefault();

        // Send POST request to save student
        
        if (editingId) {
          // Update existing student
          fetch(`http://localhost:5000/students/${editingId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Error: ${response.statusText}`);
                  }
                  return response.json();
              })
              .then(() => {
                  setEditingId(null); // Clear editing mode
                  setFormData({ name: '', age: '', gender: '', course: '', email: '' });
                  fetchStudents(); // Refresh list
              })
              .catch(error => console.error('Error updating student:', error));
      } else {
          // Save new student
          fetch('http://localhost:5000/students', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Error: ${response.statusText}`);
                  }
                  return response.json();
              })
              .then(() => {
                  setFormData({ name: '', age: '', gender: '', course: '', email: '' });
                  fetchStudents();
              })
              .catch(error => console.error('Error saving student:', error));
      }
  }
      // Set up form for editing
      function handleEdit(student,e) {
        e.preventDefault();
        setEditingId(student._id);
        setFormData({
            name: student.name,
            age: student.age,
            gender: student.gender,
            course: student.course,
            email: student.email
        });
    }

    // Function to handle deleting a student
    function handleDelete(id) {
        fetch(`http://localhost:5000/students/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                // Refresh student list after deletion
                fetchStudents();
            })
            .catch(error => console.error('Error deleting student:', error));
    }

    function logout(){
        signOut(auth)
        navigate("/home")
      }

    return(
        <>
        <div className="p-4 bg-gray-300">
      {/* Form 1 */}
      <div id="frm1" className="mb-8 bg-white p-6 rounded shadow-lg max-w-md mx-auto">
        <form onSubmit={handleSave}>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Name</td>
                <td className="p-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Age</td>
                <td className="p-2">
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.age}
                   onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Gender</td>
                <td className="p-2">
                  <label className="mr-2">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      className="mr-1"
                      checked={formData.gender === "male"}
                     onChange={handleChange}
                    />
                    Male
                  </label>
                  <label className="mr-2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      className="mr-1"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Course</td>
                <td className="p-2">
                  <select
                    name="course"
                    //name="course"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.course}
                     onChange={handleChange}
                  >
                    <option value="Select">Select a course</option>
                    <option value="web-development">Web Development</option>
                    <option value="UI/UX Designing">UI/UX Designing</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="data-science">Data Science</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Email</td>
                <td className="p-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center p-2">
                  <button
                    type="submit"
                    id="btn1"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  >
                    SAVE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {/* Form 2 */}
      <div id="frm2" className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
        <form>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
            {students.map((student) => (
                                <tr key={student._id} className="text-center">
                                    <td className="p-2 border">{student.name}</td>
                                    <td className="p-2 border">{student.age}</td>
                                    <td className="p-2 border">{student.gender}</td>
                                    <td className="p-2 border">{student.course}</td>
                                    <td className="p-2 border">{student.email}</td>
                                    <td className="p-2 border">
                                    <button onClick={(e)=>handleEdit(student,e)} className="bg-orange-400 text-white px-3 py-1 mx-5 rounded hover:bg-orange-600 transition">
                                          Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
            
            </tbody>
          </table>
        </form>
      </div>
    </div>
    <button className='button-style hidden  fixed bottom-5 right-10  md:block bg-red-500 text-black py-2 px-4  rounded  hover:bg-red-600 transition duration-200 ease-in-out'onClick={logout}>Logout</button>
        </>
    )
}
export default Studentinfo