#!/usr/bin/env python3
"""
Generate branded cover images for blog posts that don't have a photo.

Matches the site's OG-image aesthetic (dark field, cyan accent). Each cover is a
restrained, topic-appropriate abstract — no text, since the post title renders
next to the card. Run:

    python3 scripts/generate_blog_covers.py

Output (768x512, 3:2, to match the existing photo cover):
    public/network-latency-cover.webp
    public/erpnext-id-cards-cover.webp
"""

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

PUBLIC = Path(__file__).resolve().parent.parent / "public"

W, H = 768, 512
SS = 2  # supersample for smooth edges
CW, CH = W * SS, H * SS

BG_TOP = (26, 28, 34)
BG_BOT = (17, 18, 23)
ACCENT = (26, 207, 223)
ACCENT_DIM = (26, 207, 223)
WARN = (240, 180, 90)
MUTED = (150, 156, 168)
BORDER = (60, 64, 74)


def base_canvas():
    """Vertical gradient background with a soft corner glow and dot grid."""
    img = Image.new("RGB", (CW, CH), BG_BOT)
    top = Image.new("RGB", (CW, CH), BG_TOP)
    mask = Image.new("L", (CW, CH))
    md = ImageDraw.Draw(mask)
    for y in range(CH):
        md.line([(0, y), (CW, y)], fill=int(255 * (1 - y / CH)))
    img = Image.composite(top, img, mask)

    # Faint dot grid.
    grid = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 34 * SS
    for gy in range(step, CH, step):
        for gx in range(step, CW, step):
            gd.ellipse([gx - SS, gy - SS, gx + SS, gy + SS], fill=(255, 255, 255, 10))
    img = Image.alpha_composite(img.convert("RGBA"), grid)

    # Corner accent glow (top-right).
    glow = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([CW - 340 * SS, -160 * SS, CW + 120 * SS, 300 * SS],
               fill=(*ACCENT, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(70 * SS))
    img = Image.alpha_composite(img, glow)
    return img.convert("RGB")


def glow_layer(draw_fn):
    layer = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    draw_fn(d)
    return layer.filter(ImageFilter.GaussianBlur(6 * SS))


def finish(img, name):
    out = img.resize((W, H), Image.LANCZOS)
    path = PUBLIC / name
    out.save(path, "WEBP", quality=88, method=6)
    print(f"wrote {path.relative_to(PUBLIC.parent)}  ({path.stat().st_size // 1024} KB)")


# --------------------------------------------------------------------------- #
#  Cover 1 — network / fibre latency                                          #
# --------------------------------------------------------------------------- #

def network_cover():
    img = base_canvas().convert("RGBA")

    # Five fibre strands flowing left→right as gentle sine waves.
    strands = []
    for i in range(5):
        y0 = CH * (0.30 + i * 0.10)
        amp = (14 + i * 6) * SS
        phase = i * 0.9
        pts = []
        for x in range(0, CW + 1, 6 * SS):
            y = y0 + amp * math.sin(x / (150 * SS) + phase)
            pts.append((x, y))
        strands.append(pts)

    # Soft glow under the strands.
    def draw_strand_glow(d):
        for pts in strands:
            d.line(pts, fill=(*ACCENT, 60), width=3 * SS, joint="curve")
    img = Image.alpha_composite(img, glow_layer(draw_strand_glow))

    # Sharp strands.
    d = ImageDraw.Draw(img)
    for i, pts in enumerate(strands):
        alpha = 120 + i * 22
        d.line(pts, fill=(*ACCENT_DIM, alpha), width=max(1, SS), joint="curve")

    # Connection nodes along the strands.
    node_glow = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    ng = ImageDraw.Draw(node_glow)
    nodes = []
    for i, pts in enumerate(strands):
        for f in (0.22, 0.55, 0.82):
            px, py = pts[int(len(pts) * f)]
            nodes.append((px, py, i))
    for px, py, i in nodes:
        r = 4 * SS
        ng.ellipse([px - r, py - r, px + r, py + r], fill=(*ACCENT, 90))
    node_glow = node_glow.filter(ImageFilter.GaussianBlur(5 * SS))
    img = Image.alpha_composite(img, node_glow)
    d = ImageDraw.Draw(img)
    for px, py, i in nodes:
        r = 3 * SS
        d.ellipse([px - r, py - r, px + r, py + r], fill=(230, 250, 252, 235))

    # One "hot" fault node (warm) — the point the post says is the real culprit,
    # not the fibre.
    fx, fy = strands[2][int(len(strands[2]) * 0.68)]
    hot = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    hd = ImageDraw.Draw(hot)
    hd.ellipse([fx - 16 * SS, fy - 16 * SS, fx + 16 * SS, fy + 16 * SS], fill=(*WARN, 120))
    hot = hot.filter(ImageFilter.GaussianBlur(9 * SS))
    img = Image.alpha_composite(img, hot)
    d = ImageDraw.Draw(img)
    r = 5 * SS
    d.ellipse([fx - r, fy - r, fx + r, fy + r], fill=(*WARN, 255))
    d.ellipse([fx - 11 * SS, fy - 11 * SS, fx + 11 * SS, fy + 11 * SS],
              outline=(*WARN, 150), width=SS)

    finish(img.convert("RGB"), "network-latency-cover.webp")


# --------------------------------------------------------------------------- #
#  Cover 2 — two ID cards per A4 sheet                                          #
# --------------------------------------------------------------------------- #

def id_cards_cover():
    img = base_canvas().convert("RGBA")

    # A4 sheet (portrait) centred, slightly lifted.
    sheet_w = 250 * SS
    sheet_h = int(sheet_w * 1.414)
    sx = (CW - sheet_w) // 2
    sy = (CH - sheet_h) // 2

    shadow = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle([sx, sy + 8 * SS, sx + sheet_w, sy + sheet_h + 8 * SS],
                         radius=6 * SS, fill=(0, 0, 0, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16 * SS))
    img = Image.alpha_composite(img, shadow)

    d = ImageDraw.Draw(img)
    d.rounded_rectangle([sx, sy, sx + sheet_w, sy + sheet_h], radius=6 * SS,
                        fill=(38, 41, 48), outline=(*BORDER, 255), width=SS)

    # Two ID cards stacked on the sheet.
    pad = 22 * SS
    card_w = sheet_w - pad * 2
    card_h = int(card_w * 0.62)
    gap = 26 * SS
    total = card_h * 2 + gap
    cy0 = sy + (sheet_h - total) // 2
    for k in range(2):
        cx = sx + pad
        cy = cy0 + k * (card_h + gap)
        # card body
        d.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=5 * SS,
                            fill=(30, 33, 40), outline=(*BORDER, 255), width=SS)
        # accent header bar
        d.rounded_rectangle([cx, cy, cx + card_w, cy + 10 * SS], radius=5 * SS,
                            fill=(*ACCENT, 210))
        d.rectangle([cx, cy + 6 * SS, cx + card_w, cy + 10 * SS], fill=(*ACCENT, 210))
        # photo placeholder
        ph = card_h - 22 * SS
        d.rounded_rectangle([cx + 10 * SS, cy + 16 * SS, cx + 10 * SS + ph, cy + 16 * SS + ph],
                            radius=3 * SS, fill=(52, 56, 66))
        # a simple head silhouette in the photo
        hx = cx + 10 * SS + ph / 2
        hy = cy + 16 * SS + ph * 0.42
        d.ellipse([hx - ph * 0.16, hy - ph * 0.16, hx + ph * 0.16, hy + ph * 0.16],
                  fill=(90, 96, 108))
        d.pieslice([hx - ph * 0.26, hy + ph * 0.04, hx + ph * 0.26, hy + ph * 0.7],
                   180, 360, fill=(90, 96, 108))
        # text lines
        tx = cx + 20 * SS + ph
        for j, wf in enumerate((0.72, 0.9, 0.55, 0.82)):
            ly = cy + 22 * SS + j * 15 * SS
            col = (*ACCENT, 200) if j == 0 else (*MUTED, 150)
            d.rounded_rectangle([tx, ly, tx + int((card_w - ph - 34 * SS) * wf), ly + 6 * SS],
                                radius=3 * SS, fill=col)

    # Crop marks at the sheet corners (print motif).
    m = 9 * SS
    off = 12 * SS
    for cxp, cyp, dx, dy in [
        (sx, sy, 1, 1), (sx + sheet_w, sy, -1, 1),
        (sx, sy + sheet_h, 1, -1), (sx + sheet_w, sy + sheet_h, -1, -1),
    ]:
        d.line([(cxp - dx * off, cyp), (cxp - dx * off + dx * m, cyp)], fill=(*MUTED, 160), width=SS)
        d.line([(cxp, cyp - dy * off), (cxp, cyp - dy * off + dy * m)], fill=(*MUTED, 160), width=SS)

    finish(img.convert("RGB"), "erpnext-id-cards-cover.webp")


if __name__ == "__main__":
    network_cover()
    id_cards_cover()
