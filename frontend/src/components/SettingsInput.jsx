import { Box, Field, Input, IconButton } from "@chakra-ui/react";
import { Check, Pencil } from "lucide-react";
import { useRef, useState } from "react";

function SettingsInput({ label, placeholder, defaultValue, name, setUser }) {
  const prevValueRef = useRef(defaultValue);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prevValue = prevValueRef.current;
    const newValue = e.target.elements[name]?.value;

    if (prevValue === newValue) return;

    prevValueRef.current = newValue;

    setUser({ [name]: newValue });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root required gap={4}>
        <Field.Label>{label}</Field.Label>
        <Box display={"inline-flex"} width={"100%"} gap={2}>
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
        </Box>
      </Field.Root>
    </form>
  );
}

export default SettingsInput;
