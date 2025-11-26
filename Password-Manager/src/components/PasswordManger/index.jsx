import { Component } from 'react'
import { v4 } from 'uuid'

import CommentItem from '../PasswordItem'
import './style.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    passwordInput: '',
    commentInput: '',
    commentsList: [],
    showPasswordInput: false,
  }

  // Delete single comment
  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(each => each.id !== id),
    }))
  }

  // Toggle Like
  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return { ...each, isLiked: !each.isLiked }
        }
        return each
      }),
    }))
  }

  // Toggle password visibility for input form
  toggleShowPasswordInput = () => {
    this.setState(prevState => ({
      showPasswordInput: !prevState.showPasswordInput,
    }))
  }

  // Toggle password visibility for individual comment
  togglePasswordVisibility = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return { ...each, showPassword: !each.showPassword }
        }
        return each
      }),
    }))
  }

  // Clear all comments
  clearAllComments = () => {
    this.setState({ commentsList: [] })
  }

  // Submit new comment
  onAddComment = event => {
    event.preventDefault()
    const { nameInput, passwordInput, commentInput } = this.state

    if (!nameInput || !passwordInput || !commentInput) return

    const randomBgColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const newComment = {
      id: v4(),
      name: nameInput,
      password: passwordInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      showPassword: false,
      initialClassName: `initial-container ${randomBgColor}`,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      passwordInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({ nameInput: event.target.value })
  }

  onChangePasswordInput = event => {
    this.setState({ passwordInput: event.target.value })
  }

  onChangeCommentInput = event => {
    this.setState({ commentInput: event.target.value })
  }

  renderCommentsList = () => {
    const { commentsList } = this.state
    if (commentsList.length === 0) {
      return <p className="no-comments">No comments yet. Be the first to comment!</p>
    }
    return commentsList.map(each => (
      <CommentItem
        key={each.id}
        commentDetails={each}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
        togglePasswordVisibility={this.togglePasswordVisibility}
      />
    ))
  }

  render() {
    const { nameInput, passwordInput, commentInput, commentsList, showPasswordInput } =
      this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>

          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Share your thoughts about 4.0 Technologies
              </p>

              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />

              <div className="password-container">
                <input
                  type={showPasswordInput ? 'text' : 'password'}
                  className="password-input"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={this.toggleShowPasswordInput}
                >
                  {showPasswordInput ? 'Hide' : 'Show'}
                </button>
              </div>

              <textarea
                className="comment-input"
                placeholder="Your Comment"
                rows="6"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />

              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>

            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>

          <hr className="line" />

          <p className="heading">
            <span className="comments-count">{commentsList.length}</span> Comments
          </p>

          <button
            type="button"
            className="clear-all-button"
            onClick={this.clearAllComments}
            disabled={commentsList.length === 0}
          >
            Clear All Comments
          </button>

          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
