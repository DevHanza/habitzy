import { Box } from "@chakra-ui/react";

function HoverWrapper({ size = "0.25rem", px, children }) {
  return (
    <Box
      px={px}
      _hover={{
        bg: "gray.900",
        outlineStyle: "solid",
        outlineWidth: size,
        outlineColor: "gray.900",
        borderRadius: "sm",
      }}
    >
      {children}
    </Box>
  );
}

export default HoverWrapper;
