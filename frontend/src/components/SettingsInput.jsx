import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Check, Pencil } from "lucide-react";
import { useRef, useState } from "react";

function SettingsInput({
  label,
  placeholder,
  defaultValue,
  name,
  updateUser,
  validator, // Add validator function as prop
  // invalid,
  // errMessage = "Something went wrong!",
}) {
  const prevValueRef = useRef(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const input = e.target.elements[name];
      input.focus();

      const prevValue = prevValueRef.current;
      const newValue = input?.value;

      if (prevValue === newValue) return;

      // Run validator if provided
      if (validator) {
        const validationResult = validator(newValue);
        if (!validationResult) {
          setError({
            status: true,
            message: `Invalid ${name}`,
          });
          return;
        }
      }

      prevValueRef.current = newValue;

      //

      setError({
        status: false,
        message: "",
      });

      const res = await updateUser({ [name]: newValue });

      // console.log(res.message);

      toaster.create({
        title: `${res.message}`,
        type: "success",
        closable: true,
      });

      // if (!res.ok) {
      //   console.log("ERROR!");
      // }
    } catch (err) {
      setError({
        status: true,
        message: err.message,
      });
      throw Error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root required invalid={error.status}>
        <Field.Label>{label}</Field.Label>
        <HStack width={"full"}>
          <Input
            placeholder={placeholder}
            disabled={!isEditing}
            colorPalette={"teal"}
            defaultValue={defaultValue}
            size={"sm"}
            name={name}
            // borderColor={"border.emphasized"}
          />
          <IconButton
            aria-label={`Edit ${label}`}
            size={"sm"}
            variant={isEditing ? "solid" : "subtle"}
            onClick={toggleEditing}
            colorPalette={"teal"}
            type="submit"
          >
            {isEditing ? <Check /> : <Pencil />}
          </IconButton>
        </HStack>
        <Field.ErrorText>{error.message}</Field.ErrorText>
      </Field.Root>
    </form>
  );
}

export default SettingsInput;
