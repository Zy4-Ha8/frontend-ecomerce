import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import { OTPVerify, OTPSending } from "../../features/auth/auth";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const id = +useParams().id;

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const reSendOtp = async () => {
    if (timer > 0) return;
    await dispatch(OTPSending({ id: id }))
      .unwrap()
      .then(() => {
        if (error) {
          setError(null);
        }
      });

    setTimer(60);
    setOtp("");
    setError(null);
  };

  const onChange = (value) => {
    setOtp(value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        const result = await dispatch(OTPVerify({ id, code: otp })).unwrap();
        if (result.status === 201) {
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Enter OTP Code
        </h2>

        {/* Responsive OTP Input with Tailwind */}
        <div className="mb-6 flex justify-center">
          <OtpInput
            value={otp}
            onChange={onChange}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                className="w-10! h-10! sm:w-12! sm:h-12! text-lg sm:text-xl border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#3a5b22]/70 focus:border-transparent"
              />
            )}
            containerStyle="flex gap-2 sm:gap-3"
            shouldAutoFocus
          />
        </div>

        <button
          type="submit"
          disabled={otp.length !== 6}
          className="w-full bg-[#3a5b22] hover:bg-[#3a5b22]/90 disabled:bg-[#3a5b22]/70 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors"
        >
          Verify OTP
        </button>

        <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
          <p>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={reSendOtp}
              disabled={timer > 0}
              className={`font-medium ${
                timer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#3a5b22] hover:underline cursor-pointer"
              }`}
            >
              Resend
            </button>
          </p>
          {timer > 0 && (
            <p className="mt-2 text-gray-500">
              Resend in{" "}
              <span className="font-semibold text-[#3a5b22]">{timer}s</span>
            </p>
          )}
        </div>

        {error && (
          <p className="mt-4 text-center text-xs sm:text-sm text-red-800">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default OTPVerification;
