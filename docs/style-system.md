### Dynamic Styling System (Tailwind v4 + CSS Variables)

This document explains how the widget consumes the API `style` configuration and exposes Tailwind v4 utilities and theme tokens that components (including shadcn/ui) can use.

The system is API‑driven: values are read at runtime and injected as CSS custom properties on the widget root element. Tailwind v4 utilities read from those variables.

#### Scope and Goals
- Normalize and merge the API `style` config into stable CSS variables.
- Provide Tailwind v4 utilities to consume those variables (no rebuild needed at runtime).
- Bridge API variables to Tailwind theme tokens used by shadcn (`--primary`, `--accent`, `--background`, etc.).
- Ensure sensible fallbacks and strong readability (auto‑contrast + context overrides).

---

### API → CSS variable mapping

Supported style groups and properties (only the keys listed below are used; no invented properties):

- style.general
  - `font` | `font_family` → `--style-general-font`
  - `font_color` → `--style-general-font-color`
  - `background_color` → `--style-general-bg-color`
  - `secondary_background_color` → `--style-general-secondary-bg-color`
  - `secondary_border_radius` → `--style-general-secondary-border-radius`
  - `font_url` (if provided and valid) is loaded via a `<link>` (family from `font` | `font_family`)

- style.button
  - `font` | `font_family` → `--style-button-font`
  - `font_color` → `--style-button-font-color`
  - `background_color` → `--style-button-bg-color`
  - `icon_color` → `--style-button-icon-color`
  - `border_radius` → `--style-button-border-radius`
  - `secondary_border_radius` → `--style-button-secondary-border-radius`

- style.steps
  - `font` | `font_family` → `--style-steps-font`
  - `font_color` → `--style-steps-font-color`
  - `background_color` → `--style-steps-bg-color`
  - `icon_color` → `--style-steps-icon-color`

- style.titles
  - `font` | `font_family` → `--style-titles-font`
  - `font_color` → `--style-titles-font-color`

- style.cta (new)
  - `font` | `font_family` → `--style-cta-font`
  - `font_color` → `--style-cta-font-color`
  - `background_color` → `--style-cta-bg-color`
  - `border_radius` → `--style-cta-border-radius`

Notes:
- 8‑digit hex colors like `#RRGGBBAA` are accepted; luminance calculation strips the alpha for contrast decisions.
- For fonts, the code prefers `font` and falls back to legacy `font_family`.

---

### Tailwind v4 utilities (shortcuts)

You can always use arbitrary values like `text-[var(--style-button-font-color)]`. For convenience, the following `@utility` classes are defined in `src/assets/index.css`:

- Font family
  - `font-general` → `font-family: var(--style-general-font)`
  - `font-button` → `font-family: var(--style-button-font)`
  - `font-steps` → `font-family: var(--style-steps-font)`
  - `font-titles` → `font-family: var(--style-titles-font)`
  - `font-cta` → `font-family: var(--style-cta-font)`

- Text color
  - `text-general` → `color: var(--style-general-font-color)`
  - `text-button` → `color: var(--style-button-font-color)`
  - `text-steps` → `color: var(--style-steps-font-color)`
  - `text-titles` → `color: var(--style-titles-font-color)`
  - `text-cta` → `color: var(--style-cta-font-color)`

- Background color
  - `bg-general` → `background-color: var(--style-general-bg-color)`
  - `bg-general-secondary` → `background-color: var(--style-general-secondary-bg-color)`
  - `bg-button` → `background-color: var(--style-button-bg-color)`
  - `bg-steps` → `background-color: var(--style-steps-bg-color)`
  - `bg-cta` → `background-color: var(--style-cta-bg-color)`

- Icon color
  - `icon-button` → `color/fill/stroke: var(--style-button-icon-color)`
  - `icon-steps` → `color/fill/stroke: var(--style-steps-icon-color)`

- Border radius
  - `rounded-button` → `border-radius: var(--style-button-border-radius)`
  - `rounded-button-secondary` → `border-radius: var(--style-button-secondary-border-radius)`
  - `rounded-general-secondary` → `border-radius: var(--style-general-secondary-border-radius)`
  - `rounded-cta` → `border-radius: var(--style-cta-border-radius)`

These utilities are available anywhere inside the widget subtree.

---

### Default dynamic border-radius wiring (Buttons and Fields)

To satisfy the requirement that buttons and fields respect the API-driven radius values, the components are wired as follows by default:

- Buttons (shadcn `<Button/>`):
  - Use the utility `rounded-button`, which reads `--style-button-border-radius` (from `style.button.border_radius`).
  - Implementation: the base class in `src/components/ui/button/index.ts` includes `rounded-button` and no longer hard-codes `rounded-*` at variant/size level (no conflicts).

- Fields (form inputs):
  - Text input (`src/components/ui/input/Input.vue`) uses `rounded-general-secondary`, which reads `--style-general-secondary-border-radius` (from `style.general.secondary_border_radius`).
  - Select trigger (`src/components/ui/select/SelectTrigger.vue`) uses `rounded-general-secondary` as well.

Overrides/notes:
- If a field should instead use the button radius, add `rounded-button` to its `class`.
- If a specific component needs a fixed radius, you can still append a Tailwind radius utility (e.g., `rounded-lg`). Because utilities are applied in order, a later class may override the earlier one.

This wiring ensures both “buttons” and “fields” get their radius from the API out of the box:
- Buttons → `style.button.border_radius`
- Fields → `style.general.secondary_border_radius`

If `secondary_border_radius` is omitted, the CSS utility falls back to `--radius` from the theme, keeping appearance consistent.

---

### Bridging to Tailwind theme tokens (shadcn compatibility)

Runtime mapping in `useHookStyles` sets standard tokens so existing shadcn variants Just Work:

- Button → primary tokens
  - `--primary` ← `button.background_color` (fallback: `general.background_color`)
  - `--primary-foreground` ← `button.font_color` (fallback: `general.font_color`)

- CTA → accent tokens
  - `--accent` ← `cta.background_color`
  - `--accent-foreground` ← `cta.font_color` (fallback: `general.font_color`)

- General → base tokens
  - `--background` ← `general.background_color`
  - `--foreground` ← `general.font_color`
  - `--font-sans` ← `general.font | general.font_family | Roboto, 'Open Sans', sans-serif`

- General secondary → secondary tokens
  - `--secondary` ← `general.secondary_background_color`
  - `--secondary-foreground` ← `general.font_color` (safe default)

Because shadcn buttons use `bg-primary text-primary-foreground`, they automatically reflect the API styles. You can also create CTA‑like components using `bg-accent text-accent-foreground` or the `bg-cta text-cta` utilities above.

---

### Merge and override behavior

1) General values are the base for the app.
2) Component‑specific values (button/steps/titles/cta) override the base if provided.
3) If `general.font_color` exists, it’s used as default text color for all groups unless the group explicitly sets its own `font_color`.
4) Fonts resolve in this order per group: `font` → `font_family` → `general.font`/`font_family` → default fallback (`Roboto, 'Open Sans', sans-serif`).
5) Auto‑contrast fills missing `font_color`/`icon_color` based on the component’s background (or general background if the component has none), choosing black on light backgrounds and white on dark backgrounds.
6) Context‑aware overrides: when the global background is dark, we inject CSS that ensures light containers (dialogs, modals, white sections) use readable text (`--style-titles-font-color: #000`, `--style-general-font-color: #606060`).

Auto‑contrast and overrides are implemented in `src/composables/useTextColorFromBackground.ts`.

---

### Files and responsibilities

- `src/constants/conf.ts`
  - Declares the mapping list (`styleProperties`) that ties API groups to CSS variable names for colors, fonts, icons, and radii. Also contains secondary surface and CTA mappings.

- `src/composables/hooks/useHookStyles.ts`
  - Loads optional custom font (`general.font_url`).
  - Normalizes/merges the API config, applies auto‑contrast unless `general.font_color` is provided globally.
  - Sets CSS variables on the widget root element.
  - Injects context‑aware CSS overrides for readability on light containers when global background is dark.
  - Bridges API styles to Tailwind tokens (`--primary`, `--accent`, `--background`, `--foreground`, `--secondary`, `--font-sans`).

- `src/assets/index.css`
  - Declares default values for all `--style-*` variables to satisfy Tailwind’s static analysis.
  - Defines Tailwind v4 `@utility` classes (e.g., `font-titles`, `bg-button`, `text-cta`, `rounded-button`).

- `src/composables/useCustomFont.ts`
  - Validates and loads remote font CSS via `<link>`, with timeout and error handling.

- `src/composables/useTextColorFromBackground.ts`
  - Provides luminance calculation and context‑aware overrides.

- `src/types/form.type.ts`
  - Defines the `StyleDataType` shape and supported fields.

---

### Usage examples (Vue + Tailwind v4)

Root wrapper:
```vue
<div id="appWrapper" ref="widgetRefForStyle" class="font-general">
  <!-- the rest of the app -->
  ...
  <Button class="rounded-button font-button" />
  <section class="bg-general-secondary rounded-general-secondary p-4">
    <h2 class="font-titles text-titles text-2xl">Section Title</h2>
  </section>
  <div class="bg-cta text-cta font-cta rounded-cta px-4 py-2">Call to action</div>
</div>
```

Arbitrary values (anywhere inside the widget):
```html
<div class="text-[var(--style-general-font-color)] bg-[var(--style-button-bg-color)] font-[var(--style-general-font)]"></div>
```

shadcn Button (no changes required):
```vue
<Button class="rounded-button font-button" />
<!-- uses bg-primary / text-primary-foreground behind the scenes -->
```

Steps/Accordion:
```html
<div class="bg-steps text-steps font-steps">
  <Icon class="icon-steps" />
  ...
  <button class="bg-button text-button rounded-button">Next</button>
  <button class="bg-cta text-cta rounded-cta">Pay now</button>
</div>
```

---

### Testing
1. Start the dev server:
```bash
pnpm dev
```
2. Open http://localhost:5173
3. Verify with your sample payload:
   - General background/text update the app container.
   - Buttons follow `style.button` (background, text color, radius, font).
   - Steps and Titles read their group variables.
   - CTA elements can use `bg-cta text-cta rounded-cta` and reflect `style.cta`.
   - Secondary surfaces use `bg-general-secondary` and the rounded utility if provided.
   - Arbitrary Tailwind `[var(--style-...)]` classes match live values.

---

### Design choices and fallbacks
- We intentionally avoid global leakage by applying CSS variables to the widget root element only.
- `general.font_color` short‑circuits auto‑contrast (acts as a global text default).
- Auto‑contrast is per‑group only if the group has its own `background_color`; we avoid assumptions when CSS defaults are unknown.
- CTA is mapped to Tailwind `--accent` tokens and `bg-cta/text-cta` utilities to avoid interfering with normal buttons (`--primary`).
- `general.secondary_background_color` feeds `--secondary` and a `bg-general-secondary` utility; foreground defaults to the global text color.

If your design later needs different token bridging (e.g., CTA → `--primary`), adjust the bridges in `useHookStyles` and update this doc accordingly.
