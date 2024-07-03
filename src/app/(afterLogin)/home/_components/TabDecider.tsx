"use client";

import { useContext } from "react";
import { TabContext } from "@/app/(afterLogin)/home/_components/TabProvider";
import PostRecommends from "@/app/(afterLogin)/home/_components/PostRecommends";
import PostFollowing from "@/app/(afterLogin)/home/_components/PostFollowing";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  if (tab === "rec") {
    return <PostRecommends />;
  }

  if (tab === "fol") {
    return <PostFollowing />;
  }

  return null;
}
