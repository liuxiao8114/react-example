const Button = () => ({
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
})

const DangerButton = ({ children }) => ({
  type: Button,
  props: {
    color: 'red',
    children
  }
})

const DeleteAccount = () => ({
  type: 'div',
  props: {
    children: [
      {},
      {},
      {}
    ]
  }
})
