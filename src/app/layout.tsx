import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mercedes Luxury",
  description: "The New Era of Luxury",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-black m-0 p-0 text-white selection:bg-yellow-500">
        {children}
      </body>
    </html>
  );
}