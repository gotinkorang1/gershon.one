export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div
        className="absolute -left-1/4 -top-1/3 size-[46rem] rounded-full blur-[130px] animate-[aurora_24s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }}
      />
      <div
        className="absolute -right-1/4 top-0 size-[34rem] rounded-full blur-[120px] animate-[aurora_30s_ease-in-out_infinite_alternate-reverse]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.15 200 / 0.18), transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 size-[30rem] rounded-full blur-[120px] animate-[aurora_26s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.16 320 / 0.14), transparent 65%)",
        }}
      />
    </div>
  );
}
