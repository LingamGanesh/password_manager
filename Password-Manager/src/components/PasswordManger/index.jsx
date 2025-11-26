import {Component} from 'react'
import {v4} from 'uuid'

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
    commentInput: '',
    commentsList: [],
  }

  // Delete Comment
  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        each => each.id !== id,
      ),
    }))
  }

  // Toggle Like
  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  // Render All Comments
  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(each => (
      <CommentItem
        key={each.id}
        commentDetails={each}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  // Submit Handler
  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    if (nameInput.trim() === '' || commentInput.trim() === '') return

    const randomBgColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: `initial-container ${randomBgColor}`,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>

          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>

              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />

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
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>

          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
