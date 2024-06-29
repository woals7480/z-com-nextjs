import styles from "./page.module.css";
import Image from "next/image";
import zLogo from "../../../public/zlogo.png";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Main from "@/app/(beforeLogin)/_components/Main";

export default function Home() {
  const session = auth();
  if(session?.user){
    redirect('/home');
    return null;
  }

  return (
    <>
      <Main />
    </>
  );
}
