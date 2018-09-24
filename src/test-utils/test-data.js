export const testUsers = {
  alice: {
    username: 'alice',
    profile: {
      avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg',
      bio: 'Quod architecto molestias et.',
      followersCount: 1,
      followingCount: 1,
      likesCount: 2,
      username: 'alice'
    },
    userId: 'f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726',
    likes: [
      {
        idx: 5,
        relation: {
          username: 'bob',
          userId: 'c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c',
          index: 1
        }
      },
      {
        idx: 6,
        relation: {
          username: 'bob',
          userId: 'c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c',
          index: 2
        }
      }
    ],
    memoIds: ['[alice][1]', '[alice][2]'],
    followers: ['bob'],
    following: ['bob']
  },
  bob: {
    username: 'bob',
    profile: {
      avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/129.jpg',
      bio: 'Id qui nisi asperiores vel quo.',
      followersCount: 1,
      followingCount: 1,
      likesCount: 1,
      username: 'bob'
    },
    userId: 'c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c',
    likes: [
      {
        idx: 7,
        relation: {
          username: 'alice',
          userId: 'f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726',
          index: 1
        }
      },
      {
        idx: 8,
        relation: {
          username: 'alice',
          userId: 'f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726',
          index: 2
        }
      }
    ],
    memoIds: ['[bob][1]', '[bob][2]'],
    followers: ['alice'],
    following: ['alice']
  }
}

export const testMemos = {
  '[bob][1]': {
    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg',
    idx: 1,
    memoDatetime: '2018-07-26T16:45:08.218Z',
    memoLikesCount: 0,
    memoRepliesCount: 0,
    memoText: 'Qui magnam maiores laboriosam animi sit aut.',
    memoTipTotal: 0,
    username: 'bob'
  },
  '[bob][2]': {
    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg',
    idx: 2,
    memoDatetime: '2018-07-26T16:45:10.954Z',
    memoLikesCount: 0,
    memoRepliesCount: 0,
    memoText: 'Quia est odio nemo deserunt.',
    memoTipTotal: 0,
    username: 'bob'
  },
  '[alice][1]': {
    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg',
    idx: 1,
    memoDatetime: '2018-07-26T16:44:56.000Z',
    memoLikesCount: 1,
    memoRepliesCount: 0,
    memoText: 'Suscipit vel nobis.',
    memoTipTotal: 0,
    username: 'alice'
  },
  '[alice][2]': {
    avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg',
    idx: 2,
    memoDatetime: '2018-07-26T16:44:58.620Z',
    memoLikesCount: 0,
    memoRepliesCount: 0,
    memoText: 'Praesentium libero est repudiandae et repudiandae.',
    memoTipTotal: 0,
    username: 'alice'
  }
}
