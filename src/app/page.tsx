"use client";

import { useEffect, useState, FC } from "react";
import Head from "next/head";
import Image from "next/image";

const constructionImages: string[] = [
  "wip-1.svg",
  "wip-2.svg",
  "wip-3.svg",
  "wip-4.svg",
];

export default function Home(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % constructionImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Work in Progress | Winxen Ryandiharvin</title>
        <meta
          name="description"
          content="This page is under construction. Work in progress, stay tuned for updates from Winxen Ryandiharvin."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex flex-col items-center">
          <Carousel images={constructionImages} current={current} />
          <h1 className="text-2xl font-bold text-center animate-fade-in-up mt-6">
            Work in progress, stay tuned!
          </h1>
        </div>
        <Footer />
      </main>
    </>
  );
}

interface CarouselProps {
  images: string[];
  current: number;
}

const Carousel: FC<CarouselProps> = ({ images, current }) => (
  <div className="mb-6 relative w-[300px] h-[300px] overflow-hidden">
    {images.map((img, idx) => (
      <Image
        key={img}
        src={img}
        alt={`Construction Logo ${idx + 1}`}
        width={300}
        height={300}
        priority={idx === current}
        className={`absolute top-0 left-0 transition-transform duration-700 ease-in-out ${
          idx === current
            ? "translate-x-0 opacity-100 z-10"
            : idx < current
              ? "-translate-x-full opacity-0 z-0"
              : "translate-x-full opacity-0 z-0"
        }`}
        style={{ pointerEvents: idx === current ? "auto" : "none" }}
      />
    ))}
  </div>
);

const Footer: FC = () => (
  <footer className="fixed bottom-0 left-0 w-full p-4 text-center animate-fade-in-up">
    <p>© 2024 Winxen Ryandiharvin. All rights reserved.</p>
    <p>
      <a
        href="https://github.com/winxene"
        className="hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/winxene
      </a>
    </p>
  </footer>
);
