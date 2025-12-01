import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  gradient = "from-blue-600 to-teal-500",
}: {
  title: string;
  value: any;
  icon: any;
  gradient?: string;
}) {
  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl rounded-2xl relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${gradient} opacity-20 rounded-full -translate-y-6 translate-x-6`}
      />
      <CardHeader className="p-6 flex flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <CardTitle className="text-3xl font-bold text-slate-900">
            {value}
          </CardTitle>
        </div>

        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </CardHeader>
    </Card>
  );
}
