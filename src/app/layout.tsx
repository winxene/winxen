import "../styles/globals.css";

export const metadata = {
  title: "Winxen's Portfolio Website",
  description: "Presenting Winxen's work and projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
