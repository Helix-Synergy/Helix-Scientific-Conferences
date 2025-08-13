// src/components/SEO.js
import React from "react";
import { Helmet } from "react-helmet";

export default function SEO({
  title,
  description,
  keywords,
  url,
  image,
  type = "website",
  schema,
  lang = "en",
  canonical,
  themeColor = "#000000",
}) {
  const safeTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;

  return (
    <Helmet>
      {/* HTML Language */}
      <html lang={lang} />

      {/* Standard Meta */}
      <title>{safeTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      )}
    </Helmet>
  );
}
