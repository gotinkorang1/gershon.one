/**
 * Serialise structured data for embedding in a <script> tag.
 *
 * `JSON.stringify` does not escape `</script>`, so any string containing it
 * closes the tag early and everything after it is parsed as HTML. That is a
 * full XSS sink the moment any of the serialised content is not fully trusted
 * — including your own writing, if a case study ever quotes a script tag.
 *
 * The `<`, `>` and `&` escapes are valid JSON string escapes, so the parsed
 * value is byte-identical; only the HTML-level representation changes.
 * U+2028/U+2029 are escaped because they are literal line terminators in
 * JavaScript and break the surrounding script.
 */
export function serialiseJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
