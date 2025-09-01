/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bof-bg)",
        fg: "var(--bof-fg)",
        muted: "var(--bof-muted)",
        border: "var(--bof-border)",
        brand: {
          DEFAULT: "var(--bof-primary)",
          fg: "var(--bof-on-primary)",
        },
        accent: {
          DEFAULT: "var(--bof-accent)",
          fg: "var(--bof-on-accent)",
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
}
