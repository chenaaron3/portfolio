import Head from "next/head";
import Navbar from "~/components/Navbar";
import Cover from "~/components/Cover";
import Hero from "~/components/Hero";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { useScrollStore } from "~/store";
import About from "~/components/About";
import Skills from "~/components/Skills";

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
          <div className="h-[400vh]"></div>
        </div>
      </main>
    </>
  );
}
