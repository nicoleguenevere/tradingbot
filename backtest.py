import backtrader as bt
import datetime
from datetime import datetime


cerebro = bt.Cerebro()

data = bt.feeds.GenericCSVData(
    dataname='2019-2020minutes.csv', 
    dtformat=lambda x: datetime.datetime.utcfromtimestamp(float / 1000),
    fromdate = datetime.datetime.strptime('2020-07-01', '%Y-%m-%d'),
    todate = datetime.datetime.strptime('2020-07-12', '%Y-%m-%d'),
    nullvalue=0.0,
)

cerebro.adddata(data)

cerebro.run()

cerebro.plot()

