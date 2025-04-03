import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "services/apiServices";
const VerifyOTPPage = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State for OTP values
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]); // To handle focus movement between inputs

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  // Handle change for each input
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow a single digit
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const response = await verifyOtp({ email, otp: otpValue });
      localStorage.setItem("resetToken", response.data.token);
      alert("OTP verified successfully");
      setEmail("");
      navigate("/reset-password");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="body-pwd">
      <div className="container container-pwd">
        <div className="form" style={{ width: "100%", padding: "25px" }}>
          <div className="form form-pwd otp-verification">
            <span className="title">OTP Verification</span>
            <form onSubmit={handleSubmit}>
              <div className="otp-fields">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)} // Store input refs
                    type="text"
                    maxLength={1}
                    className="otp-input"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <div className="input-field button">
                <input type="submit" value="Verify OTP" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
