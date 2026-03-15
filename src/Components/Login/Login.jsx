import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../Firebase/Firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  const handelChange = () => {
    setShowPassword(!showPassword);
  };

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
        if (!result.user.emailVerified) {
          alert(" please verified your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMassage(error.message);
      });
  };

  const handelForgetPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email).then(() => {
      alert("a password reset email is send , please check your email");
    });
  };

  return (
    <div className="text-center max-w-md mx-auto p-2 mt-10">
      <h2 className="text-4xl font-bold mb-4 text-white">Login now</h2>
      <form
        onSubmit={handelLogin}
        className="fieldset border-2 shadow-2xl border-blue-900 rounded-2xl p-8  space-y-6  "
      >
        <div>
          <input
            type="email"
            name="email"
            ref={emailRef}
            autoComplete="email"
            className="input"
            placeholder="Your Email"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            className="input"
            placeholder="Your Password"
          />
          <button onClick={handelChange} className=" absolute -ml-6 mt-3.5 ">
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <div
          onClick={handelForgetPassword}
          className="text-start font-medium hover:text-blue-500 hover:underline"
        >
          <Link>forgot password</Link>
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
