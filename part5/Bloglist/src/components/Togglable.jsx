import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='toggle-button' onClick={toggleVisibility}>
          {props.label}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Togglable
