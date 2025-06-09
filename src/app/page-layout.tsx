import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface PageLayoutProps {
  title: string;
  contentDescription: string;
  children: ReactNode;
}

const PageLayout = ({
  title,
  contentDescription,
  children,
}: PageLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-bg text-primary">
        <Head>
          <title>{title}</title>
          <meta name="description" content={contentDescription} />
          <meta name="robots" content="index, follow" />
        </Head>
        <main className="flex min-h-screen min-w-screen flex-col items-center justify-center px-0 md:px-24 md:pt-24 2xl:px-96 select-none">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default PageLayout;
