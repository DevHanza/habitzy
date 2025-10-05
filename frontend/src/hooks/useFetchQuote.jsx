import { useEffect, useState } from "react";

function useFetchQuote() {
  const url = "https://api.realinspire.live/v1/quotes/random?maxLength=120";

  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((json) => setQuote(json))
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { quote, loading, error };
}

export default useFetchQuote;
