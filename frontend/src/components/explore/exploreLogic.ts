import { kea, path, afterMount, beforeUnmount, connect, defaults } from "kea";

import { loaders } from "kea-loaders";
import { api } from "../../lib/api";

import type { exploreLogicType } from "./exploreLogicType";
import { userLogic } from "../../userLogic";
import { DEFAULT_NO_DATA, PostData } from "../timeline/timelineLogic";

export const exploreLogic = kea<exploreLogicType>([
  path(["src", "components", "timeline", "exploreLogic"]),
  connect({ actions: [userLogic, ["loadUser"]] }),
  defaults(() => ({
    explorePosts: DEFAULT_NO_DATA,
  })),
  loaders(({ values }) => ({
    explorePosts: {
      loadExplorePosts: async (): Promise<PostData> => {
        try {
          const response = await api.get(
            `/posts/explore?page=${values.explorePosts.next_page}`
          );
          if (response.status === 200) {
            return {
              // TODO: If we store these in a separate reducer React will be better at DOM diffs rather than just reloading the whole page
              data: [...values.explorePosts.data, ...response.data.data],
              count: response.data.count,
              current_page: response.data.current_page,
              next_page: response.data.next_page,
            };
          }
          return DEFAULT_NO_DATA;
        } catch (error) {
          return DEFAULT_NO_DATA;
        }
      },
    },
  })),
  afterMount(({ actions }) => {
    actions.loadExplorePosts();
  }),
  beforeUnmount(({ actions }) => {
    actions.loadUser();
  }),
]);
