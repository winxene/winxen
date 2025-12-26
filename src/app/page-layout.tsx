"use client";

import React, { ReactNode } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useLoading } from "@/contexts/LoadingProvider";

interface PageLayoutProps {
  children: ReactNode;
  hideDuringLoad?: boolean;
}

const PageLayout = ({
  children,
  hideDuringLoad = false,
}: PageLayoutProps) => {
  const isLoading = useLoading();

  return (
    <main className={`flex min-h-screen min-w-screen flex-col items-center justify-center px-[20%] select-none ${hideDuringLoad ? `transition-opacity ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}` : ''}`}>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default PageLayout;
