import React, { Component } from 'react'
import Calendar from 'react-calendar'
import Time from './Time'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'

export class Schedule extends Component {
  state = {
    date: new Date(),
    time: 0,
  }

  setKeyAndValue = (key, value) =>
    this.setState((prevState) => ({ ...prevState, [key]: value }))

  handleCalendarChange = (date) => this.setKeyAndValue('date', date)

  handleTimeChange = (event) => this.setKeyAndValue('time', event.target.value)

  getHoursAndMinutes = () => {
    const { time } = this.state
    const match = time.match(/(\d{2}):(\d{2})/)
    return {
      hours: match[1],
      minutes: match[2],
    }
  }

  getDateCopy = () => {
    const { date } = this.state
    let clone = new Date()
    clone.setTime(date.getTime())
    return clone
  }

  getDateWithTime = () => {
    const date = this.getDateCopy()
    const { hours, minutes } = this.getHoursAndMinutes()
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }

  submit = () => {
    const dateWithTime = this.getDateWithTime()
    const seconds = dateWithTime.getTime()
    return axios.post('/reminder', { time: seconds })
  }

  handleClick = this.submit

  render() {
    const { date, time } = this.state
    return (
      <div>
        <Calendar onChange={this.handleCalendarChange} value={date} />
        <Time onChange={this.handleTimeChange} value={time} />
        <div className="d-block">
          <button className="btn btn-primary" onClick={this.handleClick}>
            Set Reminder
          </button>
        </div>
      </div>
    )
  }
}

export default Schedule
