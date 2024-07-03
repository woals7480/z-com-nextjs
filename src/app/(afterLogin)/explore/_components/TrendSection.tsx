"use client";

import Trend from "@/app/(afterLogin)/_components/Trend";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import { Hashtag } from "@/model/HashTag";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
