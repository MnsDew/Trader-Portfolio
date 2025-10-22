import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

export const GoldApiTest = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testGoldApis = async () => {
    setIsLoading(true);
    setTestResults([]);

    const apis = [
      { name: 'Metals.dev', url: 'https://api.metals.dev/v1/spot/gold' },
      { name: 'Gold API', url: 'https://api.goldapi.io/api/XAU/USD' },
      { name: 'Gold Rest API', url: 'https://api.goldrestapi.com/v1/gold' },
      { name: 'Dubois Gold', url: 'https://api.duboisgold.com/v1/spot/gold' },
      { name: 'Exchange Rate API', url: 'https://api.exchangerate-api.com/v4/latest/XAU' }
    ];

    const results = [];

    for (const api of apis) {
      const startTime = Date.now();
      try {
        const response = await fetch(api.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        const responseTime = Date.now() - startTime;
        const data = await response.json();

        results.push({
          name: api.name,
          url: api.url,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          responseTime: `${responseTime}ms`,
          data: data,
          error: null
        });
      } catch (error) {
        const responseTime = Date.now() - startTime;
        results.push({
          name: api.name,
          url: api.url,
          status: 'error',
          statusCode: 'N/A',
          responseTime: `${responseTime}ms`,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Gold API Test Results
        </CardTitle>
        <Button onClick={testGoldApis} disabled={isLoading} className="w-fit">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing APIs...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Gold APIs
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {testResults.length > 0 && (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{result.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                      {result.status === 'success' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {result.status}
                    </Badge>
                    <Badge variant="outline">{result.responseTime}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">URL: {result.url}</p>
                <p className="text-sm">Status Code: {result.statusCode}</p>
                {result.error && (
                  <p className="text-sm text-red-500 mt-1">Error: {result.error}</p>
                )}
                {result.data && (
                  <details className="mt-2">
                    <summary className="text-sm cursor-pointer text-blue-500">View Response Data</summary>
                    <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


