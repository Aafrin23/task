
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());//middleware

//connecting to db
mongoose.connect('mongodb://127.0.0.1:27017/studentinfobd',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    
    console.log("Connection Successfull")
}).catch((error) => {
    console.error("Database connection failed:", error);
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    course:{type: String, required:true},
    email: { type: String, required: true, unique: true }
}, { collection: 'info' }); // specify collection name

const Student = mongoose.model('Student', studentSchema);
//module .exports = Student;

// Route to fetch all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Route to add a new student
app.post('/students', async (req, res) => {
    try {
        console.log("Received data:", req.body); 
        const newStudent = new Student(req.body);
        await newStudent.save();
        console.log("Data saved successfully:", newStudent);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error saving student data:", error.message);
        res.status(400).json({ error: 'Failed to add student' });
    }
});

// Route to delete a student by ID
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});


// Route to update a student by ID
app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(updatedStudent);
    } catch (error) {
        console.error("Error updating student data:", error.message);
        res.status(400).json({ error: 'Failed to update student' });
    }
});

//connection to server
app.listen(5000, () => console.log('Server running on port 5000'));