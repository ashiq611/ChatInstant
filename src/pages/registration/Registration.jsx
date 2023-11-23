import Lottie from "lottie-react";
// import loginAni from '../../assets/lottie/loginAni.json'
import regAni from "../../assets/lottie/regAni.json";
import { useState } from "react";
import { toast } from "react-toastify";

const Registration = () => {
  // input value state start
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // input value state ends

  // error message handling state start
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // error message handling state ends

  // input value handling starts
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  // input value handling ends

  // form submit shandle starts
// email validation by Regex
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName === "") {
      setFullNameError("Please Enter Your Name");
    } else if (email === "") {
      setEmailError("Please Enter Your Email");
    } else if (!validRegex.test(email)) {
      setEmailError("Please Enter Valid Email");
    } else if (password === "") {
      setPasswordError("Please Enter Your Password");
    }else{
      console.log(fullName, email, password);
      // toastify
      toast.success('Registration Successfully');
    }
  };
  // form submit shandle ends

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:ms-10  lg:text-left">
            <h1 className="text-5xl font-bold">
              Get started with easily register
            </h1>
            <p className="py-6">Free register and you can enjoy it</p>
            <div className="flex justify-center">
              <Lottie className="w-60 md:w-96" animationData={regAni} />
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  onChange={handleFullName}
                  value={fullName}
                  required
                />
              </div>
              {/* error */}
              <p className=" text-red-600 font-semibold ">{fullNameError}</p>
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={handlePassword}
                  value={password}
                  required
                />
                {/* error */}
                <p className=" text-red-600 font-semibold mt-2 ">
                  {passwordError}
                </p>
                <label className="label">
                  <p className="label-text-alt">
                    Already have an account ?
                    <a href="" className="label-text-alt link link-hover">
                      Sign In
                    </a>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
