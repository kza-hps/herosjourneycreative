"use client";

import { useRouter } from "next/navigation";

export default function ReturnToReading() {
  const router = useRouter();

  function handleReturn() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    router.push("/journal");
  }

  return (
    <button
      type="button"
      className="hjc-lnk"
      onClick={handleReturn}
      style={{ paddingTop: 0 }}
    >
      Return to reading
    </button>
  );
}
