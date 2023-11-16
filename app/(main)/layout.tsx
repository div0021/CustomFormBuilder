import getCurrentUser from "@/actions/getCurrentUser";
import Logo from "@/components/logo";
import UserButton from "@/components/user-button";
import { ReactNode } from "react";


async function Layout({children}:{children:ReactNode}){
    const user = await getCurrentUser();
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
                <Logo />
            <div className="flex gap-4 items center">
            <UserButton src={user?.image ? user.image : ""}/>

            </div>
            </nav>
            <main className="flex w-full flex-grow">
                {children}
            </main>
            </div>
    )

}
export default Layout