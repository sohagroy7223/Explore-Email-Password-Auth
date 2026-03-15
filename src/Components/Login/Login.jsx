import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router";
import { auth } from "../../Firebase/Firebase.init";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset
    setSuccess(false);
    setErrorMassage("");

    // user login

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMassage(error.message);
      });
  };

  return (
    <div className="text-center max-w-md mx-auto p-2 mt-10">
      <h2 className="text-4xl font-bold mb-4 text-white">Login now</h2>
      <form
        onSubmit={handelLogin}
        className="fieldset border-2 shadow-2xl border-blue-900 rounded-2xl p-8  space-y-4"
      >
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          className="input"
          placeholder="Your Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="input"
          placeholder="Your Password"
        />
        <div className="text-start font-medium hover:text-blue-500 hover:underline">
          <Link to="">forgot password</Link>
        </div>
        <button className="btn btn-primary mt-4">Login</button>
        <p>
          create a new account?{" "}
          <Link
            className="text-blue-500 text-md font-bold underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
      {errorMassage && <p className="text-red-600">{errorMassage}</p>}
      {success && <p className="text-green-600">user login successfully</p>}
    </div>
  );
};

export default Login;
