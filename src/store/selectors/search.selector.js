import { getProfiles, getUsers } from "./user.selector"
import { createSelector } from "reselect"
import { getMemos } from "./memo.selector"

export const getUsersForSearch = category =>
  createSelector([getUsers, getProfiles], (users, profiles) => {
    return Object.values(users).map(user => {
      if (user) {
        const profile = profiles[user.regtxid]

        return {
          childKey: user.regtxid,
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
  createSelector(
    [getMemos, getUsers, getProfiles],
    (memos, users, profiles) => {
      return memos
        ? Object.values(memos).map(memo => {
            const user = users[memo.$meta.userId]
            const profile = profiles[memo.$meta.userId]

            return user && memo
              ? {
                  childKey: memo.$scopeId,
                  category,
                  title: memo.message,
                  image: profile ? profile.avatarUrl : null
                }
              : {}
          })
        : []
    }
  )
