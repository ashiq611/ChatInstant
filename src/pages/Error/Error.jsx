import Lottie from "lottie-react";
import ErrorAni from "../../assets/lottie/ErrorAni.json";

const Error = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <Lottie className="w-60" animationData={ErrorAni} />
            
        </div>
    );
};

export default Error;