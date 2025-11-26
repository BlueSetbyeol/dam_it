import "./globals.css";
import Logo from "../../public/logo_dam_it.png";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="logo dam IT"
            className="logo"
            loading="eager"
          />
        </Link>
        <main>{children}</main>
        <footer>
          <p>Dam I.T.</p> <p>Made for the English Game</p>
        </footer>
      </body>
    </html>
  );
}
