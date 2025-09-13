import { Heading, Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router";

function WidgetWrapper({ children, title, link, linkText, ...props }) {
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
          <ChakraLink
            as={Link}
            to={link}
            outlineColor={"transparent"}
            fontSize={"0.75rem"}
          >
            {linkText ? linkText : "See more"} <ArrowRight size={"1rem"} />
          </ChakraLink>
        </HStack>
      ) : (
        ""
      )}
      {children}
    </Box>
  );
}

export default WidgetWrapper;
