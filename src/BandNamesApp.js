import React from 'react'
import { SockectProvider } from './context/SocketContext'

import HomePage from './pages/HomePage'

export const BandNamesApp = () => {
  return (
    <SockectProvider>

        <HomePage   />

    </SockectProvider>
  )
}
