import {
  getProfiles,
  getUserByUserId,
  getUserProfile,
  getUsers
} from "./user.selector"
import { createSelector } from "reselect"
import { getMemos } from "./memo.selector"

export const getUsersForSearch = category =>
  createSelector([getUsers, getProfiles], (users, profiles) => {
    return Object.values(users).map(user => {
      if (user) {
        const profile = profiles[user.uname]

        return {
          childKey: user.uname,
          category,
          title: user.uname,
          description: profile ? profile.text : "",
          image: profile ? profile.avatarUrl : ""
        }
      }
      return {}
    })
  })

export const getMemosForSearch = category =>
  createSelector([state => state, getMemos], (state, memos) => {
    return memos
      ? Object.values(memos).map(memo => {
          const user = getUserByUserId(memo.$meta.userId)(state)
          const profile = user ? getUserProfile(user.uname)(state) : undefined

          return memo && profile
            ? {
                childKey: memo.$scopeId,
                category,
                title: memo.message,
                image: profile.avatarUrl
              }
            : {}
        })
      : []
  })
