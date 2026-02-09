import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
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

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = (e) => {
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

    updateUser({ [name]: newValue });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root required invalid={invalid}>
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
        <Field.ErrorText>{invalidMessage}</Field.ErrorText>
      </Field.Root>
    </form>
  );
}

export default SettingsInput;
