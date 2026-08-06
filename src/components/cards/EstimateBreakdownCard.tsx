interface BreakdownItem {
  label: string;
  value: number;
}

interface EstimateBreakdownCardProps {
  items: BreakdownItem[];
  grandTotal: number;
  destinationName: string;
}

export default function EstimateBreakdownCard({
  items,
  grandTotal,
  destinationName,
}: EstimateBreakdownCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
      <p className="text-sm text-muted">Estimated cost for</p>
      <p className="text-lg font-semibold text-foreground">{destinationName}</p>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-muted">{item.label}</span>
            <span className="font-medium text-foreground">${item.value.toFixed(0)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-5">
        <span className="font-semibold text-foreground">Grand Total</span>
        <span className="text-2xl font-bold text-primary-dark">${grandTotal.toFixed(0)}</span>
      </div>
    </div>
  );
}
