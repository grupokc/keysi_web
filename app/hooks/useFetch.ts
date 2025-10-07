import { useState, useCallback } from "react";
import { END_POINT, HEADERS, URL, URL_NETAPI } from "@/app/utils/constants";

interface FetchOptions {
  endPoint?: string;
  action: string;
  body: any;
  url?: string;
  cb: (data: any) => void;
}

export function useFetch() {
  const [data, setData] = useState({
    loading: false,
    error: ""
  });

  const request = useCallback(async ({ endPoint, action, body,url, cb }: FetchOptions) => {
    setData({ error: "", loading: true });

    const currentEndPoint = endPoint || END_POINT;
    const currentUrl = url == "URL_NETAPI" ? URL_NETAPI : URL;
    console.log("currentUrl",currentUrl)

    try {
      const response = await fetch(`${currentUrl}${currentEndPoint}${action}`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        cb(result.data);
        setData({ loading: false, error: "" });
      } else {
        setData({ loading: false, error: result.errorMessage || "An error occurred" });
      }
    } catch (error: any) {
      setData({ error: error.message, loading: false });
    }
  }, []);

  return {
    loading: data.loading,
    errorRequest: data.error,
    request
  };
}
