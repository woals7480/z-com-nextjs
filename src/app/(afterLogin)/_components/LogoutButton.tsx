"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./logoutButton.module.css";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  console.log(me, "@@");

  if (!me?.user) {
    return null;
  }

  return (
    <button className={styles.logOutButton} onClick={onLogout}>
      <div className={styles.logOutUserImage}>
        {/* <Image src={me.user?.image as string} alt={me.user?.name as string} /> */}
        <img src={me.user?.image} alt={me.user?.id} />
      </div>
      <div className={styles.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
