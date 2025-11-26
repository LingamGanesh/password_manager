import { formatDistanceToNow } from 'date-fns'
import './style.css'

const CommentItem = props => {
  const { commentDetails, toggleIsLiked, deleteComment, togglePasswordVisibility } = props
  const { id, name, comment, isLiked, initialClassName, date, password, showPassword } =
    commentDetails

  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => toggleIsLiked(id)
  const onDeleteComment = () => deleteComment(id)
  const onTogglePassword = () => togglePasswordVisibility(id)

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
          <div className="comment-password">
            Password: <span className="password-text">{showPassword ? password : '••••••'}</span>
          </div>
        </div>
      </div>

      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button className={likeTextClassName} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>

        <div className="password-toggle-container">
          <button className="button" type="button" onClick={onTogglePassword}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>

        <button className="button" type="button" onClick={onDeleteComment}>
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>

      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
