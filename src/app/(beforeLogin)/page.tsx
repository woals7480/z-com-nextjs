import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Main from "@/app/(beforeLogin)/_components/Main";

export default async function Home() {
  const session = await auth();
  
  if(session?.user){
    redirect('/home');
  }

  return (
    <>
      <Main />
    </>
  );
}
