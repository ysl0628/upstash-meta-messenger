import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: '1535097',
  key: 'd0b9c9a121c8728fcb55',
  secret: '2f630e7174a2d342dddd',
  cluster: 'ap3',
  useTLS: true,
})

export const clientPusher = new ClientPusher('d0b9c9a121c8728fcb55', {
  cluster: 'ap3',
  forceTLS: true, // ?
})
