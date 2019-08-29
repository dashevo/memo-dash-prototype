export const testUsers = {
  d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d: {
    uname: "alice",
    regtxid: "d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d",
    pubkeyid: "5eab9ad2816c2109c89520f0e8375dbe04fffcb0",
    credits: 8000,
    data: "2d99b5a93aaae48124cf2159c49930ed46c5744b45468896422deacb4d58f4d8",
    state: "open",
    subtx: [
      "d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d",
      "66da3bba31d3b7bc42184d7d9dc8b147d1f28e4c1ced6779bc88d83c94361040",
      "b1b34f744c3eeef058b5cfffccaab5524c3aba34866a56eba9fbfcec464767fa"
    ]
  },
  c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f: {
    uname: "bob",
    regtxid: "c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f",
    pubkeyid: "0cb374838abe15cb96450121e400cfdbafcca2d1",
    credits: 10000,
    data: "0000000000000000000000000000000000000000000000000000000000000000",
    state: "open",
    subtx: ["c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f"]
  }
  // alice: {
  //   username: "alice",
  //   profile: {
  //     avatarUrl:
  //       "https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg",
  //     bio: "Quod architecto molestias et.",
  //     followersCount: 1,
  //     followingCount: 1,
  //     likesCount: 2,
  //     username: "alice"
  //   },
  //   userId: "f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726",
  //   likes: [
  //     {
  //       idx: 5,
  //       relation: {
  //         username: "bob",
  //         userId:
  //           "c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c",
  //         index: 1
  //       }
  //     },
  //     {
  //       idx: 6,
  //       relation: {
  //         username: "bob",
  //         userId:
  //           "c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c",
  //         index: 2
  //       }
  //     }
  //   ],
  //   memoIds: ["[alice][1]", "[alice][2]"],
  //   followers: ["bob"],
  //   following: ["bob"]
  // },
  // bob: {
  //   username: "bob",
  //   profile: {
  //     avatarUrl:
  //       "https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/129.jpg",
  //     bio: "Id qui nisi asperiores vel quo.",
  //     followersCount: 1,
  //     followingCount: 1,
  //     likesCount: 1,
  //     username: "bob"
  //   },
  //   userId: "c6e5e284054bcbcd2cddea1ec36579e1fdf8e788d8a46d0351e276b4d0bb297c",
  //   likes: [
  //     {
  //       idx: 7,
  //       relation: {
  //         username: "alice",
  //         userId:
  //           "f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726",
  //         index: 1
  //       }
  //     },
  //     {
  //       idx: 8,
  //       relation: {
  //         username: "alice",
  //         userId:
  //           "f0fd479ba875bf2232a4043dbefff24e2af2ca5ccd50b3ba9e91673707336726",
  //         index: 2
  //       }
  //     }
  //   ],
  //   memoIds: ["[bob][1]", "[bob][2]"],
  //   followers: ["alice"],
  //   following: ["alice"]
  // }
}

export const testMemos = {
  yPyxJ3ppBYhMWgCGrLXPGtEhfbAG6XP6WL: {
    $type: "memo",
    $scope: "b626a31be85752ee925a8d1aacf6a89d1cf7ec6b3e70824ce142c2f679cfe820",
    $scopeId: "yPyxJ3ppBYhMWgCGrLXPGtEhfbAG6XP6WL",
    $rev: 1,
    $action: 0,
    message: "Qui magnam maiores laboriosam animi sit aut.",
    createdAt: "2019-08-29T07:32:26.641Z",
    $meta: {
      userId: "d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d"
    }
  },
  yT1xBvinX2fNzbia3LxqKYaWD4JYta71Da: {
    $type: "memo",
    $scope: "b626a31be85752ee925a8d1aacf6a89d1cf7ec6b3e70824ce142c2f679cfe820",
    $scopeId: "yT1xBvinX2fNzbia3LxqKYaWD4JYta71Da",
    $rev: 1,
    $action: 0,
    message: "Quia est odio nemo deserunt.",
    createdAt: "2019-08-29T07:33:44.530Z",
    $meta: {
      userId: "d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d"
    }
  },
  aaVVBvinX2fNzbia3LxqKYaWD4JYta71Da: {
    $type: "memo",
    $scope: "b626a31be85752ee925a8d1aacf6a89d1cf7ec6b3e70824ce142c2f679cfe820",
    $scopeId: "aaVVBvinX2fNzbia3LxqKYaWD4JYta71Da",
    $rev: 1,
    $action: 0,
    message: "Lorem quia est odio nemo.",
    createdAt: "2019-08-29T07:33:44.530Z",
    $meta: {
      userId: "c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f"
    }
  }
}

export const testProfiles = {
  d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d: {
    $type: "userProfile",
    $scope: "ac431f268fc8044d6baa36eb58eab96d3efd4ef32a354e57fd04f17c52de947c",
    $scopeId: "yWzpUT3PNNo24Pa2maCMUXdBMBVKGBKkHH",
    $rev: 1,
    $action: 0,
    name: "Alice",
    text: "Hey, I'm Alice",
    address: "Wonderland",
    avatarUrl: "https://robohash.org/set_set2/bgset_bg2/ppkQqaIfGqx",
    $meta: {
      userId: "d4a093ed4e56c8c2411281d829715d9ab552c0bb762065c9ca1d96d3fd07866d"
    }
  },
  c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f: {
    $type: "userProfile",
    $scope: "uuuuuf268fc8044d6baa36eb58eab96d3efd4ef32a354e57fd04f17c52de947c",
    $scopeId: "qwEpUT3PNNo24Pa2maCMUXdBMBVKGBKkHH",
    $rev: 1,
    $action: 0,
    name: "Bob",
    text: "Hey, I'm Bob",
    address: "Greentown",
    avatarUrl: "http://robohash.org/set_set3/bgset_bg1/JNth88PrhGDhwp4LNQMt",
    $meta: {
      userId: "c56d7036d14071f7c2f16a64ea71fcdd41c90e9f2691de406e1847065267679f"
    }
  }
}

// export const testMemos = {
//   "[bob][1]": {
//     avatarUrl:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg",
//     idx: 1,
//     memoDatetime: "2018-07-26T16:45:08.218Z",
//     memoLikesCount: 0,
//     memoRepliesCount: 0,
//     memoText: "Qui magnam maiores laboriosam animi sit aut.",
//     memoTipTotal: 0,
//     username: "bob"
//   },
//   "[bob][2]": {
//     avatarUrl:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/rangafangs/128.jpg",
//     idx: 2,
//     memoDatetime: "2018-07-26T16:45:10.954Z",
//     memoLikesCount: 0,
//     memoRepliesCount: 0,
//     memoText: "Quia est odio nemo deserunt.",
//     memoTipTotal: 0,
//     username: "bob"
//   },
//   "[alice][1]": {
//     avatarUrl:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg",
//     idx: 1,
//     memoDatetime: "2018-07-26T16:44:56.000Z",
//     memoLikesCount: 1,
//     memoRepliesCount: 0,
//     memoText: "Suscipit vel nobis.",
//     memoTipTotal: 0,
//     username: "alice"
//   },
//   "[alice][2]": {
//     avatarUrl:
//       "https://s3.amazonaws.com/uifaces/faces/twitter/madcampos/128.jpg",
//     idx: 2,
//     memoDatetime: "2018-07-26T16:44:58.620Z",
//     memoLikesCount: 0,
//     memoRepliesCount: 0,
//     memoText: "Praesentium libero est repudiandae et repudiandae.",
//     memoTipTotal: 0,
//     username: "alice"
//   }
// }
