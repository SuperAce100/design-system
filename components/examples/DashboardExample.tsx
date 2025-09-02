"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";

export default function DashboardExample() {
  return (
    <section className="px-1 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Metric tiles remain cards */}
      <Card className="md:col-span-1">
        <CardHeader className="p-0">
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="md:col-span-1">
        <CardHeader className="p-0">
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>+180.1% from last month</CardDescription>
        </CardHeader>
      </Card>
      <Card className="md:col-span-1">
        <CardHeader className="p-0">
          <CardTitle>Calendar</CardTitle>
          <CardDescription>June 2025</CardDescription>
        </CardHeader>
      </Card>
      <Card className="md:col-span-1">
        <CardHeader className="p-0">
          <CardTitle>Move Goal</CardTitle>
          <CardDescription>Set your daily activity goal.</CardDescription>
        </CardHeader>
      </Card>

      {/* Chart rendered directly without a Card wrapper */}
      <div className="md:col-span-4 rounded-2xl border bg-card p-4">
        <div className="mb-2">
          <div className="text-lg font-medium">Traffic (last 12 weeks)</div>
          <div className="text-sm text-muted-foreground">Pure CSS bars, minimal styling.</div>
        </div>
        <div className="flex items-end gap-1 h-24">
          {[12, 20, 18, 30, 24, 28, 22, 36, 40, 32, 48, 44].map((h, i) => (
            <div key={i} className="bg-muted rounded-md w-4" style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
