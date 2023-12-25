import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {"loading": loading,"error": error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Make a POST request to the "/api/auth/signup" endpoint
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          // Indicating that the request body is JSON
          "Content-Type": "application/json",
        },
        // Converting the formData object to a JSON string
        body: JSON.stringify(formData),
      });
      // Parse the JSON response
      const data = await res.json();

      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure(data));
        
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Dont have an account?
          <Link to="/sign-up">
            <span className="text-blue-400"> Sign up</span>
          </Link>
        </p>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
