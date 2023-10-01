import PropTypes from 'prop-types'

export default function Notification({ message }) {
  if (message === null) {
    return null
  }

  return <div className='message'>{message}</div>
}
7

Notification.propTypes = {
  message: PropTypes.string,
}
