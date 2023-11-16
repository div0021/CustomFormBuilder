import getCurrentUser from "@/actions/getCurrentUser";
import Auth from "@/components/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getCurrentUser();

   if(user){
    return redirect('/dashboard');
    
   }
  return (
   <div>
    <Auth />
   </div>
  )
}
