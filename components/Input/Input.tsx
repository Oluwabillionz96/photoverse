import { Info } from "lucide-react";
import { ChangeEvent } from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
  ...props
}: {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  required?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={` flex flex-col gap-2 items-start justify-center `}>
      <div
        className={`h-12 outline-0 border  px-2 text-[1.1rem] rounded-sm ${
          error.trim() ? "border-red-500 border-2" : "border-gray-500"
        }  overflow-hidden w-full`}
      >
        <input
          type={type}
          placeholder={placeholder || ""}
          value={value}
          onChange={onChange}
          className="w-full h-full border-0 outline-0"
          required={required}
          {...props}
        />
      </div>
      {error.trim() && (
        <p className="text-sm flex text-red-500 items-center gap-1">
          <Info size={15} /> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
