import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, method, data) => {
  const [response, setResponse] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useAxios", { url, method, data });
    if (data)
      setTimeout(() => {
        axios({
          method: method,
          url: `http://localhost:4000/api/${url}`,
          data: data,
        })
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              throw Error("could not fetch the data for that resource");
            }
            return res.json();
          })
          .then((res) => {
            setResponse(res);
            setIsPending(false);
            setError(false);
          })
          .catch((err) => {
            if (err.name === "AbortError")
              console.log(`axios ${method} aborted`);
            else {
              setIsPending(false);
              setError(err.message);
            }
          });
      });
  }, [url, method, data]);
  return { response, isPending, error };
};

export default useAxios;
