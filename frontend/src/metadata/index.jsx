import { Helmet } from "react-helmet-async";

export const MetaData = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://benarbitrage.com/" />
      <meta property="og:site_name" content="Benarbitrage" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:image" content="/twitter-image.png" />

      <meta name="robots" content="index, follow, nocache" />
      <meta name="googlebot" content="index, follow" />

      <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
      <link
        rel="apple-touch-icon"
        href="/apple-icon.png"
        type="image/png"
        sizes="180x180"
      />
    </Helmet>
  );
};
