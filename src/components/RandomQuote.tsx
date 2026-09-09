"use client";

import { useEffect, useState } from "react";

type Quote = {
  text: string,
  author: string,
}

export default function RandomQuote({ className = "" }) {
  const QUOTE_API_URL = "https://pzachcomfn.azurewebsites.net/api/random-quote"

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    async function loadQuote() {
      try {
        const response = await fetch(QUOTE_API_URL);
        const json = await response.json();
        setQuote(json);
      } catch (err) {
        console.error("Error loading quote:", err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
    }

    loadQuote();
  }, []);

  return (
    <div className={className}>
      {error && <p className="text-red-500 font-bold">Error fetching a random quote!</p>}
      {!error && quote && (
        <>
          <p className="italic">
            {quote.text}
          </p>
          <p className="mt-2">
          &nbsp;&nbsp;- {quote.author}
          </p>
        </>
      )}
      {loading && !error && <p>Loading quote...</p>}
    </div>
  )
}