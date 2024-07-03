"use client";

import { usePathname } from "next/navigation";
import styles from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_components/Trend";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import { Hashtag } from "@/model/HashTag";

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });

  const pathname = usePathname();
  if (pathname === "/explore") {
    return null;
  }
  if (session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend: Hashtag) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trendBg}>
      <div className={styles.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
