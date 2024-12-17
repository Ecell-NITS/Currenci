import React, { useRef } from "react";
import ErrorFormFieldText from "./errorFormFieldText";

const OTPInput = ({ otp, onChange, length, validationError }) => {
  const ids = React.useMemo(
    () => Array.from({ length }, () => crypto.randomUUID()),
    [length],
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    onChange(newOtp);

    // Move to the next input if value is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp.every((char) => char === "")) {
        // Clear all OTP fields if Backspace is pressed and all fields are empty
        onChange(new Array(length).fill(""));
        inputRefs.current[0]?.focus();
      } else if (otp[index] === "" && index > 0) {
        // Move focus to the previous input
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (/^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    onChange(newOtp);

    // Move focus to the last filled input
    const lastFilledIndex = Math.min(pasteData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length }).map((_, index) => (
          <input
            key={ids[index]}
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
            type="text"
            value={otp[index] || ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-full max-w-[80px] aspect-square text-center text-2xl font-extrabold text-slate-900 bg-white border hover:border-slate-200 appearance-none rounded-xl p-2 border-2 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            maxLength={1}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-1">
        {validationError && <ErrorFormFieldText error={validationError} />}
      </div>
    </div>
  );
};

export default OTPInput;
