import { Spinner, Box, Flex } from "@chakra-ui/react";

import React from "react";

function Loader() {
  return (
    <Box
      position={"fixed"}
      inset={0}
      zIndex={9999}
      backgroundColor={"black"}
      height={"100vh"}
      width={"100%"}
      overflow={"hidden"}
    >
      <Flex alignItems={"center"} justifyContent={"center"} height={"100%"}>
        <Spinner
          size={{ base: "md", md: "xl" }}
          colorPalette={"teal"}
          alignContent={"center"}
          color="colorPalette.300"
        />
      </Flex>
    </Box>
  );
}

export default Loader;
