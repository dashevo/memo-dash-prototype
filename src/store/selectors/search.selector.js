import { getUsers } from './user.selector'
import { createSelector } from 'reselect'
import { getMemos } from './memo.selector'

export const getUsersForSearch = category =>
  createSelector([getUsers], users => {
    return Object.entries(users).map(entry => {
      const username = entry[0]
      const user = entry[1]

      return {
        childKey: username,
        category,
        title: user.username,
        description: user.profile.bio,
        image: user.profile.avatarUrl
      }
    })
  })

export const getMemosForSearch = category =>
  createSelector([getMemos, getUsers], (memos, users) => {
    return Object.entries(memos).map(entry => {
      const memoId = entry[0]
      const memo = entry[1]
      const user = users[memo.username]

      return {
        childKey: memoId,
        category,
        title: memo.memoText,
        image: user ? user.profile.avatarUrl : null
      }
    })
  })
