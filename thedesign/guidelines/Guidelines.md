# Design Guidelines

**Stance: Minimalist (Apple-inspired)**

A premium, modern SaaS developer portfolio website.

## Canvas & Ground
- **Background**: Soft off-white canvas `#FAFAFA`
- **Ambient**: A subtle, heavily blurred mesh gradient containing Deep Violet `#4A00E0` and Neon Purple `#8E2DE2` adds depth without clutter.

## Typography
- **Primary Typeface**: Inter
- Strong contrast in headings (slate 800) with muted, lightweight body text.

## Glassmorphism
- Elements rely on `backdrop-blur-xl` over a translucent white `bg-white/60` background.
- Emphasized by an inner `border-white/60` stroke and a very soft drop shadow for elevation.

## Tokens
- `--color-primary`: `#8E2DE2`
- `--color-background`: `#FAFAFA`
- `--color-foreground`: `#0f172a`
- `--color-muted-foreground`: `#64748b`

## Interactive States
- Hover actions subtly translate elements upwards and amplify their box-shadow with a neon purple tint.
