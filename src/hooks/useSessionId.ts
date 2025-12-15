"use client";

import { useState, useEffect } from "react";

/**
 * Hook to get or create a session ID for guest cart management
 * Stores the session ID in localStorage for persistence
 */
export function useSessionId() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("sessionId", id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
}

