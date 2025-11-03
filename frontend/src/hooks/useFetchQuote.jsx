import { getCookie, setCookie } from "@/utils/cookieHelper";
import { useEffect, useState } from "react";

function useFetchQuote() {
  const url = "https://api.realinspire.live/v1/quotes/random?maxLength=120";

  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const quoteCookie = getCookie("quote");

    if (quoteCookie) {
      const savedQuote = JSON.parse(quoteCookie);
      setQuote(savedQuote);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!signal.aborted) {
          setQuote(json);
          const quoteData = JSON.stringify(json);
          setCookie("quote", quoteData, 1);
        }
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
