import { useEffect, useState } from "react";

function useFetchQuote() {
  const url = "https://api.realinspire.live/v1/quotes/random?maxLength=120";

  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!signal.aborted) setQuote(json);
      })
      .catch((err) => {
        if (!signal.aborted) setError(err);
        console.error(err);
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // abort if component unmounts
  }, [url]);

  return { quote, loading, error };
}

export default useFetchQuote;
