import siteConfig from "configs/site-config";
import { NextSeo } from "next-seo";

const SEO = ({ title, description }) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
);

export default SEO;
