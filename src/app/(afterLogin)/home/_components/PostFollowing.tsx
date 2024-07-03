"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostFollowing } from "@/app/(afterLogin)/home/_lib/getPostFollowing";
import Post from "@/app/(afterLogin)/_components/Post";
import { Post as IPost } from "@/model/Post";

export default function PostFollowing() {
  const { data } = useQuery({
    queryKey: ["posts", "followings"],
    queryFn: getPostFollowing,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000,
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
