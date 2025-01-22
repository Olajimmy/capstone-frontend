// //
// import { useState } from "react";
// //adding in auth, i am importing signup from utilities

// import { signUp } from "../utilities/users-services";
// //

// function SignUpForm(props) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     entryType: "", //entType || "None",
//     img: "",
//   });
//   const [error, setError] = useState("");
//   const [entType, setEntType] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//     try {
//       //set this up to be able to add new users
//       const submitData = { ...formData, entryType: entType };
//       delete submitData.confirm;
//       console.log(submitData);
//       const user = await signUp(submitData);
//       props.setUser(user);
//     } catch (e) {
//       setError("Sign Up Failed - Try Again");
//     }
//   };

//   //
//   const handleTypeSelect = (e) => {
//     setEntType(e.target.value);
//   };
//   //
//   return (
//     <>
//       <div className="signUpMainContainer">
//         <h2>Sign Up to start using your own Calendar</h2>
//         <div className="jobList">
//           <form autoComplete="off" onSubmit={handleSubmit}>
//             <label>Display Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Display name"
//               required
//             />
//             <br />

//             <label>Email Address (needs to be unique)</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="enter email"
//               required
//             />
//             <br />
//             <label>enter password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="enter password"
//               required
//             />
//             <br />
//             <label>confirm password</label>
//             <input
//               type="password"
//               name="confirm"
//               value={formData.confirm}
//               onChange={handleChange}
//               placeholder="must match password"
//               required
//             />
//             <br />
//             <label>How Can We Help?</label>
//             <select value={entType} onChange={handleTypeSelect}>
//               <option value="employee">I Need a Job</option>
//               <option value="employer">I Need a Worker</option>
//             </select>

//             <br />
//             <input
//               type="file"
//               name="img"
//               value={formData.img}
//               onChange={handleChange}
//             />

//             <br />
//             <button
//               type="submit"
//               disabled={formData.password !== formData.confirm}
//             >
//               Sign Up
//             </button>
//           </form>
//           <p>{error} </p>
//         </div>
//       </div>
//     </>
//   );
// }
// export default SignUpForm;

import { useState } from "react";
import { signUp } from "../utilities/users-services";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    entryType: "", //entType || "None",
  });
  const [error, setError] = useState("");
  const [entType, setEntType] = useState("");
  // const [postImage, setPostImage] = useState({ myFile: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = { ...formData, entryType: entType };
      delete submitData.confirm;
      const user = await signUp(submitData);
      console.log(user);
      props.setUser(user);
    } catch (e) {
      setError("Sign Up Failed - Try Again");
    }
  };

  const handleTypeSelect = (e) => {
    setEntType(e.target.value);
    console.log(entType);
  };

  return (
    <div className="signUpContainer">
      <h2 className="formTitle">Sign Up to Get Started</h2>
      <div className="formWrapper">
        <form autoComplete="off" onSubmit={handleSubmit} className="signUpForm">
          <label>Display Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Display Name"
            required
          />

          <label>Email Address (needs to be unique):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <label>How Can We Help?</label>
          <select value={entType} onChange={handleTypeSelect}>
            <option value="employee">I Need a Job</option>
            <option value="employer">I Need a Worker</option>
          </select>

          <button
            type="submit"
            disabled={formData.password !== formData.confirm}
            className="submitBtn"
          >
            Sign Up
          </button>
        </form>
        <p className="errorText">{error}</p>
      </div>
    </div>
  );
}

export default SignUpForm;
// //
// //
// import { useState } from "react";
// import { signUp } from "../utilities/users-services";

// function SignUpForm(props) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     entryType: "", // entType || "None",
//     myFile: "", // Image file base64 will go here
//   });
//   const [error, setError] = useState("");
//   const [entType, setEntType] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); // To track form submission state

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start the submission process

//     try {
//       const submitData = { ...formData, entryType: entType };
//       delete submitData.confirm;
//       const user = await signUp(submitData);
//       console.log(user);
//       props.setUser(user);
//     } catch (e) {
//       setError("Sign Up Failed - Try Again");
//     } finally {
//       setIsSubmitting(false); // End the submission process
//     }
//   };

//   const handleTypeSelect = (e) => {
//     setEntType(e.target.value);
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const base64 = await convertToBase64(file);
//         setFormData({ ...formData, myFile: base64 }); // Update myFile with base64 value
//       } catch (error) {
//         console.error("Error converting file to base64:", error);
//       }
//     }
//   };

//   // Function to convert file to base64
//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => resolve(fileReader.result);
//       fileReader.onerror = (error) => reject(error);
//     });
//   }

//   return (
//     <div className="signUpContainer">
//       <h2 className="formTitle">Sign Up to Get Started</h2>
//       <div className="formWrapper">
//         <form autoComplete="off" onSubmit={handleSubmit} className="signUpForm">
//           <label>Display Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Display Name"
//             required
//           />

//           <label>Email Address (needs to be unique):</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />

//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//           />

//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirm"
//             value={formData.confirm}
//             onChange={handleChange}
//             placeholder="Confirm your password"
//             required
//           />

//           <label>How Can We Help?</label>
//           <select value={entType} onChange={handleTypeSelect}>
//             <option value="employee">I Need a Job</option>
//             <option value="employer">I Need a Worker</option>
//           </select>

//           <label>Profile Picture:</label>
//           <input
//             type="file"
//             name="myFile"
//             id="file-upload"
//             accept=".jpeg, .png, .jpg"
//             onChange={handleFileUpload}
//           />

//           <button
//             type="submit"
//             disabled={formData.password !== formData.confirm || isSubmitting}
//             className="submitBtn"
//           >
//             {isSubmitting ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>
//         <p className="errorText">{error}</p>
//       </div>
//     </div>
//   );
// }

// export default SignUpForm;
