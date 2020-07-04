import BaseModal from '../../../shared/Modal'
import React, { Component } from 'react'
import Close from '../../../shared/Close'
import Permission from './Permission'
import Schedule from './Schedule'
import axios from 'axios'
// import process from 'process'
import { urlBase64ToUint8Array } from '../../../../utils/base64'

export class Modal extends Component {
  state = {
    subscription: null,
  }

  getIfHasSubscription = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready
      return registration && registration.pushManager.getSubscription()
    }
    return false
  }

  setSubscription = (subscription) => this.setState({ subscription })

  getAndSetSubscription = async () => {
    const subscription = await this.getIfHasSubscription()
    this.setSubscription(subscription)
  }

  async componentDidMount() {
    await this.getAndSetSubscription()
  }

  saveSubscription = (subscription) =>
    axios.post('/api/subscription', subscription)

  getApplicationKey = () => {
    const { REACT_APP_PUBLIC_KEY } = process.env
    return urlBase64ToUint8Array(REACT_APP_PUBLIC_KEY)
  }

  getSubscription = async () => {
    const registration = await navigator.serviceWorker.getRegistration()
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.getApplicationKey(),
    })
  }

  getAndSaveSubscription = async () => {
    const subscription = await this.getSubscription()
    await this.saveSubscription(subscription)
    this.setSubscription(subscription)
  }

  requestPermission = async () => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      await Notification.requestPermission()
      await this.getAndSaveSubscription()
    }
  }

  render() {
    const { id } = this.props
    const { subscription } = this.state
    return (
      <BaseModal id={id} footer={<Close />} title="Schedule Reminder">
        {subscription ? (
          <Schedule />
        ) : (
          <Permission requestPermission={this.requestPermission} />
        )}
      </BaseModal>
    )
  }
}

export default Modal
