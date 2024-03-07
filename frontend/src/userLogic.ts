import { kea, path, afterMount, actions, reducers } from "kea";

import type { userLogicType } from "./userLogicType";
import { loaders } from "kea-loaders";
import { api } from "./lib/api";

export interface User {
  username: string;
  email: string;
  bio: string;
  feeds_following: string[];
}

export const userLogic = kea<userLogicType>([
  path(["src", "userLogic"]),
  actions(() => ({
    setLocalUser: (user: User) => ({ user }),
    setUser: (user: User | null) => ({ user }),
  })),
  loaders(({ actions }) => ({
    user: {
      loadUser: async (): Promise<User | null> => {
        try {
          const response = await api.get("/user/details");
          if (response.status === 200) {
            const user = response.data;
            actions.setLocalUser(user);
            return user;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    },
  })),
  reducers(() => ({
    // the idea of localUser is to enable following feeds on explore
    // for example without having the explore page refresh
    localUser: [
      null as User | null,
      {
        setLocalUser: (_, { user }) => user,
      },
    ],
    user: [
      null as User | null,
      {
        setUser: (_, { user }) => user,
      },
    ],
  })),

  afterMount(({ actions }) => {
    actions.loadUser();
  }),
]);
