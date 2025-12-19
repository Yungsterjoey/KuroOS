import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// VNC proxy - ALL paths under /vncproxy go to the container
app.use('/vncproxy', createProxyMiddleware({
  target: 'http://127.0.0.1:6080',
  ws: true,
  changeOrigin: true,
  pathRewrite: { '^/vncproxy': '' }
}))

// Static kurovnc files
app.use('/kurovnc', express.static('/var/www/kuroglass-vnc'))

// API proxy
app.use('/api', async (req, res) => {
  const url = `http://localhost:3001${req.url}`
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { ...req.headers, host: 'localhost:3001' },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    })
    const data = await response.text()
    res.status(response.status).send(data)
  } catch (e) {
    res.status(502).json({ error: 'API unavailable' })
  }
})

// Landing page
app.use('/components', express.static(path.join(__dirname, 'landing/components')))
app.use('/shared', express.static(path.join(__dirname, 'shared')))
app.use('/shared', express.static(path.join(__dirname, 'landing/shared')))

// Desktop apps
app.use('/desktop', express.static('/var/www/kuroglass-webde/public/desktop'))
app.use('/desktop-react', express.static('/var/www/kuroglass-webde/public/desktop-react'))
app.get('/desktop-react/*', (req, res) => {
  res.sendFile('/var/www/kuroglass-webde/public/desktop-react/index.html')
})

// Chat app
app.use('/chat', express.static(path.join(__dirname, 'chat/dist')))
app.get('/chat/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat/dist/index.html'))
})

// Linux page
app.get('/linux', (req, res) => res.sendFile('/var/www/kuroglass-webde/public/linux.html'))

// Landing page catch-all
app.use('/', express.static(path.join(__dirname, 'landing')))

const PORT = 3000
const server = app.listen(PORT, () => console.log(`Kuro running on port ${PORT}`))

// Enable websocket proxying
server.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith('/vncproxy')) {
    // Let http-proxy-middleware handle it
  }
})
