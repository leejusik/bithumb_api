class CoinManager {
	constructor(coin, callback) {
		this.coin = coin
		this.chartData = []
		this.recent = undefined
		this.callback = callback
		this.getData = sec => {
			var now = new Date() * 1;
			var term = sec * 1000;
			var currentData = this.chartData.filter(item => now - item.date < term);
			return {
				prices: currentData.map(item => item.closing_price),
				times: currentData.map(item => Math.round((item.date - now) / 1000))
			};
		}
		this.getMal = sec => {
			var now = new Date() * 1;
			var millisec = sec * 1000;
			return this.chartData.filter(item => now - item.date < term).map(data => {
				var count = 0;
				return this.chartData.reduce((pre, current) => {
					if (current.date <= data.date && data.date - current.date <= millisec) {
						count++;
						return pre + current.closing_price * 1;
					}
					else
						return pre;
				}, 0) / count;
			}).map(item => Math.round(item * 1000) / 1000);
		}
		setInterval(() => {
			$.ajax({
				url: 'https://api.bithumb.com/public/ticker/' + coin,
				success: data => {
					this.chartData.push(data.data);
					this.recent = data.data;
				},
			});
			this.chartData.length > 0 ? this.callback(this) : undefined;
		}, 1000);

	}
}

