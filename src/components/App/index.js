import React from 'react'
import './style.scss'
import zafClient from '../../zafClient'
import Footer from '../Footer'
import Login from '../Login'
import Map from '../Map';

const App = () => {
  const [requester, setRequester] = React.useState(null);
  const [isLoggedIn, setLog] = React.useState(false);

  React.useEffect(async () => {
    zafClient.invoke('resize', { height: '400px' })

    const data = await zafClient.get('ticket.requester')
    const requester = data['ticket.requester']
    setRequester(requester)
  }, [])

  return (
    <div className="App">
      {isLoggedIn ?  <Map /> : <Login isLoggedIn={isLoggedIn} setLog={setLog} />}
    </div>
  )
}

export default App