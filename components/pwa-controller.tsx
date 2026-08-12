"use client";

import { useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { portfolioFeatures } from "@/lib/site";
import { captureAnalyticsEvent } from "@/lib/analytics";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaController() {
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
    };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      if (registration.waiting) setWaitingWorker(registration.waiting);
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(worker);
          }
        });
      });
    }).catch(() => undefined);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") captureAnalyticsEvent("portfolio installed");
    setInstallPrompt(null);
  }

  function refresh() {
    navigator.serviceWorker.addEventListener("controllerchange", () => window.location.reload(), { once: true });
    waitingWorker?.postMessage("SKIP_WAITING");
  }

  return (
    <>
      {installPrompt && (
        <button type="button" onClick={() => void install()} className="link inline-flex items-center gap-2">
          <Download className="size-3.5" aria-hidden />
          {portfolioFeatures.pwa.install}
        </button>
      )}
      {waitingWorker && (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-border bg-surface-1/95 p-3 shadow-[var(--shadow-lg)] backdrop-blur-xl sm:bottom-6 sm:right-6"
        >
          <p className="text-sm font-medium">{portfolioFeatures.pwa.updateReady}</p>
          <button type="button" onClick={refresh} className="tap inline-flex min-h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-xs font-medium text-surface-0">
            <RefreshCw className="size-3.5" aria-hidden />
            {portfolioFeatures.pwa.refresh}
          </button>
        </div>
      )}
    </>
  );
}
