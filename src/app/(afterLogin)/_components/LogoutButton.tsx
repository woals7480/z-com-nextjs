"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./logoutButton.module.css";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({redirect: false})
      .then(() => {
       router.replace('/') ;
    })
  };

  if(!me?.user){
    return null;
  }

  return (
    <button className={styles.logOutButton} onClick={onLogout}>
      <div className={styles.logOutUserImage}>
        <img src={me.user?.image} alt={me.user?.id} />
      </div>
      <div className={styles.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id}</div>
      </div>
    </button>
  );
}
