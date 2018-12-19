function round(value, digit = 1) {
	digit = Math.pow(10, digit)
	return Math.round(value * digit) / digit
}

class CoinManager {
	constructor(coin, callback, signalFunction, malSec = 60) {
		this.coin = coin
		this.chartData = []
		this.recent = undefined
		this.callback = callback
		this.signalFunction = signalFunction
		this.malSec = malSec
		this.getData = sec => {
			var now = new Date() * 1
			var term = sec * 1000
			var currentData = this.chartData.filter(item => now - item.date < term)
			return {
				data: currentData,
				times: currentData.map(item => Math.round((item.date - now) / 1000)),
				prices: currentData.map(item => round(item.closing_price, 3)),
				mal: currentData.map(item => round(item.mal)),
			}
		}
		setInterval(() => {
			$.ajax({
				url: 'https://api.bithumb.com/public/ticker/' + coin,
				success: data => {
					var data = data.data
					var now = new Date() * 1
					var count = 0
					var mal = this.chartData.reduce((pre, current) => {
						if (now - current.date > malSec * 1000) return pre
						count++
						return pre + current.closing_price * 1
					}, 0) / count
					data.mal = mal ? mal : data.closing_price * 1
					if (signalFunction) data.signals = signalFunction(this.recent, data)
					this.chartData.push(data)
					if (!data) throw new Error('!')
					this.recent = data
				},
			})
			this.chartData.length > 0 ? this.callback(this) : undefined
		}, 1000)
	}
}

