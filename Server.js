const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Dummy Data

// 1. Courses
let courses = [
  { id: 1, title: "Full-Stack Web Development", category: "Software", duration: "12 weeks" },
  { id: 2, title: "UI/UX Design", category: "Design", duration: "8 weeks" }
];

// 2. Students
let students = [
  { id: 1, name: "Collins Malamba", email: "collins@example.com", enrolledCourseId: 1 },
  { id: 2, name: "Mary Wanjiru", email: "mary@example.com", enrolledCourseId: 2 }
];

// 3. Internships
let internships = [
  { id: 1, studentId: 1, company: "Tech Academy Solutions", status: "ongoing" },
  { id: 2, studentId: 2, company: "Digital Innovations Hub", status: "completed" }
];

// 4. Professionals
let professionals = [
  { id: 1, name: "James Otieno", skill: "Web Development", rating: 4.8 },
  { id: 2, name: "Sarah Njeri", skill: "Graphic Design", rating: 4.6 }
];

// 5. Client Service Requests
let requests = [
  { id: 1, clientName: "ABC Company", service: "Website Development", status: "pending" },
  { id: 2, clientName: "XYZ Traders", service: "Branding", status: "assigned" }
];

//  Projects (Internship tasks)
let projects = [
  { id: 1, title: "E-commerce Website", assignedTo: 1, progress: 70 },
  { id: 2, title: "Logo Rebranding", assignedTo: 2, progress: 100 }
];

// REUSABLE CRUD HANDLER GENERATOR
function createCRUDRoutes(routeName, dataArray) {
  // GET all
  app.get(`/api/${routeName}`, (req, res) => {
    res.json(dataArray);
  });

  // GET one
  app.get(`/api/${routeName}/:id`, (req, res) => {
    const item = dataArray.find(i => i.id == req.params.id);
    if (!item) return res.status(404).json({ message: `${routeName} not found` });
    res.json(item);
  });

  // CREATE
  app.post(`/api/${routeName}`, (req, res) => {
    const newItem = { id: dataArray.length + 1, ...req.body };
    dataArray.push(newItem);
    res.json(newItem);
  });

  // UPDATE
  app.put(`/api/${routeName}/:id`, (req, res) => {
    const item = dataArray.find(i => i.id == req.params.id);
    if (!item) return res.status(404).json({ message: `${routeName} not found` });

    Object.assign(item, req.body);
    res.json(item);
  });

  // DELETE
  app.delete(`/api/${routeName}/:id`, (req, res) => {
    const index = dataArray.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: `${routeName} not found` });

    dataArray.splice(index, 1);
    res.json({ message: `${routeName} deleted` });
  });
}

// Create all routes
createCRUDRoutes("courses", courses);
createCRUDRoutes("students", students);
createCRUDRoutes("internships", internships);
createCRUDRoutes("professionals", professionals);
createCRUDRoutes("requests", requests);
createCRUDRoutes("projects", projects);

// Home route
app.get("/", (req, res) => {
  res.send("Tech Academy Testing API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ...`));
