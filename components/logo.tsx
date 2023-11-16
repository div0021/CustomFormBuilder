import Link from "next/link";


const Logo = () => {
    return (
        <Link href={"/dashboard"} className="font-bold text-3xl bg-gradient-to-r from-[#d896ff] to-[#660066] text-transparent bg-clip-text hover:cursor-pointer" >
            FormBuilder
        </Link>
    )
}
export default Logo;