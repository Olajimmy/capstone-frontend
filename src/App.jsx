import { useState } from "react";
import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import JobFeed from "./pages/JobFeed";
import JobPostPage from "./pages/JobPostPage";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import { getUser } from "./utilities/users-services";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <div className="mainHeader">
        <h1>Capstone Project</h1>
      </div>

      {user ? (
        <>
          <Nav />
          <div>{user.name}</div>
          <div>Welcome</div>
          <Routes>
            <Route path="/jobfeed" element={<JobFeed />} />
            <Route path="/jobpostpage" element={<JobPostPage />} />
            <Route
              path="/profilepage"
              element={<ProfilePage setUser={setUser} />}
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
      <Footer />
    </>
  );
}

export default App;
