"use client";

// The French tree has its own root layout, so it needs its own error
// boundary. It reuses the English one unchanged, as before the split.
export { default } from "../(en)/error";
