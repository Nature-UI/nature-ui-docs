import siteConfig from 'configs/site-config';
import { NextSeo } from 'next-seo';

export const SEO = ({ title, description }) => (
	<NextSeo
		title={title}
		description={description}
		titleTemplate={siteConfig.seo.titleTemplate}
	/>
);
