import React, { Component } from 'react'

export class Post extends Component {
  render() {
    const { title, body } = this.props
    return (
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    )
  }
}

export default Post
