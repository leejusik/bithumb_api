// 저녁에 7시 반부터 가능한 새론중
// 달에 15,000원
// +라켓값

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
				times: currentData.map(item => Math.round((item.date - now) / 1000)),
				prices: currentData.map(item => item.closing_price),
				mal: currentData.map(item => item.mal),
			}
		}
		setInterval(() => {
			$.ajax({
				url: 'https://api.bithumb.com/public/ticker/' + coin,
				success: data => {
					var now = new Date() * 1
					var count = 0
					data.data.mal = chartData.reduce((pre, current) => {
						if (now - current.date <= malSec * 1000) {
							count++
							return pre + current.closing_price * 1
						}
						else return pre
					}, 0) / count
					if (signalFunction) data.signals = signalFunction(recent, data.data)
					this.chartData.push(data.data)
					this.recent = data.data
				},
			})
			this.chartData.length > 0 ? this.callback(this) : undefined
		}, 1000);

	}
}

