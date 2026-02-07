import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
import { Check, Pencil } from "lucide-react";
import { useRef, useState } from "react";

function SettingsInput({ label, placeholder, defaultValue, name, updateUser }) {
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

    prevValueRef.current = newValue;

    updateUser({ [name]: newValue });
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Field.Root required>
          <Field.Label>{label}</Field.Label>
          <Input
            placeholder={placeholder}
            disabled={!isEditing}
            colorPalette={"teal"}
            defaultValue={defaultValue}
            size={"sm"}
            name={name}
            // borderColor={"border.emphasized"}
          />
        </Field.Root>
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
    </form>
  );
}

export default SettingsInput;
