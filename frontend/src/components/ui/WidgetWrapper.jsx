import { Link } from "react-router";
import {
  Heading,
  Box,
  HStack,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

function WidgetWrapper({
  children,
  title,
  link,
  linkText,
  buttonText,
  buttonIcon,
  ...props
}) {
  return (
    <Box
      {...props}
      borderWidth={1}
      p={"1em"}
      borderRadius={"1rem"}
      bg={"bg.muted"}
      userSelect={"none"}
    >
      {title ? (
        <HStack
          justifyContent={"space-between"}
          marginBottom={{ base: "1rem", md: "1.5rem" }}
        >
          <Heading>{title}</Heading>
          {linkText ? (
            <ChakraLink
              as={Link}
              to={link}
              outlineColor={"transparent"}
              fontSize={"0.75rem"}
              _hover={{color: "teal.300"}}
            >
              {linkText} <ArrowRight size={"1rem"} />
            </ChakraLink>
          ) : (
            ""
          )}
          {buttonText ? (
            <Link>
              <Button colorPalette={"teal"} size={"sm"}>
                {buttonText}
                {buttonIcon}
              </Button>
            </Link>
          ) : (
            ""
          )}
        </HStack>
      ) : (
        ""
      )}
      {children}
    </Box>
  );
}

export default WidgetWrapper;
