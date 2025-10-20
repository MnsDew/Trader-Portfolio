import { useState } from 'react';
import { TrendingUp, DollarSign, Coins, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChartData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const mockChartData: ChartData[] = [
  {
    symbol: 'EUR/USD',
    price: '1.0845',
    change: '+0.0023',
    changePercent: '+0.21%',
    isPositive: true
  },
  {
    symbol: 'GBP/USD',
    price: '1.2678',
    change: '-0.0012',
    changePercent: '-0.09%',
    isPositive: false
  },
  {
    symbol: 'USD/JPY',
    price: '149.23',
    change: '+0.45',
    changePercent: '+0.30%',
    isPositive: true
  },
  {
    symbol: 'XAU/USD',
    price: '2034.56',
    change: '+12.34',
    changePercent: '+0.61%',
    isPositive: true
  }
];

export const LiveChartsSection = () => {
  const { t } = useLanguage();
  const [activeChart, setActiveChart] = useState('EUR/USD');

  const TradingViewWidget = ({ symbol }: { symbol: string }) => {
    const widgetId = `tradingview_${symbol.replace('/', '')}`;
    
    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden bg-background">
        <iframe
          id={widgetId}
          src={`https://www.tradingview.com/widgetembed/?frameElementId=${widgetId}&symbol=${symbol}&interval=1&hidesidetoolbar=false&saveimage=false&toolbarbg=1a1a1a&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=aboudy-trader.com&utm_medium=widget&utm_campaign=chart&utm_term=${symbol}&hide_top_toolbar=false&hide_legend=false&transparency=true&allow_symbol_change=true`}
          className="w-full h-full border-0"
          title={`Live ${symbol} Chart`}
          allow="clipboard-write"
          loading="lazy"
        />
      </div>
    );
  };

  const getIcon = (symbol: string) => {
    if (symbol.includes('XAU')) return <Coins className="h-4 w-4" />;
    if (symbol.includes('USD')) return <DollarSign className="h-4 w-4" />;
    return <BarChart3 className="h-4 w-4" />;
  };

  return (
    <section id="charts" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 pb-4 text-gradient-gold">
            {t('charts.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('charts.description')}
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-forex-profit/10 text-forex-profit border border-forex-profit/20">
              <div className="w-2 h-2 bg-forex-profit rounded-full mr-2 animate-pulse ml-2"></div>
              {t('charts.live_indicator')}
            </span>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {mockChartData.map((data) => (
            <Card key={data.symbol} className="premium-card cursor-pointer hover:scale-105 transition-transform">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon(data.symbol)}
                    <span className="font-semibold text-sm">{data.symbol}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={data.isPositive ? "bg-forex-profit/10 text-forex-profit border-forex-profit" : "bg-forex-loss/10 text-forex-loss border-forex-loss"}
                  >
                    {data.isPositive ? '+' : ''}{data.changePercent}
                  </Badge>
                </div>
                <div className="text-xl font-bold mb-1">{data.price}</div>
                <div className={`text-sm ${data.isPositive ? 'text-forex-profit' : 'text-forex-loss'}`}>
                  {data.isPositive ? '+' : ''}{data.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {mockChartData.map((data) => (
            <Button
              key={data.symbol}
              variant={activeChart === data.symbol ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChart(data.symbol)}
              className="flex items-center gap-2"
            >
              {getIcon(data.symbol)}
              {data.symbol}
            </Button>
          ))}
        </div>

        {/* TradingView Chart */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-forex-profit" />
              {activeChart} - {t('charts.chart_title')}
              <Badge variant="secondary" className="ml-auto bg-forex-profit/10 text-forex-profit border-forex-profit">
                <div className="w-2 h-2 bg-forex-profit rounded-full mr-1 ml-2 animate-pulse"></div>
                {t('charts.live_data')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TradingViewWidget symbol={activeChart} />
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Disclaimer:</strong> {t('charts.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};
