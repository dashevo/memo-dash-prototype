import { getUsers } from "./user.selector"
import { createSelector } from "reselect"
import { getMemos } from "./memo.selector"

export const getUsersForSearch = category =>
  createSelector([getUsers], users => {
    return Object.entries(users).map(entry => {
      const username = entry[0]
      const user = entry[1]

      return user
        ? {
            childKey: username,
            category,
            title: user.uname,
            description: user.profile ? user.profile.bio : "",
            image: user.profile ? user.profile.avatarUrl : ""
          }
        : {}
    })
  })

export const getMemosForSearch = category =>
  createSelector([getMemos, getUsers], (memos, users) => {
    return memos && memos.length > 0
      ? Object.entries(memos).map(entry => {
          const memoId = entry[0]
          const memo = entry[1]
          const user = users[memo.username]

          return user && memo
            ? {
                childKey: memoId,
                category,
                title: memo.memoText,
                image: user ? user.profile.avatarUrl : null
              }
            : {}
        })
      : []
  })
