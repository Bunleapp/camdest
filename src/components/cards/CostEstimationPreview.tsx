import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const BREAKDOWN_PREVIEW = [
  { label: "Accommodation", value: "$90" },
  { label: "Transportation", value: "$50" },
  { label: "Food", value: "$108" },
  { label: "Activities", value: "$122" },
];

export default function CostEstimationPreview() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            align="left"
            eyebrow="Plan Your Budget"
            title="Know Your Trip Cost Before You Go"
            description="Use our interactive calculator to estimate accommodation, transportation, food, and activity costs for any Cambodia destination."
          />
          <div className="mt-6">
            <Button href="/estimate">Try the Estimator</Button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
          <p className="text-sm font-medium text-muted">
            Example: 3 days · 2 travelers · Angkor Wat
          </p>
          <div className="mt-4 space-y-3">
            {BREAKDOWN_PREVIEW.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted">{item.label}</span>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
            <span className="font-semibold text-foreground">Grand Total</span>
            <span className="text-xl font-bold text-primary-dark">$370</span>
          </div>
        </div>
      </div>
    </section>
  );
}
