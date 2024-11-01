import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        //sprawdzamy ref.current no bo kazdy window zostanie wyrenderowany na poczatku patzac na ten prop name
        //a gdy nie bedzie spelniam openName z contextu to wyrenderuje null, wiec ref.current nie bedzie istniec
        //dlatego sprawdzamy no bo wowczas nie chcemy nic zamykac w ogole nie chce wowczas nic robic
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
