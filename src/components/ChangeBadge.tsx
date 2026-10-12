import type { Change } from "@/types";
import { pctBn } from "@/lib/format";

const STYLE = {
  up: { icon: "▲", text: "text-rise", bg: "bg-rise-soft" },
  down: { icon: "▼", text: "text-fall", bg: "bg-fall-soft" },
  flat: { icon: "—", text: "text-muted", bg: "bg-gray-100" },
} as const;

export default function ChangeBadge({
  change,
  plain = false,
}: {
  change: Change;
  plain?: boolean;
}) {
  const s = STYLE[change.dir];
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold ${s.text} ${
        plain ? "" : `rounded-full px-2 py-0.5 ${s.bg}`
      }`}
    >
      {s.icon} {pctBn(change.pct)}%
    </span>
  );
}