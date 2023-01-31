import { useState } from "react"
import { useCookies } from "react-cookie"

export default function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [username, setUsername] = useState(null)

  const verLogin = estado => {
    setError(null)
    setIsLogin(estado)
  }

  const manejarEnvio = async(e, endpoint) => {
    e.preventDefault()
    const auxBody = { username:username, password:password }
    if (endpoint == 'signup') {
      auxBody['first_name'] = firstName
      auxBody.email = email
    }

    const response = await fetch(`http://localhost:8000/api/${endpoint}/`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ...auxBody })
    })

    const data = await response.json()
    console.log(data)
    // si ocurre error data.error or data.detail
    if (data.detail) {
      setError(data.detail)
    }
    else {
      setCookie('username', data.username)
      setCookie('password', data.password)
      setCookie('firstName', data.firstName)
      window.location.reload()
    }
  }

  return (
    <div>
      <div>
        <form>
          <h2>{ isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input type='text' placeholder="username"
            onChange={e => setUsername(e.target.value)}
          /> <br />
          { !isLogin &&
            <>
              <input type='email' placeholder="email"
                onChange={e => setEmail(e.target.value)}
              /> <br />
              <input type='text' placeholder="nombre completo"
                onChange={e => setFirstName(e.target.value)}
              /> <br />
            </>
          }
          <input type='password' placeholder="contraseña"
            onChange={e => setPassword(e.target.value)}
          /> <br />
          <input type='submit'
            onClick={e => manejarEnvio(e, isLogin ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>
        <div>
          <button onClick={() => verLogin(false)}>Sign up</button>
          <button onClick={() => verLogin(true)}>Log in</button>
        </div>
      </div>
    </div>
  )
}