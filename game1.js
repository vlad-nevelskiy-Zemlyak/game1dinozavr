const dino = document.getElementById('dino')
const cactus = document.getElementById('cactus')
const startButton = document.getElementById('startButton')
const game = document.getElementById('game')
const menu = document.getElementById('menu')
let isJumping = false
let isGameOver = false

startButton.addEventListener('click', startGame)

function startGame() {
	menu.style.display = 'none'
	game.style.display = 'block'
	document.addEventListener('keydown', function (event) {
		if (event.code === 'Space' && !isJumping) {
			jump()
		}
	})
}

function jump() {
	isJumping = true
	let jumpHeight = 0
	let upInterval = setInterval(() => {
		if (jumpHeight >= 150) {
			clearInterval(upInterval)
			let downInterval = setInterval(() => {
				if (jumpHeight <= 0) {
					clearInterval(downInterval)
					isJumping = false
				} else {
					jumpHeight -= 10
					dino.style.bottom = jumpHeight + 'px'
				}
			}, 20)
		} else {
			jumpHeight += 10
			dino.style.bottom = jumpHeight + 'px'
		}
	}, 20)
}

function checkCollision() {
	const dinoRect = dino.getBoundingClientRect()
	const cactusRect = cactus.getBoundingClientRect()

	if (
		dinoRect.right > cactusRect.left &&
		dinoRect.left < cactusRect.right &&
		dinoRect.bottom > cactusRect.top
	) {
		alert('Game Over')
		isGameOver = true
		location.reload() // Перезагрузка страницы для начала новой игры
	}
}

setInterval(() => {
	if (!isGameOver) {
		checkCollision()
	}
}, 10)
