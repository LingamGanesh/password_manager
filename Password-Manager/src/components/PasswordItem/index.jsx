import React from 'react'
import './style.css' // optional but we keep styling centrally in PasswordManager/styles.css too

const PasswordItem = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {id, website, username, password} = passwordDetails

  // initials to display as avatar (first char uppercase)
  const initial = website ? website[0].toUpperCase() : ''

  return (
    <li className="pm-item">
      <div className="pm-item-left">
        <div className="pm-avatar">{initial}</div>
        <div className="pm-item-info">
          <p className="pm-item-website">{website}</p>
          <p className="pm-item-username">{username}</p>
        </div>
      </div>

      <div className="pm-item-right">
        <div className="pm-password-display">
          {showPassword ? (
            <p className="pm-password-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="pm-stars-img"
            />
          )}
        </div>
        <button
          type="button"
          className="pm-delete-btn"
          onClick={() => deletePassword(id)}
          data-testid="delete"
          aria-label="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="pm-delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
