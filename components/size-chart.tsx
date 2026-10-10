"use client";

import {
  DEFAULT_KAMEEZ_CHART,
  DEFAULT_SHALWAR_CHART,
  type ShalwarSizeSpec,
} from "@/lib/size-chart";

interface SizeChartRow {
  size: string;
  chest: number;
  length: number;
  hip: number;
  flair: number;
}

interface SizeChartProps {
  selectedSize?: string;
  kameezChart?: SizeChartRow[];
  shalwarChart?: ShalwarSizeSpec;
  note?: string;
}

export function SizeChart({
  selectedSize,
  kameezChart = DEFAULT_KAMEEZ_CHART,
  shalwarChart = DEFAULT_SHALWAR_CHART,
  note = "Chadder 2.5 meter. Measurements are in inches.",
}: SizeChartProps) {
  return (
    <div className="space-y-5 rounded-xl border p-4">
      <div>
        <h3 className="font-medium">Size Chart</h3>
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Kameez</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-3 py-2 font-medium">Size</th>
                <th className="px-3 py-2 font-medium">Chest</th>
                <th className="px-3 py-2 font-medium">Length</th>
                <th className="px-3 py-2 font-medium">Hip</th>
                <th className="px-3 py-2 font-medium">Flair</th>
              </tr>
            </thead>
            <tbody>
              {kameezChart.map((row) => {
                const isActive = selectedSize === row.size;
                return (
                  <tr
                    key={row.size}
                    className={`border-b last:border-0 ${
                      isActive ? "bg-blue-50 dark:bg-blue-950/30" : ""
                    }`}
                  >
                    <td className="px-3 py-2 font-medium">{row.size}</td>
                    <td className="px-3 py-2">{row.chest}</td>
                    <td className="px-3 py-2">{row.length}</td>
                    <td className="px-3 py-2">{row.hip}</td>
                    <td className="px-3 py-2">{row.flair}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Shalwar / Trouser</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[280px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-3 py-2 font-medium">Length</th>
                <th className="px-3 py-2 font-medium">Stretch Belt</th>
                <th className="px-3 py-2 font-medium">Pancha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">{shalwarChart.length}</td>
                <td className="px-3 py-2">{shalwarChart.stretchBelt}</td>
                <td className="px-3 py-2">{shalwarChart.pancha}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
