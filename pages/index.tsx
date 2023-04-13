import { Box, Button, Container } from "@nature-ui/core";
import Link from "next/link";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";
import { MdAccessibility, MdGrain, MdPalette } from "react-icons/md";

import { Feature } from "components/feature";
import Footer from "components/footer";
import Header from "components/header";
import SEO from "components/seo";
import siteConfig from "configs/site-config";

const Index = () => {
  return (
    <div className="bg-slate-100">
      <SEO
        title="Nature UI - A simple, modular, extensible and accessible component library based on tailwindcss that gives you the building blocks you need to build your React applications."
        description="Simple, Modular and Accessible UI Components based on Tailwindcss for your React Applications."
      />
      <Header />
      <main className="grid place-items-center w-full bg-white md:pb-24 pb-12 px-4 md:px-0">
        <Container size="md" className="text-center mt-16 md:mt-28 mb-12">
          <h1 className="text-4xl md:text-7xl font-bold md:font-black text-gray-1000 leading-10">
            Set of Lightview and fully customizable React Components optimized
            for <span className="text-primary-500">TailwindCss</span>
          </h1>

          <Box className="mt-12">
            <Link href="/getting-started">
              <Button
                size="lg"
                className="bg-primary-600 text-white w-full mb-4 sm:mb-0 sm:w-auto sm:mr-8 hover:opacity-80"
              >
                Get started
              </Button>
            </Link>
            <Link href={siteConfig.repo.url} target="_blank">
              <Button
                size="lg"
                color="gray-200"
                text="gray-1000"
                className="w-full sm:w-auto"
              >
                <IoLogoGithub size="1.5rem" className="mr-2" /> Github
              </Button>
            </Link>
          </Box>
        </Container>
      </main>
      <Box
        className="bg-no-repeat mb-6 bg-cover bg-top"
        css={{
          backgroundImage: "url('curves.svg')",
          height: "174.69px",
        }}
      />
      <Container
        className="py-24 px-8 xl:px-0 "
        centered
        size="lg"
        as="section"
      >
        <Box className="grid md:grid-cols-2 gap-8">
          <Feature icon={MdAccessibility} title="Accessible">
            Nature UI strictly follows WAI-ARIA standards for all components.
          </Feature>
          <Feature icon={MdGrain} title="Composable">
            Designed with composition in mind. Compose new components with ease.
          </Feature>
          <Feature icon={MdPalette} title="Themeable">
            Built upon tailwind css theming design system standard.
          </Feature>
          <Feature icon={AiFillThunderbolt} title="Developer Experience">
            Guaranteed to boost your productivity when building your app or
            website.
          </Feature>
        </Box>
      </Container>

      <Box className="bg-white py-32 md:px-4 xl:px-0" as="section">
        <Container size="lg" centered>
          <Box className="mb-12">
            <h2 className="text-3xl md:text-6xl font-black text-center text-gray-1000">
              Less code. More speed
            </h2>
            <p className="opacity-80 text-lg mt-3 md:mt-6 max-w-lg mx-auto text-center">
              Spend less time writing UI code and more time building a great
              experience for your customers.
            </p>
          </Box>
        </Container>
        <Box className="relative mx-auto px-4 max-w-7xl">
          <Box
            as="iframe"
            tabIndex={-1}
            src="https://codesandbox.io/p/sandbox/nature-ui-0eolr?file=src/App.jsx"
            css={{
              width: "100%",
              background: "white",
              height: "650px",
              border: "0",
              borderRadius: 8,
              overflow: "hidden",
              position: "static",
              zIndex: 0,
            }}
            className="shadow-2xl"
            title="Nature Playground"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default Index;
