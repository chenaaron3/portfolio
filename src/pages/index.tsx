import Head from "next/head";
import Navbar from "~/components/Navbar";
import Cover from "~/components/Cover";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Skills from "~/components/Skills";
import Experience from "~/components/Experience";
import Projects from "~/components/Projects";
import Contacts from "~/components/Contacts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aaron Chen</title>
        <meta name="description" content="Aaron Chen's Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Cover />
        <div className="relative overflow-x-clip bg-[var(--bg-color)]">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects/>
          <Contacts/>
        </div>
      </main>
    </>
  );
}
