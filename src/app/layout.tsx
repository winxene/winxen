import "../styles/globals.css";
import LoadingProvider from "@/contexts/LoadingProvider";

export const metadata = {
  title: "Winxen's Portfolio Website",
  description: "Presenting Winxen's work and projects.",
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
