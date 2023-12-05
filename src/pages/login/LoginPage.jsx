import Lottie from "lottie-react";
import loginAni from "../../assets/lottie/loginAni.json";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";
import { getDatabase, push, ref, set } from "firebase/database";


const LoginPage = () => {
    const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  // private page
  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  });

  // input value state start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // input value state ends

  // error message handling state start

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // error message handling state ends

  // input value handling starts

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
    

    if (email === "") {
      setEmailError("Please Enter Your Email");
    } else if (!validRegex.test(email)) {
      setEmailError("Please Enter Valid Email");
    } else if (password === "") {
      setPasswordError("Please Enter Your Password");
    } else {
      console.log( email, password);

      // firebase auth signin
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          dispatch(userLoginInfo(user));
          // in localstore, set storage
          localStorage.setItem("user", JSON.stringify(user));

          // auth device
          // Record the Logged In Date
          const loggedInDate = new Date().toISOString();

          set(push(ref(db, "devices")), {
            userID: user.uid,
            deviceName: navigator.appCodeName,
            os: navigator.appVersion,
            loggedInDate: loggedInDate, // Add the Logged In Date
            loggedIn: true,
          });
          // auth device

          navigate("/home");
          toast.success("Logged In Successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
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
              <span className="text-blue-800 font-bold">ChatInstant </span>give
              you Entertainment
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
                <div className="md:flex md:justify-between">
                  <label className="label">
                    <Link to='/forgotpassword' className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                  <label className="label">
                    <p className="label-text-alt">
                      Don’t have an account ?
                      <Link to='/registration' className="label-text-alt link link-hover">
                        Sign up
                      </Link>
                    </p>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
