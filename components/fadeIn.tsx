"use client";

import { Props } from "@/types/global";
import { useEffect, useState } from "react";

export default function FadeIn({ children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
