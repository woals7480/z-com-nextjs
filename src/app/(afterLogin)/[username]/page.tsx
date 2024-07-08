import styles from "./profile.module.css";
import Post from "@/app/(afterLogin)/_components/Post";
import BackButton from "@/app/(afterLogin)/_components/BackButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserPosts from "./_components/UserPosts";
import UserInfo from "./_components/UserInfo";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";

type Props = {
  param: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
