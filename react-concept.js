// Transformation
export function NameBox(name) {
  return {
    fontWeight: 'bold',
    labelContent : name
  }
}

// Abstraction
export function FancyUserName(user) {
  return {
    borderStyle: '2px solid red',
    childContent: [
      'Name: ', NameBox(user.firstname + ' ' + user.lastname)
    ]
  }
}

// Composition
export function FancyBox(...children) {
  return {
    borderStyle: '2px solid red',
    children
  }
}

export function UserBox(user) {
  return FancyBox([
    'Name: ', NameBox(user.firstname + ' ' + user.lastname)
  ])
}

// State
let likes = 0

function LikeButton(onClick) {
  onClick()
}

export function FancyNameBox(user, likes, onClick = __addMoreLikes) {
  return FancyBox([
    'Name: ', NameBox(user.firstname + ' ' + user.lastname),
    likes,
    LikeButton(onClick)
  ])
}

function __addMoreLikes() {
  likes++
  // rerender()
}

// Memoization
function memoize(fn) {
  let cachedArg, cachedResult
  return arg => {
    if(cachedArg !== arg) {
      cachedArg = arg
      cachedResult = fn(arg)
    }
    return cachedResult
  }
}

let MemoizedNameBox = memoize(NameBox)

export function NameAndAgeBox(user, currentTime) {
  return FancyBox([
    'Name: ', MemoizedNameBox(user.firstname + ' ' + user.lastname),
    'Age in milliseconds: ', currentTime - user.dateOfBirth
  ])
}

// Lists
function UserList(users, likesPerUser, updateUserLikes = __updateUserLikes) {
  return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    updateUserLikes(user.id, likesPerUser.get(user.id))
  ))
}

const allUserLikes = new Map()

function __updateUserLikes(id, usersLikes) {
  let likes = allUserLikes.get(id)
  if(!likes) allUserLikes.set(id, 0)
  else allUserLikes.set(id, likes++)
}

// Continuations

function FancyUserList(users) {
  return FancyBox()
}
