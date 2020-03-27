import React, { Component } from 'react'
import Post from './Post'
import { get } from 'axios'

export class Posts extends Component {
  state = {
    posts: null
  }

  fetchPosts = async () => {
    const { data } = await get('https://jsonplaceholder.typicode.com/posts')
    return data
  }

  fetchAndSetPosts = async () => {
    const posts = await this.fetchPosts()
    this.setState({ posts })
  }

  componentDidMount() {
    this.fetchAndSetPosts()
  }

  renderPosts = () => {
    const { posts } = this.state
    return posts.map((post, index) => <Post key={index} {...post} />)
  }

  render() {
    if (!this.state.posts) {
      return <p>Loading...</p>
    }
    return <div>{this.renderPosts()}</div>
  }
}

export default Posts
