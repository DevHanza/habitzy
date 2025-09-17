import { Box } from "@chakra-ui/react";

function HoverWrapper({ size = "0.25rem", px, children, ...props }) {
  return (
    <Box
      {...props}
      px={px}
      _hover={{
        bg: "bg.muted",
        outlineStyle: "solid",
        outlineWidth: size,
        outlineColor: "border.muted",
        borderRadius: "sm",
      }}
    >
      {children}
    </Box>
  );
}

export default HoverWrapper;
