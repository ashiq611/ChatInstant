import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import loginAni from "../../assets/lottie/loginAni.json";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // private page
  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  });



  // input value state start
  const [email, setEmail] = useState("");

  // input value state ends

  // error message handling state start

  const [emailError, setEmailError] = useState("");

  // error message handling state ends

  // input value handling starts

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

 

  // input value handling ends

  // form submit shandle starts
  // email validation by Regex
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("Please Enter Your Email");
    } else if (!validRegex.test(email)) {
      setEmailError("Please Enter Valid Email");
    } else {
      console.log(email);

      // firebase auth signin
     sendPasswordResetEmail(auth, email)
       .then(() => {
         // Password reset email sent!
         // ..
         navigate('/');
         setEmail('');
         toast.info("Check Your Email");

       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
       });
      // toastify
    }
  };
  // form submit shandle ends

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:ms-10 lg:text-left">
            <h1 className="text-5xl font-bold">Login to your account!</h1>
            <p className="py-6">
              Enjoy Your Free Time,{" "}
              <span className="text-blue-800 font-bold">ChatInstant </span>
              give you Entertainment
            </p>
            <div className="flex justify-center">
              <Lottie className="w-60" animationData={loginAni} />
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={handleEmail}
                  value={email}
                  required
                />
              </div>
              {/* error */}
              <p className=" text-red-600 font-semibold ">{emailError}</p>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Reset Password</button>
              </div>
              <Link to='/' className="form-control mt-6">
                <button className="btn btn-accent">Back</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;