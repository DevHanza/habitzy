import { Heading, Stack, Text, Spinner, Alert, Box } from "@chakra-ui/react";
import WidgetsWrapper from "./ui/WidgetWrapper";
import useFetchQuote from "@/hooks/useFetchQuote";

function QuoteBox() {
  const { quote, loading, error } = useFetchQuote();

  // if (loading) return <Spinner color="teal.500" size="md" />;

  if (error)
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>Quote load failed. Retry?</Alert.Title>
      </Alert.Root>
    );

  return (
    <WidgetsWrapper py={6} justifyItems="center">
      {loading ? (
        <Box gap={0} lineHeight={1}>
          <Spinner color="teal.500" size="md" />
        </Box>
      ) : (
        <Stack gap={4}>
          <Heading
            fontWeight={500}
            size={{ base: "md", md: "lg" }}
            lineHeight={{ base: 1.25, md: 1.3 }}
          >
            {quote[0].content}
          </Heading>
          <Text fontSize={"0.875rem"} color={"fg.muted"}>
            — {quote[0].author}
          </Text>
        </Stack>
      )}
    </WidgetsWrapper>
  );
}

export default QuoteBox;
