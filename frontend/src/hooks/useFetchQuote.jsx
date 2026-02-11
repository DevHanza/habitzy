import { useEffect, useState } from "react";
import normalizeDate from "@/utils/normalizeDate";

function useFetchQuote() {
  const url = import.meta.env.VITE_QUOTES_API;

  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchQuote() {
      try {
        //
        const today = normalizeDate();
        const tommorrow = normalizeDate();
        tommorrow.setDate(today.getDate() + 1);

        const cachedQuote = localStorage.getItem("quote");
        const cachedQuoteExpiry = Number(localStorage.getItem("quote_expiry"));

        if (cachedQuote && cachedQuoteExpiry) {
          const isQuoteExpired = today.getTime() > cachedQuoteExpiry;
          //
          if (!isQuoteExpired) {
            const data = JSON.parse(cachedQuote);
            setQuote(data);
            setLoading(false);
            return;
          }
          //
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw Error(`An error has occurred: ${res.status}`);
        }

        const data = await res.json();

        setQuote(data);
        setLoading(false);
        localStorage.setItem("quote", JSON.stringify(data));
        localStorage.setItem("quote_expiry", tommorrow.getTime());
        console.log(quote);

        //
      } catch (err) {
        setError(err.message);
        setLoading(false);
        throw Error(err.message);
      }
    }

    fetchQuote();
  }, []);

  return { quote, loading, error };
}

export default useFetchQuote;
