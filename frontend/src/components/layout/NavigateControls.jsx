import { IconButton } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useBreakpointValue } from "@chakra-ui/react";

function NavigateControls({}) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  if (!isDesktop) return;

  return (
    <IconButton
      aria-label="Go back"
      size={"md"}
      rounded={"full"}
      variant={"surface"}
      position={"absolute"}
      onClick={() => navigate(-1)}
    >
      <ArrowLeft />
    </IconButton>
  );
}

export default NavigateControls;
