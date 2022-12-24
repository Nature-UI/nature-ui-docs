import { Box, Container, IconButton, Stack } from "@nature-ui/core";
import siteConfig from "configs/site-config";
import Link from "next/link";
import { ElementType, FC } from "react";
import {
  IoGlobeOutline,
  IoLogoDiscord,
  IoLogoGithub,
  IoLogoTwitter,
} from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { NigeriaFlag } from "./nigerian-flag";

// 🇳🇬

export const links = [
  {
    icon: IoLogoGithub,
    label: "Github",
    href: "https://github.com/dnature",
  },
  {
    icon: IoLogoTwitter,
    label: "Twitter",
    href: "https://twitter.com/DivineHycenth",
  },
  {
    icon: IoGlobeOutline,
    label: "Website",
    href: "https://divinehycenth.com",
  },
  {
    icon: MdEmail,
    label: "Email",
    href: "mailto:contact@divinehycenth.com",
  },
  {
    icon: IoLogoDiscord,
    label: "Discord",
    href: siteConfig.discord.url,
  },
];

type FooterLinkProps = {
  icon?: ElementType;
  href: string;
  label?: string;
};

const FooterLink: FC<FooterLinkProps> = ({
  icon: Icon,
  href,
  label,
  ...rest
}) => (
  <Box as="span" {...rest}>
    <Link href={href} aria-label={label} target="_blank">
      <IconButton icon={<Icon />} size="lg" className="text-gray-100" />
    </Link>
  </Box>
);

const Footer = () => {
  return (
    <Box as="footer" className="border-t bg-white text-center py-16">
      <Container size="xs" centered>
        <p className="text-sm">
          <span>
            Proudly made in
            <NigeriaFlag />
          </span>
          <span>by Divine Hycenth</span>
        </p>
        <Stack row spacing="1rem" className="justify-center mt-3">
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
