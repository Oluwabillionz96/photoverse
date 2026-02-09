import { ControllerFieldState, RefCallBack } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  fieldState,
  field,
  id,
  placeholder,
}: {
  fieldState: ControllerFieldState;
  field: Record<string, string | (() => void) | boolean | RefCallBack>;
  id: string;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        {...field}
        type={showPassword ? "text" : "password"}
        id={id}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        className="h-12 bg-background/50 border-border/30 focus:border-primary/50 transition-all"
      />
      <button
        className="absolute top-2 right-2 cursor-pointer"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
};

export default PasswordInput;
