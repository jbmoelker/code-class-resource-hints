const express = require('express')
const path = require('path')
const portfinder = require('portfinder')
const renderer = require('./lib/renderer')

const app = express()
const enableCaching = false // prevent caching to make perf exercise consistent
portfinder.basePort = 3000

app.set('etag', enableCaching)
app.use('/assets/', express.static(path.join(__dirname, 'src', 'assets'), { etag: enableCaching, lastModified: enableCaching }))

app.get('/', (req, res) => res.send(renderer.render(path.join('views', 'index.html'))))

app.get('/:page', (req, res) => {
	const { page } = req.params
	const filename = path.join('views', 'exercises', `${page}.html`)
	res.send(renderer.render(filename))
})

portfinder.getPortPromise().then(port => {
	app.listen(port, () => console.log(`Server ready on http://localhost:${port}`))
})
