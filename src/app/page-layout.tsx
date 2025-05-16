import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

type PageLayoutProps = {
  title: string;
  contentDescription: string;
  children: ReactNode;
};

const PageLayout = (props: PageLayoutProps) => {
  return (
    <html lang="en">
      <body className="bg-bg text-primary">
        <Head>
          <title>{props.title}</title>
          <meta name="description" content={props.contentDescription} />
          <meta name="robots" content="index, follow" />
        </Head>
        <main className="flex min-h-screen min-w-screen flex-col items-center justify-center px-0 md:p-24 2xl:px-96">
          <Header />
          {props.children}
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default PageLayout;
