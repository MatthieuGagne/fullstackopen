
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationClass = type === 'error' ? 'error' : 'success'

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const notificationStyle = type === 'error' ? errorStyle : successStyle

  return (
    <div style={notificationStyle} className={notificationClass}>
      {message}
    </div>
  )
}

const Notifications = ({ errorMessage, successMessage }) => {
  
  return (
    <>
    <Notification message={errorMessage} type='error'/>
    <Notification message={successMessage} type='success'/>
    </>
  )
}

export default Notifications