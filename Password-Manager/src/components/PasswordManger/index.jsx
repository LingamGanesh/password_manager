import React, {useState} from 'react'
import PasswordItem from '../PasswordItem'
import './style.css'

const initialPasswords = []

const PasswordManager = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordsList, setPasswordsList] = useState(initialPasswords)
  const [searchInput, setSearchInput] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  const onAddPassword = event => {
    event.preventDefault()
    // only add when all fields non-empty
    if (
      website.trim() === '' ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      return
    }
    const newItem = {
      id: Date.now().toString(),
      website: website.trim(),
      username: username.trim(),
      password: password.trim(),
    }
    setPasswordsList(prev => [newItem, ...prev])
    setWebsite('')
    setUsername('')
    setPassword('')
  }

  const onDeletePassword = id => {
    setPasswordsList(prev => prev.filter(item => item.id !== id))
  }

  const filteredList = passwordsList.filter(item =>
    item.website.toLowerCase().includes(searchInput.toLowerCase()),
  )

  const passwordsCount = filteredList.length

  return (
    <div className="pm-app-bg">
      <div className="pm-container">
        <div className="pm-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="pm-logo"
          />
          <div className="pm-top-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pm-top-image"
            />
          </div>
        </div>

        <div className="pm-body">
          <div className="pm-form-section">
            <form className="pm-form" onSubmit={onAddPassword}>
              <h1 className="pm-form-heading">Add New Password</h1>
              <div className="pm-input-row">
                <div className="pm-input-wrapper">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="pm-input-icon"
                  />
                  <input
                    placeholder="Enter Website"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="pm-input"
                  />
                </div>
                <div className="pm-input-wrapper">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="pm-input-icon"
                  />
                  <input
                    placeholder="Enter Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="pm-input"
                  />
                </div>
                <div className="pm-input-wrapper">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="pm-input-icon"
                  />
                  <input
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pm-input"
                  />
                </div>

                <div className="pm-add-btn-wrapper">
                  <button type="submit" className="pm-add-btn">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="pm-passwords-section">
            <div className="pm-passwords-header">
              <h1 className="pm-heading">Your Passwords</h1>
              <div className="pm-search-count-row">
                <div className="pm-search-wrapper">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="pm-search-icon"
                  />
                  <input
                    placeholder="Search"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    className="pm-search-input"
                  />
                </div>
                <p className="pm-count">{passwordsCount}</p>
              </div>
            </div>

            <div className="pm-show-passwords-row">
              <input
                id="showPasswords"
                type="checkbox"
                checked={showPasswords}
                onChange={e => setShowPasswords(e.target.checked)}
              />
              <label htmlFor="showPasswords" className="pm-show-label">
                Show Passwords
              </label>
            </div>

            <hr className="pm-divider" />

            <div className="pm-list-section">
              {passwordsList.length === 0 ? (
                <div className="pm-no-passwords">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="pm-no-passwords-img"
                  />
                  <p className="pm-no-passwords-text">No Passwords</p>
                </div>
              ) : filteredList.length === 0 ? (
                <div className="pm-no-passwords">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="pm-no-passwords-img"
                  />
                  <p className="pm-no-passwords-text">No Passwords</p>
                </div>
              ) : (
                <ul className="pm-passwords-list">
                  {filteredList.map(item => (
                    <PasswordItem
                      key={item.id}
                      passwordDetails={item}
                      showPassword={showPasswords}
                      deletePassword={onDeletePassword}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordManager
