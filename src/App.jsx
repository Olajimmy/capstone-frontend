import { useState } from "react";
import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import JobFeed from "./pages/JobFeed";
import JobPostPage from "./pages/JobPostPage";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";

import "./App.css";
import { getUser } from "./utilities/users-services";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <h1>Capstone Project</h1>

      {user ? (
        <>
          <Nav />
          <div>{user.name}</div>
          <div>Welcome</div>
          <Routes>
            <Route path="/jobfeed" element={<JobFeed />} />
            <Route path="/jobpostpage" element={<JobPostPage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </>
  );
}

export default App;
