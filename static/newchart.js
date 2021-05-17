var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 600,
  	height: 300,
	layout: {
		backgroundColor: '#fffcf4',
		textColor: 'rgba(0, 0, 0, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	priceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
	},
});

chart.applyOptions({
    handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
    },
    handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
    },
});

chart.applyOptions({
    handleScroll: true,
    handleScale: false,
});

var candleSeries = chart.addCandlestickSeries({
	upColor: '#228B22',
	downColor: '#B22222', 
	borderDownColor: '#B22222',
	borderUpColor: '#228B22',
	wickDownColor: '#B22222',
	wickUpColor: '#228B22',
});

fetch('http://127.0.0.1:5000/history')
	.then((r) => r.json())
	.then((response) => {
		console.log(response)

		candleSeries.setData(response);
	})


var binanceSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_15m");

binanceSocket.onmessage = function (event) {	
	var message = JSON.parse(event.data);

	var candlestick = message.k;

	console.log(candlestick)

	candleSeries.update({
		time: candlestick.t / 1000,
		open: candlestick.o,
		high: candlestick.h,
		low: candlestick.l,
		close: candlestick.c
	})
}