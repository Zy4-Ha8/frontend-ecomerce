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
    await dispatch(OTPSending({ id: id })).unwrap();

    setTimer(60);
    setOtp("");
    setError(null);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter OTP Code
        </h2>

        {/* Simple OTP Input */}
        <div className="mb-6 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "1.25rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              textAlign: "center",
            }}
            containerStyle="justify-center"
            shouldAutoFocus
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#3a5b22] hover:bg-[#3a5b22]/90 text-white py-3 rounded-md text-lg font-semibold"
        >
          Verify OTP
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={reSendOtp}
              disabled={timer > 0}
              className={
                timer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#3a5b22] hover:underline cursor-pointer"
              }
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
          <p className="mt-4 text-center text-sm text-red-800">{error}</p>
        )}
      </form>
    </div>
  );
}

export default OTPVerification;
