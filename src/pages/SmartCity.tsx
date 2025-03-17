
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Thermometer, Wind, Droplets, CircleDollarSign, Car, Laptop, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Area, AreaChart, Bar, BarChart } from 'recharts';

// Sample data for the dashboard
const trafficData = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 80 },
  { time: '08:00', value: 320 },
  { time: '12:00', value: 280 },
  { time: '16:00', value: 350 },
  { time: '20:00', value: 210 },
  { time: '23:59', value: 120 },
];

const energyData = [
  { time: '00:00', value: 42 },
  { time: '04:00', value: 30 },
  { time: '08:00', value: 65 },
  { time: '12:00', value: 78 },
  { time: '16:00', value: 82 },
  { time: '20:00', value: 70 },
  { time: '23:59', value: 45 },
];

const weatherData = {
  temperature: 28,
  humidity: 65,
  windSpeed: 12,
  forecast: [
    { day: 'Mon', high: 29, low: 21 },
    { day: 'Tue', high: 28, low: 20 },
    { day: 'Wed', high: 30, low: 22 },
    { day: 'Thu', high: 27, low: 19 },
    { day: 'Fri', high: 26, low: 18 },
  ]
};

const resourceStats = [
  { name: 'Energy', usage: 78, trend: 'up', icon: <Thermometer className="w-4 h-4" /> },
  { name: 'Water', usage: 62, trend: 'down', icon: <Droplets className="w-4 h-4" /> },
  { name: 'Traffic', usage: 84, trend: 'up', icon: <Car className="w-4 h-4" /> },
  { name: 'Budget', usage: 45, trend: 'stable', icon: <CircleDollarSign className="w-4 h-4" /> },
];

const SmartCity = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen container mx-auto py-12 px-4"
    >
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          asChild
          className="rounded-full"
        >
          <Link to="/portfolio">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Smart City Dashboard</h1>
          <p className="text-muted-foreground mt-1">AI-powered city resource management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-full lg:col-span-2 bg-card hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Traffic Flow</CardTitle>
              <Badge variant="outline" className="border-primary/20 text-primary">Real-time</Badge>
            </div>
            <CardDescription>City-wide traffic density over the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                traffic: {
                  label: "Traffic Density",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))",
                  },
                },
              }}
              className="h-full"
            >
              <AreaChart 
                data={trafficData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#trafficGradient)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Weather</CardTitle>
            <CardDescription>Current conditions and forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Droplets className="h-4 w-4" />
                    <span>{weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Wind className="h-4 w-4" />
                    <span>{weatherData.windSpeed} km/h</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-medium">{day.day}</p>
                    <p className="text-sm">{day.high}°</p>
                    <p className="text-sm text-muted-foreground">{day.low}°</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {resourceStats.map((resource, index) => (
          <Card key={index} className="bg-card hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {resource.icon}
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                </div>
                <Badge 
                  variant={resource.trend === 'up' ? 'destructive' : resource.trend === 'down' ? 'default' : 'secondary'}
                  className={resource.trend === 'up' ? 'bg-red-500/10 text-red-500' : resource.trend === 'down' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}
                >
                  {resource.trend === 'up' ? '+4.2%' : resource.trend === 'down' ? '-2.1%' : '±0.3%'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{resource.usage}%</span>
                <span className="text-muted-foreground text-sm mb-1">of capacity</span>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${resource.trend === 'up' ? 'bg-red-500' : resource.trend === 'down' ? 'bg-green-500' : 'bg-primary'}`}
                  style={{ width: `${resource.usage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card hover:shadow-md transition-all mb-8">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Energy Consumption</CardTitle>
            <Badge variant="outline" className="border-amber-500/20 text-amber-500">Optimizing</Badge>
          </div>
          <CardDescription>City-wide energy usage patterns</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ChartContainer
            config={{
              energy: {
                label: "Energy (MW)",
                theme: {
                  light: "hsl(47, 100%, 50%)",
                  dark: "hsl(47, 100%, 50%)",
                },
              },
            }}
            className="h-full"
          >
            <BarChart 
              data={energyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'hsl(var(--muted-foreground))', opacity: 0.1 }}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(47, 100%, 50%)" 
                opacity={0.8}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Technical Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-card hover:shadow-md transition-all h-full">
          <CardHeader>
            <CardTitle>Key Technologies</CardTitle>
            <CardDescription>Technologies used in this smart city solution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">AI/ML Algorithms</h3>
              <p className="text-muted-foreground text-sm">Advanced algorithms for pattern recognition and predictive analysis of urban data points.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">IoT Sensor Network</h3>
              <p className="text-muted-foreground text-sm">Comprehensive network of over 5,000 sensors gathering real-time data on traffic, air quality, energy usage, and more.</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Cloud Infrastructure</h3>
              <p className="text-muted-foreground text-sm">Scalable cloud platform processing over 10TB of daily data, ensuring 99.99% uptime and real-time analytics.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-md transition-all h-full">
          <CardHeader>
            <CardTitle>Implementation Results</CardTitle>
            <CardDescription>Quantifiable outcomes of the smart city initiative</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Energy consumption reduction</span>
              <Badge className="bg-green-500/10 text-green-500">24%</Badge>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }} />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm">Traffic congestion improvement</span>
              <Badge className="bg-green-500/10 text-green-500">32%</Badge>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }} />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm">Public service response time</span>
              <Badge className="bg-green-500/10 text-green-500">41%</Badge>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '41%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild variant="outline" size="lg" className="px-8">
          <Link to="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default SmartCity;
