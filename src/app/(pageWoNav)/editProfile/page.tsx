"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorText from "../../components/errorText";
import SuccessText from "../../components/successText";
import ErrorFormFieldText from "../../components/errorFormFieldText";
import { userSchema } from "../../../schemas/userSchema";
import LoadingSpinner from "../../components/loadingSpinner";

const EditTeam = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to manage loading state of API Call
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [newUploadedImageUrl, setNewUploadedImageUrl] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({}); // State to manage validation errors for form fields
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
  });
  const [newFormData, setNewFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/v1/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user details");
        }
        console.log(data);
        setFormData({
          fullname: data.fullname,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
        });
        setNewFormData({
          fullname: data.fullname,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
        });
        setUploadedImageUrl(data.imageUrl || null);
        setNewUploadedImageUrl(data.imageUrl || null);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load user details.");
      }
    };
    fetchUser();
  }, []);

  const handleImageUpload = async (event) => {
    setError("");
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const data = await response.json();
        setNewUploadedImageUrl(data.secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
        setError("Failed to upload image. Please try again.");
      }
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    const { name, value } = e.target;
    setNewFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const saveUserDetails = async (e) => {
    e.preventDefault();
    try {
      userSchema.parse(newFormData);
      try {
        setLoading(true);
        const response = await fetch(`/api/v1/editProfile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname:
              newFormData.fullname === formData.fullname
                ? null
                : newFormData.fullname,
            email:
              newFormData.email === formData.email ? null : newFormData.email,
            ...(newFormData.phoneNumber !== formData.phoneNumber && {
              phoneNumber: newFormData.phoneNumber,
            }),
            ...(newUploadedImageUrl !== uploadedImageUrl && {
              imageUrl: newUploadedImageUrl,
            }),
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          setError(data.message || "Something went wrong.");
          throw new Error(data.message || "Something went wrong.");
        }
        setSuccess("Profile updated successfully");
        setError("");
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 3000);
      } catch (err) {
        setLoading(false);
        setError(`${err}`);
      }
    } catch (err) {
      if (err.errors) {
        const newValidationErrors = {};
        err.errors.forEach((errr) => {
          newValidationErrors[errr.path[0]] = errr.message;
        });
        setValidationErrors(newValidationErrors);
      }
    }
  };

  return (
    <div className="flex flex-col mb-10">
      <div className="flex items-center px-[10vw] py-[10vh]">
        <svg
          className="md:w-7 w-5"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="15.5" fill="white" stroke="#A48111" />
          <path
            d="M14.3989 15.9937L14.0846 16.3333L14.3989 16.6729L18.1379 20.7131L17.9367 20.9305L13.6821 16.3332L17.9329 11.7352L18.137 11.9545L14.3989 15.9937Z"
            fill="#A48111"
            stroke="#A48111"
          />
        </svg>

        <h1
          className="md:text-3xl text-2xl font-semibold ms-2"
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          Edit Profile
        </h1>
        <X
          onClick={() => router.push("/")}
          className="absolute right-[10vw] md:w-11 md:h-9 w-10 h-9 hover:scale-[1.1] cursor-pointer"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-20 gap-2 md:px-[10vw]">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="relative md:w-60 md:h-60 w-40 h-40 bg-white rounded-lg shadow-lg"
          >
            <Image
              className="object-cover rounded-lg"
              src={
                newUploadedImageUrl || "/images/addTeamMemberPlaceholder.png"
              }
              alt="Profile Image"
              fill
            />
          </button>
          {newUploadedImageUrl && (
            <button
              className="text-md text-red-500 cursor-pointer underline"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Change Profile Picture
            </button>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <form className="flex flex-col gap-4 mt-4 md:mb-0 mb-20 md:w-fit w-full md:px-0 px-[10vw]">
          {error && <ErrorText error={error} setError={setError} />}
          {success && <SuccessText message={success} />}
          <div className="flex flex-col">
            <label
              htmlFor="nameInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Full Name
            </label>
            <input
              id="nameInput"
              onChange={handleChange}
              value={newFormData.fullname}
              name="fullname"
              type="text"
              className="lg:w-[25vw] w-full  border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.fullname && (
              <ErrorFormFieldText error={validationErrors.fullname} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="emailInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Email
            </label>
            <div className="relative">
              <input
                id="emailInput"
                onChange={handleChange}
                value={newFormData.email}
                name="email"
                type="text"
                className="lg:w-[25vw] w-full border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
              />
              {/* {newFormData.email !== formData.email && (
                 <button
                 className="absolute right-2 top-2 text-green font-semibold underline">Send OTP</button>
            )} */}
            </div>
            {validationErrors.email && (
              <ErrorFormFieldText error={validationErrors.email} />
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="linkedinInput"
              className="text-md font-medium mb-2"
              style={{ fontFamily: "Sofia Pro Light" }}
            >
              Phone Number (Optional)
            </label>
            <input
              id="phoneNumberInput"
              onChange={handleChange}
              value={newFormData.phoneNumber}
              name="phoneNumber"
              type="text"
              placeholder="+919876598765"
              className="lg:w-[25vw] w-full border border-gray-300 rounded-md p-2 focus:border-[#1e3432]"
            />
            {validationErrors.phoneNumber && (
              <ErrorFormFieldText error={validationErrors.phoneNumber} />
            )}
          </div>
        </form>
        <div></div>
      </div>
      <div className="md:relative w-full fixed bottom-0 flex flex-col md:flex-row items-center justify-center md:gap-2">
        <button
          onClick={saveUserDetails}
          disabled={
            formData.fullname === newFormData.fullname &&
            formData.email === newFormData.email &&
            formData.phoneNumber === newFormData.phoneNumber &&
            uploadedImageUrl === newUploadedImageUrl
          } // Disable the button if all fields are the same
          className={`mt-10 md:rounded-3xl rounded-none px-5 py-1 text-2xl md:w-fit w-full font-medium text-center self-center ${
            formData.fullname === newFormData.fullname &&
            formData.email === newFormData.email &&
            formData.phoneNumber === newFormData.phoneNumber &&
            uploadedImageUrl === newUploadedImageUrl
              ? "bg-gray-400 text-white cursor-not-allowed" // Disabled styles
              : "text-white bg-[#1e3432] hover:bg-[#172625] cursor-pointer" // Active styles
          } md:border-2 border-none border-[#fac16a] transition-all ease-in-out duration-200`}
          style={{ fontFamily: "Sofia Pro Light" }}
        >
          <div className="flex flex-row items-center justify-center gap-3">
            {loading && <LoadingSpinner />}
            <span>Save</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditTeam;
