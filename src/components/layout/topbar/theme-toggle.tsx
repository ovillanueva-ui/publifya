"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "@/components/ui/icon-button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration flag, not derived from an external system
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <IconButton aria-label="Cambiar tema" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? <Sun /> : <Moon />}
    </IconButton>
  );
}
