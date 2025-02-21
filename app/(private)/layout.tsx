import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import AccountDropdown from "@/components/AccountDropdown";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="admin-header ">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo-full.svg"
            width={162}
            height={32}
            alt="Logo"
            className="h-8 w-fit"
          />
        </Link>

        <AccountDropdown />
      </header>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  );
}
