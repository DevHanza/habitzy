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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("Submitted!");

      const input = e.target.elements[name];
      // input.focus();

      const prevValue = prevValueRef.current;
      const newValue = input?.value;

      if (prevValue === newValue) {
        setIsEditing(false);
        return
      }

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

      setIsEditing(false);
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
                onClick={(e) => {
                  setIsEditing(false);
                  setError({
                    status: false,
                    message: "",
                  });

                  inputRef.current.value = prevValueRef.current;
                }}
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
              onClick={() => {
                setIsEditing(true);
              }}
              colorPalette={"teal"}
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
