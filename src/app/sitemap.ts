// src/app/sitemap.ts
export default async function sitemap() {
  return [
    {
      url: "https://www.rangercattleco.com/",
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.rangercattleco.com/about",
      changefreq: "monthly",
    },
    {
      url: "https://www.rangercattleco.com/products",
      changefreq: "weekly",
    },
    {
      url: "https://www.rangercattleco.com/contact",
      changefreq: "monthly",
    },
  ];
}
