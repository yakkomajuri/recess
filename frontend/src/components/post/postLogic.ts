import { createContext } from "react";
import { useQuery, useMutation, QueryClient } from "react-query";
import { api } from "../../lib/api";

export interface Post {
  post_uuid: string;
  post_name: string;
  post_description: string;
  post_published_date: string;
  post_like_count: number;
  post_url: string;
  post_comment_count: number;
  feed_name: string;
  feed_picture_url: string;
  feed_uuid: string;
  liked_by_user: boolean;
}

export interface PostComment {
  comment_uuid: string;
  comment_content: string;
  comment_timestamp: string;
  comment_user_picture_url: string;
  comment_username: string;
  comment_user_email: string;
}

export interface CommentToCreate {
  comment_content: string;
  comment_post_uuid: string;
}

const queryClient = new QueryClient();

export function usePost(postUuid: string) {
  const postQuery = useQuery(["post", postUuid], () => fetchPost(postUuid), {
    enabled: !!postUuid,
  });
  const commentsQuery = useQuery(
    ["comments", postUuid],
    () => fetchComments(postUuid),
    {
      enabled: !!postUuid,
    }
  );

  const likeMutation = useMutation(() => api.post(`/posts/${postUuid}/like`), {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["post", postUuid]);
    },
  });

  const unlikeMutation = useMutation(
    () => api.post(`/posts/${postUuid}/unlike`),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["post", postUuid]);
      },
    }
  );

  const commentMutation = useMutation(
    (comment: CommentToCreate) => api.post(`/post_comments`, comment),
    {
      onSuccess: () => {
        // Invalidate and refetch comments
        queryClient.invalidateQueries(["comments", postUuid]);
        // Optionally invalidate and refetch post as well if needed
        queryClient.invalidateQueries(["post", postUuid]);
      },
    }
  );

  return {
    postQuery,
    commentsQuery,
    likeMutation,
    unlikeMutation,
    commentMutation,
  };
}

async function fetchPost(postUuid: string): Promise<Post | null> {
  try {
    const response = await api.get(`/posts/${postUuid}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function fetchComments(postUuid: string): Promise<PostComment[] | null> {
  try {
    const response = await api.get(`/post_comments?post_uuid=${postUuid}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
}
