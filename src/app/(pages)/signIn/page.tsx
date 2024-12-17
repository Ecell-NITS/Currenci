"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import styles from "./signin.module.css";
import { signInSchema } from "../../../schemas/signInSchema";
import Form from "../../components/Forms/basicForm";

const SignIn = () => {
  const [error, setError] = useState(""); // State to manage if there is an error in the API call
  const [success, setSuccess] = useState(""); // State to manage if the API call is successful
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const login = async () => {
    try {
      signInSchema.parse(formData);

      try {
        setError("");
        setLoading(true);
        const response = await fetch("/api/v1/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong.");
          setLoading(false);
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess("Login Successful. Redirecting to home page...");
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 3000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      if (err.errors) {
        // Mapping the error messages to the respective fields
        const newValidationErrors = {};
        err.errors.forEach((er) => {
          newValidationErrors[er.path[0]] = er.message;
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
        <p className={styles.welcomeTitle}>Welcome Back</p>
        <Form
          title="Sign in"
          fields={[
            {
              label: "Username or Email",
              type: "text",
              name: "usernameOrEmail",
              value: formData.usernameOrEmail,
              placeholder: "johnsmith1717",
              validationError: validationErrors.usernameOrEmail,
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
          ]}
          onSubmit={login}
          error={error}
          success={success}
          loading={loading}
          buttonText="Login"
          setError={setError}
        />
        <Link href="/resetPassword" className={styles.forgotPasswordText}>
          Forgot Password?
        </Link>
        <div className="flex items-center justify-center mb-7">
          <p className={styles.signUpText}>Don&apos;t have an account?</p>
          <Link className={styles.signUpRedirect} href="/signUp">
            SignUp Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
