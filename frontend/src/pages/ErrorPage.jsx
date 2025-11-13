import { Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return <Heading>ERROR OCCURED!</Heading>;
}

export default ErrorPage;
