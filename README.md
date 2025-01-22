Job Portal Website - README
Overview
This is a job portal website built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The website allows users to sign up, log in, view job postings, and post new jobs (employers only). Registered users can also manage their profiles and sign out of the application.

Features
Signup Page:

Users can register as either job seekers or employers.
User details are stored securely in a MongoDB database using Mongoose.
Login Page:

Users can log in with their registered email and password.
JWT (JSON Web Token) is used for secure user authentication and session management.
Job Feed Page:

Displays a feed of all job postings.
Job seekers can browse the available job listings.
Job Post Page (Employer only):

Employers can create and post new job listings.
Accessible only to users registered as employers.
Profile Page:

Users can view and update their profile details, including personal information, resume, and application history.
Sign Out:

Users can sign out of their accounts to end their sessions.
Technologies Used
Frontend:

React.js for building dynamic UI components.
CSS for styling and layout.
Backend:

Node.js with Express.js for server-side logic.
MongoDB for the database to store user and job data.
Mongoose for interacting with MongoDB and defining models.
JWT (JSON Web Token) for user authentication and session management.
Installation Instructions
Clone the repository:

bash
Copy
git clone https://github.com/yourusername/job-portal.git
cd job-portal
Set up the Backend:

Navigate to the backend directory:
bash
Copy
cd backend
Install dependencies:
bash
Copy
npm install
Create a .env file for environment variables (e.g., database URI, JWT secret):
env
Copy
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Start the server:
bash
Copy
npm start
The backend server will run on http://localhost:5050.
Set up the Frontend:

Navigate to the frontend directory:
bash
Copy
cd frontend
Install dependencies:
bash
Copy
npm install
Start the React development server:
bash
Copy
npm start
The frontend will run on http://localhost:5173.
Access the Website:

Once both the frontend and backend servers are running, open your browser and go to http://localhost:5173 to access the website.
Routes Overview
Auth Routes
router.post("/", userController.create);Register a new user (job seeker or employer).
router.post("/login", userController.login);

Job Routes
GET router.get("/", entryController.getEntries): Fetch all job postings for job seekers.

POST router.post("/", entryController.addEntry) Post a new job (only accessible by employers).

Profile Routes
GET router.get("/", userController.profile) View the logged-in user's profile.
Notes
Authentication: JWT is used to secure user login and protect routes that require authentication (e.g., job posting, viewing profile).
Authorization: Only users registered as employers can access the job post page.
