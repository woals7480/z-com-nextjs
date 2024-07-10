import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_components/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_components/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_components/Comments";
import ActionButtons from "@/app/(afterLogin)/_components/ActionButtons";
import styles from "./photoModal.module.css";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_components/PhotoModalCloseButton";
import { faker } from "@faker-js/faker";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_components/ImageZone";

type Props = {
  params: { id: string };
};

export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={styles.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
