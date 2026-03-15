import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase/Firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handelChange = () => {
    setShowPassword(!showPassword);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const trams = e.target.trams.checked;

    if (trams === false) {
      setErrorMassage("please accept our trams and condition");
      return;
    }

    setSuccess(false);
    setErrorMassage("");
    // password validation

    const passwordRegEx = /(?=.*\d)/;
    const passwordRegEx2 = /(?=.*[a-z])/;
    const passwordRegEx3 = /(?=.*[A-Z])/;
    const passwordRegEx4 = /.{8,}/;
    if (passwordRegEx.test(password) === false) {
      setErrorMassage("add any degit 1,2,3");
      return;
    } else if (passwordRegEx2.test(password) === false) {
      setErrorMassage("add any lowercase word");
      return;
    } else if (passwordRegEx3.test(password) === false) {
      setErrorMassage("add any upercatcase word");
      return;
    } else if (passwordRegEx4.test(password) === false) {
      setErrorMassage("password must be 8 creature");
      return;
    }

    // create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);

        // email verified***

        sendEmailVerification(auth.currentUser).then(() => {
          setSuccess(true);
          alert("we send you a verification email,please check your email");
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMassage(error.message);
      });
  };

  return (
    <div className=" text-center max-w-md mx-auto p-2 mt-10">
      <h2 className="text-3xl font-bold mb-4 text-white">Please Register</h2>
      <form
        onSubmit={handelFormSubmit}
        className="border-2 shadow-2xl border-blue-900 rounded-2xl p-8 space-y-4"
      >
        {/* name section */}

        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="text"
            name="name"
            required
            placeholder="Input your name"
            minLength="1"
            maxLength="30"
          />
        </label>
        <p className="validator-hint hidden">
          Must be 3 to 30 characters
          <br />
          containing only letters, numbers or dash
        </p>

        {/* email section */}

        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        <br />

        {/* password section */}

        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              // minLength="8"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            <button onClick={handelChange} className="absolute ml-22 mt-1 ">
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
          </div>
        </label>
        {/* <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p> */}
        <br />
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box  border p-4">
          <label className="label">
            <input type="checkbox" name="trams" className="checkbox" />
            trams and condition
          </label>
        </fieldset>
        <br />
        <input className="btn btn-primary" type="submit" value="submit" />
        <p>
          I already have an account?{" "}
          <Link className="text-blue-600 underline font-bold" to="/login">
            Login
          </Link>
        </p>
      </form>
      {errorMassage && <p className="text-red-700">{errorMassage}</p>}
      {success && <p className="text-green-500">user Register success full</p>}
    </div>
  );
};

export default Register;
