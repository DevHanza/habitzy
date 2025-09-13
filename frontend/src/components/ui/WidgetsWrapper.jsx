import { Box } from "@chakra-ui/react";

function WidgetsWrapper({ children, ...props }) {
  return (
    <Box
      {...props}
      borderWidth={1}
      p={"1em"}
      borderRadius={"1rem"}
      bg={"bg.muted"}
      userSelect={"none"}
    >
      {children}
    </Box>
  );
}

export default WidgetsWrapper;
