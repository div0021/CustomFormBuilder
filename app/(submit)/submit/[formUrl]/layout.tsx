import Logo from "@/components/logo";
import UserTheme from "@/components/user-theme";
import { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full h-screen bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <UserTheme />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}
export default Layout;
