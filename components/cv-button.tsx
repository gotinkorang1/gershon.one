"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Download, Eye, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/components/locale-provider";
import { resumeUrlFor } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Portal } from "@/components/ui/portal";
import { cn } from "@/lib/utils";

type Stage = "closed" | "choose" | "viewing";

/**
 * CV entry point.
 *
 * Clicking opens a modal offering two paths. "Download" triggers the file
 * directly via a synthetic anchor with the `download` attribute — no navigation,
 * no new tab. "View here" swaps the modal into a full-height PDF viewer so the
 * visitor stays on the site; sending them to the browser's own PDF reader means
 * their only way back is the back button, which on a hiring page is where you
 * least want someone stranded.
 */
export function CvButton({
  variant = "accent",
  size = "lg",
  label,
  className,
}: {
  variant?: "accent" | "outline" | "default" | "ghost";
  size?: "default" | "sm" | "lg";
  label?: string;
  className?: string;
}) {
  const { t, locale } = useI18n();
  const href = resumeUrlFor(locale);
  const [stage, setStage] = useState<Stage>("closed");
  const [downloaded, setDownloaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Mobile browsers (iOS Safari, Android Chrome) refuse to render PDFs inside an
  // <iframe> — the frame comes up blank or the file is forced to download. So on
  // those devices "View here" opens the PDF directly instead of the dead viewer.
  // Computed lazily (no setState-in-effect). It's only read on click — never
  // during first paint, and the dialog it affects is closed at hydration — so a
  // server/client difference here can't produce a visible mismatch.
  const canInlinePdf = () =>
    typeof window === "undefined" ||
    !window.matchMedia("(pointer: coarse), (max-width: 640px)").matches;
  const [inlinePdf, setInlinePdf] = useState(canInlinePdf);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Keep it accurate if the viewport/pointer changes (e.g. rotate, resize).
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 640px)");
    const update = () => setInlinePdf(!mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openDirect = useCallback(() => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, [href]);

  const download = useCallback(() => {
    const anchor = document.createElement("a");
    anchor.href = href;
    // Empty value keeps the server-provided filename.
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2600);
  }, [href]);

  const close = useCallback(() => {
    setStage("closed");
    setDownloaded(false);
    setLoaded(false);
  }, []);

  // Some browsers fire no load event when they hand the PDF to a download
  // handler instead of rendering it; clear the placeholder regardless.
  useEffect(() => {
    if (stage !== "viewing") return;
    const timer = setTimeout(() => setLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setStage("choose")}
        className={cn("group", className)}
      >
        <FileText />
        {label ?? t.hero.downloadCv}
      </Button>

      {/* ------------------------------------------------------ choice ---- */}
      <Dialog
        open={stage === "choose"}
        onClose={close}
        title={t.ui.cvDialogTitle}
        className="max-w-md"
      >
        <div className="p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.ui.cvDialogBody}
          </p>

          <div className="mt-5 grid gap-2.5">
            <button
              type="button"
              onClick={() => {
                // On phones the inline iframe viewer stays blank, so open the
                // PDF directly in the device's own reader instead.
                if (inlinePdf) {
                  setStage("viewing");
                } else {
                  openDirect();
                  close();
                }
              }}
              className="panel panel-interactive flex items-center gap-3.5 p-4 text-left"
            >
              <span className="panel-inset grid size-10 shrink-0 place-items-center rounded-lg">
                {inlinePdf ? (
                  <Eye className="size-4 text-accent" />
                ) : (
                  <ArrowUpRight className="size-4 text-accent" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{t.ui.viewInBrowser}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {inlinePdf ? t.ui.viewInBrowserHint : t.ui.viewInBrowserHintMobile}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={download}
              className="panel panel-interactive flex items-center gap-3.5 p-4 text-left"
            >
              <span className="panel-inset grid size-10 shrink-0 place-items-center rounded-lg">
                {downloaded ? (
                  <Check className="size-4 text-live" />
                ) : (
                  <Download className="size-4 text-accent" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  {downloaded ? t.ui.downloadStarted : t.ui.downloadPdf}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {t.ui.downloadPdfHint("2 pp.")}
                </span>
              </span>
            </button>
          </div>
        </div>
      </Dialog>

      {/* ------------------------------------------------------ viewer ---- */}
      <Portal>
        <AnimatePresence>
        {stage === "viewing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-surface-0/80 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.ui.cvViewerTitle}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
              className="panel panel-raised flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
                <h2 className="text-sm font-medium">{t.ui.cvViewerTitle}</h2>

                <div className="flex items-center gap-1.5">
                  <a href={href} target="_blank" rel="noreferrer noopener">
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight />
                      <span className="hidden sm:inline">{t.ui.openInNewTabShort}</span>
                    </Button>
                  </a>
                  <Button variant="ghost" size="sm" onClick={download}>
                    {downloaded ? <Check className="text-live" /> : <Download />}
                    <span className="hidden sm:inline">
                      {downloaded ? t.ui.downloadStarted : t.ui.downloadPdf}
                    </span>
                  </Button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.ui.close}
                    className="tap grid size-8 place-items-center rounded-md text-faint transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* An <iframe> renders same-origin PDFs far more consistently
                  than <object>, whose fallback fires whenever the browser
                  merely prefers to download — which is a user setting, not a
                  capability. The escape hatch below is therefore phrased as a
                  question rather than as a claim about the browser. */}
              <div className="relative min-h-0 flex-1 bg-surface-inset">
                {!loaded && (
                  <div className="absolute inset-0 grid place-items-center">
                    <p className="label">{t.ui.loadingPdf}</p>
                  </div>
                )}

                <iframe
                  ref={frameRef}
                  src={`${href}#view=FitH&toolbar=1`}
                  title={t.ui.cvViewerTitle}
                  onLoad={() => setLoaded(true)}
                  className="size-full border-0"
                />
              </div>

              <details className="shrink-0 border-t border-border px-4 py-2.5">
                <summary className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">
                  {t.ui.pdfNotShowing}
                </summary>
                <div className="flex flex-wrap items-center gap-3 pb-1 pt-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t.ui.pdfFallback}
                  </p>
                  <Button variant="outline" size="sm" onClick={download}>
                    <Download />
                    {t.ui.downloadPdf}
                  </Button>
                </div>
              </details>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
