import { useState } from 'react';
import { TrendingUp, DollarSign, Coins, BarChart3, RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForexData } from '@/hooks/useForexData';

export const LiveChartsSection = () => {
  const { t } = useLanguage();
  const { forexData, loading, error, lastUpdate, refreshData } = useForexData();
  const [activeChart, setActiveChart] = useState('EUR/USD');

  const TradingViewWidget = ({ symbol }: { symbol: string }) => {
    const widgetId = `tradingview_${symbol.replace('/', '')}`;
    
    // Configure data source based on symbol - prioritize first/best sources from TradingView
    const getSymbolWithSource = (symbol: string) => {
      switch (symbol) {
        case 'XAU/USD':
          return 'OANDA:XAUUSD'; // OANDA is first/best for gold
        case 'EUR/USD':
          return 'EURUSD'; // Let TradingView auto-select the first/best source (Tickmill)
        case 'GBP/USD':
          return 'GBPUSD'; // Let TradingView auto-select the first/best source (FP Markets)
        case 'USD/JPY':
          return 'USDJPY'; // Let TradingView auto-select the first/best source (FXCM)
        default:
          // For any other symbol, try first/best source first, then OANDA as fallback
          // This ensures we get the best first resource from TradingView's list
          return symbol.replace('/', '');
      }
    };
    
    const symbolParam = getSymbolWithSource(symbol);
    
    return (
      <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden bg-background">
        <iframe
          id={widgetId}
          src={`https://www.tradingview.com/widgetembed/?frameElementId=${widgetId}&symbol=${symbolParam}&interval=D&hidesidetoolbar=false&saveimage=false&toolbarbg=1a1a1a&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=aboudy-trader.com&utm_medium=widget&utm_campaign=chart&utm_term=${symbol}&hide_top_toolbar=false&hide_legend=false&transparency=true&allow_symbol_change=true&autosize=true&withdateranges=true&range=1M&calendar=true&hotlist=true&details=true&withvolume=true&showvolume=true`}
          className="w-full h-full border-0"
          title={`Live ${symbol} Chart - ${symbolParam}`}
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
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 pb-2 sm:pb-4 text-gradient-gold">
            {t('charts.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('charts.description')}
          </p>
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-forex-profit/10 text-forex-profit border border-forex-profit/20 whitespace-nowrap">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-forex-profit rounded-full animate-pulse" style={{marginRight: '0.5rem', marginLeft: '0.5rem'}}></div>
              {t('charts.live_indicator')}
            </span>
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button 
              onClick={refreshData} 
              variant="outline" 
              size="sm" 
              className="text-xs px-2 py-1 h-6"
              disabled={loading}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="premium-card">
                <CardContent className="p-3 sm:p-4">
                  <div className="animate-pulse">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-muted rounded"></div>
                        <div className="w-16 h-4 bg-muted rounded"></div>
                      </div>
                      <div className="w-12 h-6 bg-muted rounded"></div>
                    </div>
                    <div className="w-20 h-6 bg-muted rounded mb-1"></div>
                    <div className="w-16 h-4 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full">
              <Card className="premium-card border-destructive/20">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <p className="text-destructive font-medium mb-2">Failed to load market data</p>
                  <p className="text-sm text-muted-foreground mb-4">{error}</p>
                  <Button onClick={refreshData} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Real-time data
            forexData.map((data) => (
              <Card key={data.symbol} className="premium-card cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getIcon(data.symbol)}
                      <span className="font-semibold text-sm sm:text-base">{data.symbol}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs sm:text-sm px-2 py-1 ${data.isPositive ? "bg-forex-profit/10 text-forex-profit border-forex-profit" : "bg-forex-loss/10 text-forex-loss border-forex-loss"}`}
                    >
                      {data.changePercent}
                    </Badge>
                  </div>
                  <div className="text-lg sm:text-xl font-bold mb-1">{data.price}</div>
                  <div className={`text-xs sm:text-sm ${data.isPositive ? 'text-forex-profit' : 'text-forex-loss'}`}>
                    {data.change}
                  </div>
                  {lastUpdate && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Updated: {lastUpdate.toLocaleTimeString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Chart Selector */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2">
            {forexData.map((data) => (
              <Button
                key={data.symbol}
                variant={activeChart === data.symbol ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveChart(data.symbol)}
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                {getIcon(data.symbol)}
                <span className="hidden sm:inline">{data.symbol}</span>
                <span className="sm:hidden">{data.symbol.split('/')[0]}</span>
              </Button>
            ))}
          </div>
        )}

        {/* TradingView Chart */}
        <Card className="premium-card">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-forex-profit" />
                <span className="font-semibold">{activeChart} - {t('charts.chart_title')}</span>
              </div>
              <Badge variant="secondary" className="bg-forex-profit/10 text-forex-profit border-forex-profit text-xs sm:text-sm px-2 py-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-forex-profit rounded-full animate-pulse" style={{marginRight: '0.25rem', marginLeft: '0.25rem'}}></div>
                {t('charts.live_data')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <TradingViewWidget symbol={activeChart} />
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-muted/50 rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            <strong>{t('charts.disclaimer_label')}</strong> {t('charts.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};
