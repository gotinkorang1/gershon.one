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


# --------------------------------------------------------------------------- #
#  Cover 3 — from IT generalist to a specialist profile                         #
# --------------------------------------------------------------------------- #

def generalist_cover():
    img = base_canvas().convert("RGBA")

    # Five role tiles on the left — the many hats — each with a small glyph.
    tile = 58 * SS
    tiles = [
        (CW * 0.15, CH * 0.22), (CW * 0.27, CH * 0.38), (CW * 0.13, CH * 0.52),
        (CW * 0.27, CH * 0.68), (CW * 0.14, CH * 0.82),
    ]
    # One profile card on the right — the same experience, translated.
    card_w, card_h = 230 * SS, 150 * SS
    kx, ky = CW * 0.62, CH * 0.5 - card_h / 2
    target = (kx, CH * 0.5)

    # Lines from every tile converge on the card.
    def draw_links(d):
        for tx, ty in tiles:
            d.line([(tx + tile / 2, ty), target], fill=(*ACCENT, 70), width=3 * SS)
    img = Image.alpha_composite(img, glow_layer(draw_links))
    d = ImageDraw.Draw(img)
    for tx, ty in tiles:
        d.line([(tx + tile / 2, ty), target], fill=(*ACCENT_DIM, 120), width=max(1, SS))

    for i, (tx, ty) in enumerate(tiles):
        x0, y0 = tx - tile / 2, ty - tile / 2
        d.rounded_rectangle([x0, y0, x0 + tile, y0 + tile], radius=10 * SS,
                            fill=(34, 37, 44), outline=(*BORDER, 255), width=SS)
        cx, cy = tx, ty
        g = (*MUTED, 220)
        s = SS
        if i == 0:  # network: three linked nodes
            pts = [(cx - 14 * s, cy + 9 * s), (cx, cy - 11 * s), (cx + 14 * s, cy + 9 * s)]
            d.line(pts + [pts[0]], fill=g, width=2 * s)
            for px, py in pts:
                d.ellipse([px - 4 * s, py - 4 * s, px + 4 * s, py + 4 * s], fill=g)
        elif i == 1:  # help desk: speech bubble
            d.rounded_rectangle([cx - 16 * s, cy - 12 * s, cx + 16 * s, cy + 8 * s], radius=6 * s, outline=g, width=2 * s)
            d.polygon([(cx - 6 * s, cy + 8 * s), (cx - 12 * s, cy + 16 * s), (cx + 1 * s, cy + 8 * s)], fill=g)
        elif i == 2:  # web: browser window
            d.rounded_rectangle([cx - 17 * s, cy - 13 * s, cx + 17 * s, cy + 13 * s], radius=3 * s, outline=g, width=2 * s)
            d.line([(cx - 17 * s, cy - 5 * s), (cx + 17 * s, cy - 5 * s)], fill=g, width=2 * s)
        elif i == 3:  # server: stacked units
            for k in range(3):
                yy = cy - 14 * s + k * 10 * s
                d.rounded_rectangle([cx - 16 * s, yy, cx + 16 * s, yy + 7 * s], radius=2 * s, outline=g, width=2 * s)
                d.ellipse([cx + 9 * s, yy + 2 * s, cx + 12 * s, yy + 5 * s], fill=(*ACCENT, 220))
        else:  # hardware: chip with pins
            d.rectangle([cx - 11 * s, cy - 11 * s, cx + 11 * s, cy + 11 * s], outline=g, width=2 * s)
            for k in (-6, 0, 6):
                d.line([(cx + k * s, cy - 17 * s), (cx + k * s, cy - 11 * s)], fill=g, width=2 * s)
                d.line([(cx + k * s, cy + 11 * s), (cx + k * s, cy + 17 * s)], fill=g, width=2 * s)

    # Card glow and shadow, then the card itself.
    halo = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.rounded_rectangle([kx - 10 * SS, ky - 10 * SS, kx + card_w + 10 * SS, ky + card_h + 10 * SS],
                         radius=16 * SS, fill=(*ACCENT, 55))
    halo = halo.filter(ImageFilter.GaussianBlur(22 * SS))
    img = Image.alpha_composite(img, halo)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([kx, ky, kx + card_w, ky + card_h], radius=10 * SS,
                        fill=(30, 33, 40), outline=(*ACCENT, 200), width=SS)
    d.rounded_rectangle([kx, ky, kx + card_w, ky + 12 * SS], radius=10 * SS, fill=(*ACCENT, 220))
    d.rectangle([kx, ky + 7 * SS, kx + card_w, ky + 12 * SS], fill=(*ACCENT, 220))
    # Avatar and structured lines: the experience, written the local way.
    ax, ay = kx + 20 * SS, ky + 30 * SS
    d.ellipse([ax, ay, ax + 34 * SS, ay + 34 * SS], fill=(52, 56, 66))
    for j, wf in enumerate((0.62, 0.84, 0.48)):
        ly = ay + 4 * SS + j * 12 * SS
        col = (*ACCENT, 210) if j == 0 else (*MUTED, 150)
        d.rounded_rectangle([ax + 46 * SS, ly, ax + 46 * SS + int(140 * SS * wf), ly + 6 * SS], radius=3 * SS, fill=col)
    for j, wf in enumerate((0.9, 0.75, 0.82)):
        ly = ky + 88 * SS + j * 16 * SS
        d.ellipse([kx + 20 * SS, ly, kx + 26 * SS, ly + 6 * SS], fill=(*ACCENT, 200))
        d.rounded_rectangle([kx + 34 * SS, ly, kx + 34 * SS + int(170 * SS * wf), ly + 6 * SS], radius=3 * SS, fill=(*MUTED, 140))
    # Entry point where the lines meet the card.
    d.ellipse([target[0] - 5 * SS, target[1] - 5 * SS, target[0] + 5 * SS, target[1] + 5 * SS], fill=(230, 250, 252, 240))

    finish(img.convert("RGB"), "it-generalist-cover.webp")


COVERS = {
    "network": network_cover,
    "id-cards": id_cards_cover,
    "generalist": generalist_cover,
}

if __name__ == "__main__":
    # `python3 scripts/generate_blog_covers.py generalist` builds one cover;
    # no argument rebuilds them all.
    import sys

    for name in sys.argv[1:] or COVERS:
        COVERS[name]()
