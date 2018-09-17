import * as user from '../user'
jest.mock('../request')

it('works with Promise', () => {
  return user.getUsername(4).then(name => expect(name).toEqual('M'))
})



/*

it('should fetch users', () => {
  const resp = { data: [{ name: 'Bob' }] }
  fetch.mockResolvedValue(resp)

  return fetch('/users/').then(result => expect(result).toEqual(resp))
})

function forEach(items, callback) {
  for(let item of items) {
    callback(item)
  }
}
const mockCallback = jest.fn()
forEach([0, 1], mockCallback)

it('works with mock basic', () => {
  expect(mockCallback.mock.calls.length).toBe(2)
  expect(mockCallback.mock.calls[0][0]).toBe(0)
  expect(mockCallback.mock.calls[1][0]).toBe(1)
//  expect(mockCallback.mock.results[0].value).toBe(42)
})


*/
