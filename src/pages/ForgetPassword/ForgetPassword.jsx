import { useState } from "react";
import { Link } from "react-router-dom";
import OtpForm from "./OtpForm";
import EmailForm from "./EmailForm";

const ForgetPassword = () => {
  const [isValid, setIsValid] = useState(false);
  const [hasOtp, setHasOtp] = useState(false);



  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {hasOtp ? (
          // Change Password Screen
            ''
        ) : isValid ? (
          // OTP Verification Screen
          <OtpForm />

        ) : (
          // Email Input Screen
          <EmailForm setIsValid={setIsValid} />
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;