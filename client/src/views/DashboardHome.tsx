import { useEffect, useState } from "react";import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PerformanceChart, ConversionFunnelChart } from "../components/ChartWrapper";
import { Users, UserCheck, Briefcase, CheckSquare, IndianRupee, Plus } from "lucide-react";

const API_URL = "https://prospectai-backend.onrender.com/api/dashboard";

interface DashboardHomeProps {
  setCurrentView: (view: string) => void;
}

interface Stats {
  totalProspects:number;
  totalLeads:number;
  totalDeals:number;
  totalTasks:number;
  revenue:number;
}

export default function DashboardHome({ setCurrentView }: DashboardHomeProps) {
  const [stats,setStats]=useState<Stats>({totalProspects:0,totalLeads:0,totalDeals:0,totalTasks:0,revenue:0});

  useEffect(() => {
  fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((r) => r.json())
    .then(setStats)
    .catch(console.error);
}, []);

  const cards=[
    {title:"Prospects",value:stats.totalProspects,icon:Users},
    {title:"Leads",value:stats.totalLeads,icon:UserCheck},
    {title:"Deals",value:stats.totalDeals,icon:Briefcase},
    {title:"Tasks",value:stats.totalTasks,icon:CheckSquare},
    {title:"Revenue",value:`₹${stats.revenue.toLocaleString("en-IN")}`,icon:IndianRupee},
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ProspectAI Dashboard</h1>
          <p className="text-muted-foreground">Live CRM analytics from MongoDB</p>
        </div>
        <Button onClick={()=>setCurrentView("prospects")}><Plus className="w-4 h-4 mr-2"/>Add Prospect</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map(card=>{
          const Icon=card.icon;
          return (
            <Card key={card.title}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
                </div>
                <Icon className="w-10 h-10 text-primary"/>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Sales Performance</CardTitle></CardHeader>
          <CardContent><PerformanceChart/></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pipeline</CardTitle></CardHeader>
          <CardContent><ConversionFunnelChart/></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Summary</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p>Total Prospects: {stats.totalProspects}</p>
          <p>Total Leads: {stats.totalLeads}</p>
          <p>Total Deals: {stats.totalDeals}</p>
          <p>Total Tasks: {stats.totalTasks}</p>
          <p>Total Revenue: ₹{stats.revenue.toLocaleString("en-IN")}</p>
        </CardContent>
      </Card>
    </div>
  );
}