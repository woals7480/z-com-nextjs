"use client";

import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "@/app/(afterLogin)/_lib/getFollowRecommends";
import FollowRecommend from "@/app/(afterLogin)/_components/FollowRecommend";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000,
  });

  return data?.map((user: User) => (
    <FollowRecommend key={user.id} user={user} />
  ));
}
