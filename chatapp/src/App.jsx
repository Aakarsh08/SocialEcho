import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user,setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  return (
    <>
      <div>
        <form action="">
          <h1>Login</h1>
          <div className='name'>
            <input className='border-2 border-red-600 rounded-xl'type="text" id='name' placeholder='name'/>
          </div>
          <div className='name'>
            <input className='border-2 border-red-600 rounded-xl'type="text" id='email' placeholder='email'/>
          </div>
          <div className='name'>
            <input className='border-2 border-red-600 rounded-xl'type="password" id='password' placeholder='password'/>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
