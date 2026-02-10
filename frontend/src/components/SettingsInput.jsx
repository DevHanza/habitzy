import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Check, Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const inputRef = useRef(null);
  const prevValueRef = useRef(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (!error.status) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  async function handleSubmit(e) {
    try {
      //
      e.preventDefault();

      const input = e.target.elements[name];
      const prevValue = prevValueRef.current;
      const newValue = input?.value;

      if (prevValue === newValue) {
        setIsEditing(false);
        return;
      }

      // Run validator if provided
      if (validator) {
        const validationResult = validator(newValue);
        if (!validationResult) {
          throw Error(`Invalid ${name}`);
        }
      }

      const res = await updateUser({ [name]: newValue });

      if (error.status) {
        return;
      }

      // console.log(res.message);

      setIsEditing(false);
      prevValueRef.current = newValue;

      setError({
        status: false,
        message: "",
      });

      toaster.create({
        title: `${res.message}`,
        type: "success",
        closable: true,
      });
      //
    } catch (err) {
      setError({
        status: true,
        message: err.message,
      });
      throw Error(err);
    }
  }

  function enableEdit() {
    setIsEditing(true);
  }

  async function cancelEdit() {
    setIsEditing(false);
    setError({
      status: false,
      message: "",
    });

    inputRef.current.value = prevValueRef.current;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root required invalid={error.status}>
        <Field.Label>{label}</Field.Label>
        <HStack width={"full"}>
          <Input
            placeholder={placeholder}
            disabled={!isEditing}
            colorPalette={import.meta.env.VITE_APP_COLOR}
            defaultValue={defaultValue}
            size={"sm"}
            name={name}
            ref={inputRef}
            // borderColor={"border.emphasized"}
          />

          {isEditing ? (
            <HStack>
              <IconButton
                aria-label={`Save edit ${label}`}
                size={"sm"}
                variant={"solid"}
                colorPalette={import.meta.env.VITE_APP_COLOR}
                type="submit"
              >
                <Check />
              </IconButton>
              <IconButton
                aria-label={`Cancel edit ${label}`}
                size={"sm"}
                variant={"subtle"}
                onClick={cancelEdit}
                colorPalette={"red"}
              >
                <X />
              </IconButton>
            </HStack>
          ) : (
            <IconButton
              aria-label={`Edit ${label}`}
              size={"sm"}
              variant={"solid"}
              onClick={enableEdit}
              colorPalette={import.meta.env.VITE_APP_COLOR}
            >
              <Pencil />
            </IconButton>
          )}
        </HStack>
        <Field.ErrorText>{error.message}</Field.ErrorText>
      </Field.Root>
    </form>
  );
}

export default SettingsInput;
