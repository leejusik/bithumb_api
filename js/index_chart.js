function chart(ctx) {
	return new Chart(ctx, {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: 'Coin Price',
				fill: false,
				borderColor: 'rgba(0,0,0,0.5)',
				pointRadius: 0,
				data: []
			},
			{
				label: 'Moving Average Line',
				fill: false,
				borderColor: 'rgba(0,0,0,0.3)',
				pointRadius: 0,
				data: []
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Chart.js Line Chart'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Time'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Price'
					}
				}]
			}, elements: {
				line: {
					tension: 0.15, // disables bezier curves
				}
			}
		}
	})
}