import { useLocation, useNavigate } from "react-router";
import {
  Container,
  Heading,
  Text,
  Stack,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import WidgetWrapper from "@/components/ui/WidgetWrapper";
import checkCircleAnimation from "@/assets/anim/circle_check.webm";
import crossCircleAnimation from "@/assets/anim/circle_cross.webm";

function StatusPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const initialStatus = {
    success: false,
    title: "Something went wrong!",
    message: `${import.meta.env.VITE_APP_NAME} has encountered an error. Contact ${import.meta.env.VITE_SUPPORT_EMAIL} if the problem persists.`,
    btn: "Close",
    btnLink: "/",
  };

  const status = location.state?.status || initialStatus;

  return (
    <Container
      maxW={"lg"}
      py={{ base: 0, md: 10 }}
      height={"100dvh"}
      alignContent={"center"}
    >
      <WidgetWrapper
        //   minHeight={"500px"}
        py={8}
        px={{ mdDown: 0 }}
        pt={{ mdDown: "24" }}
        background={{ mdDown: "none" }}
        border={{ mdDown: "none" }}
        height={{ mdDown: "95dvh" }}
      >
        <Stack
          gap={16}
          height={{ base: "100%" }}
          justifyContent={{ mdDown: "space-between" }}
        >
          <Stack gap={{ base: 8, md: 2 }}>
            <video
              autoPlay
              muted
              preload="auto"
              width={isDesktop ? "150" : "130"}
              style={{ alignSelf: "center" }}
            >
              <source
                src={
                  status.success ? checkCircleAnimation : crossCircleAnimation
                }
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>

            {/*  */}
            <Stack
              textAlign={"center"}
              alignItems={"center"}
              gap={{ base: 4, md: 3 }}
            >
              <Heading size={{ base: "3xl", md: "2xl" }} userSelect={"text"}>
                {status.title || ""}
              </Heading>
              <Text color={"fg.muted"} maxWidth={"90%"} userSelect={"text"}>
                {status.message || ""}
              </Text>
            </Stack>
          </Stack>

          <Button
            colorPalette={import.meta.env.VITE_APP_COLOR}
            width={"100%"}
            onClick={() => {
              navigate(status.btnLink);
            }}
          >
            {status.btn || "Close"}
          </Button>
        </Stack>
      </WidgetWrapper>
    </Container>
  );
}

export default StatusPage;
