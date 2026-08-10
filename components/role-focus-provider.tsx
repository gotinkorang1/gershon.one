"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { RoleFocusId } from "@/lib/site";

const RoleFocusContext = createContext<RoleFocusId | null>(null);

export function RoleFocusProvider({
  focus,
  children,
}: {
  focus: RoleFocusId | null;
  children: ReactNode;
}) {
  return <RoleFocusContext.Provider value={focus}>{children}</RoleFocusContext.Provider>;
}

export function useRoleFocus() {
  return useContext(RoleFocusContext);
}
