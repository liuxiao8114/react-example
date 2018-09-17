const users = {
  4: { name: 'M'},
  5: { name: 'Roiye'}
}

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substring('/users/'.length), 10)
    process.nextTick(
      () => users[userID] ?
      resolve(users[userID]) : reject({ error: 'User with ' + userID + ' not found.' })
    )
  })
}
