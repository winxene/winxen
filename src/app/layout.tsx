import "../styles/globals.css";
import LoadingProvider from "@/contexts/LoadingProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export const metadata = {
  title: "Winxen's Portfolio Website",
  description: "Presenting Winxen's work and projects.",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-primary">
        <ThemeProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
