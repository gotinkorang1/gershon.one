import { describe, it, expect } from "vitest";
import { serialiseJsonLd } from "@/lib/json-ld";

// Constructed by code point so the source file stays pure ASCII — the raw
// terminators are invisible and easy to mangle in an editor.
const LS = String.fromCharCode(0x2028); // line separator
const PS = String.fromCharCode(0x2029); // paragraph separator

describe("serialiseJsonLd", () => {
  it("escapes angle brackets so a </script> cannot break out of the tag", () => {
    const out = serialiseJsonLd({ bio: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(out).toContain("\\u003c");
    expect(out).toContain("\\u003e");
  });

  it("escapes ampersands", () => {
    expect(serialiseJsonLd({ x: "a & b" })).toContain("\\u0026");
  });

  it("escapes the U+2028 / U+2029 line terminators", () => {
    const out = serialiseJsonLd({ x: `a${LS}b${PS}c` });
    expect(out).toContain("\\u2028");
    expect(out).toContain("\\u2029");
    // The raw terminators must not survive — they break a <script> body.
    expect(out).not.toContain(LS);
    expect(out).not.toContain(PS);
  });

  it("stays byte-identical to the original once parsed back", () => {
    const value = { title: "A <b>bold</b> & tricky line", n: 42 };
    expect(JSON.parse(serialiseJsonLd(value))).toEqual(value);
  });
});
