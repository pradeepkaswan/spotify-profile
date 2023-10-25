import { Router } from 'express'
import { generateCodeVerifier } from '../utils/generateCodeVerifier.js'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, FRONTEND_URI } from '../utils/config.js'
import axios from 'axios'
import path from 'path'
import querystring from 'querystring'

const router = Router()
const stateKey = 'spotify_auth_state'

router.get('/login', (req, res) => {
  const state = generateCodeVerifier(16)
  res.cookie(stateKey, state)

  const scope = ['user-read-private', 'user-read-email', 'user-top-read'].join(
    ' ',
  )

  const queryParams = querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: state,
    scope: scope,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

router.get('/callback', (req, res) => {
  const code = req.query.code || null

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        })

        res.redirect(`${FRONTEND_URI}/?${queryParams}`)

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`)
      }
    })
    .catch(error => {
      res.send(error)
    })
})

router.get('/refresh_token', async (req, res) => {
  const { refresh_token } = req.query

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      res.send(error)
    })
})

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

export default router