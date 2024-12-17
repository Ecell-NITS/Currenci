"use client";

import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";
import { signUpSchema, otpSchema } from "../../../schemas/signUpSchema";
import Form from "../../components/Forms/basicForm";
import VerificationCode from "../../components/Forms/otpForm";

const SignUp = () => {
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage if OTP is sent or not
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(new Array(6).fill("")); // Initialize as an array
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // State to manage validation errors for form fields
  const [otpValidationErrors, setOtpValidationErrors] = useState(""); // State to manage validation errors for OTP field
  const [error, setError] = useState(""); // State to manage if there is an error in the API call
  const [success, setSuccess] = useState(""); // State to manage if the API call is successful
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [timer, setTimer] = useState(60); // State to manage the timer for OTP resend

  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown); // cleanup
    }

    // Ensure return statement is present, even when the timer is 0
    return undefined;
  }, [timer]);

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    otpArray?: string[],
  ) => {
    setError("");
    if (e.preventDefault) {
      e.preventDefault();
    }
    const { name, value } = e.target;
    if (name === "otp" && otpArray) {
      setOtp(otpArray);
      setOtpValidationErrors("");
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const registerUser = async () => {
    try {
      otpSchema.parse(otp.join(""));
      setError("");
      setLoading(true);
      try {
        const response = await fetch("/api/v1/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            otp: otp.join(""),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setLoading(false);
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess(
          "Registration Successful. Please login with your credentials now. Redirecting to login page...",
        );
        setTimeout(() => {
          setLoading(false);
          router.push("/signIn");
        }, 3000);
      } catch (erro) {
        setError(erro.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      if (err.errors) {
        setOtpValidationErrors(err.errors[0].message);
      }
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setTimer(60);
    try {
      const response = await fetch("/api/v1/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        setTimer(60);
        setLoading(false);
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending OTP", error);
      setError(err);
      setTimer(60);
      setLoading(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      signUpSchema.parse(formData);

      try {
        setLoading(true);
        const response = await fetch("/api/v1/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setLoading(false);
        setIsOtpSent(true);
        setError("");
        setTimer(60);
      } catch (err) {
        console.error("Error sending OTP", err);
        setLoading(false);
        setError(`${err}`);
      }
    } catch (err) {
      if (err.errors) {
        // Mapping the error messages to the respective fields
        const newValidationErrors = {};
        err.errors.forEach((errr) => {
          newValidationErrors[errr.path[0]] = errr.message;
        });
        setValidationErrors(newValidationErrors);
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsOtpSent(false);
          setTimer(60);
          setError("");
          setLoading(false);
          router.push("/");
        }}
        aria-label="Close Button"
      >
        <X width="50px" height="50px" />
      </button>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="logo" className={styles.logoImage} />
      </div>
      <div className={styles.signForm}>
        {!isOtpSent && (
          // Signup Form until OTP is sent
          <>
            <Form
              title="Sign Up"
              fields={[
                {
                  label: "Username",
                  type: "text",
                  name: "username",
                  value: formData.username,
                  placeholder: "johnsmith1717",
                  validationError: validationErrors.username,
                  onChange: handleChange,
                },
                {
                  label: "Email",
                  type: "text",
                  name: "email",
                  value: formData.email,
                  placeholder: "johnsmith@email.com",
                  validationError: validationErrors.email,
                  onChange: handleChange,
                },
                {
                  label: "Password",
                  type: "password",
                  name: "password",
                  value: formData.password,
                  placeholder: "Your Password",
                  validationError: validationErrors.password,
                  onChange: handleChange,
                },
                {
                  label: "Confirm Password",
                  type: "password",
                  name: "confirmPassword",
                  value: formData.confirmPassword,
                  placeholder: "Your Password",
                  validationError: validationErrors.confirmPassword,
                  onChange: handleChange,
                },
              ]}
              onSubmit={sendOtp}
              error={error}
              loading={loading}
              buttonText="Sign Up"
              setError={setError}
            />
            <div className="flex items-center justify-center mb-12">
              <p className={styles.signUpText}>Already have an account?</p>
              <Link className={styles.signInRedirect} href="/signIn">
                SignIn Now
              </Link>
            </div>
          </>
        )}
        {isOtpSent && (
          //  Signup Form when OTP is sent to the user
          <>
            <VerificationCode
              title="Verification Code"
              description="We have sent a verification code to your email address. Please enter the code below."
              error={error}
              setError={setError}
              success={success}
              otp={otp}
              handleOTPChange={handleChange}
              otpValidationErrors={otpValidationErrors}
              onSubmit={registerUser}
              loading={loading}
              buttonText="Verify OTP"
            />
            <div className="flex flex-col self-start w-full text-slate-500">
              <div className={styles.signUpText}>
                Didn&apos;t receive code?{" "}
                {timer > 0 ? (
                  `Resend OTP in ${timer} secs.`
                ) : (
                  <button onClick={resendOtp} className={styles.resendButton}>
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
