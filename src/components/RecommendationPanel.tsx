import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Lightbulb,
  ClipboardList,
  MapPin,
  Wrench,
  Car,
  Stethoscope,
  Scale,
  Key,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"
import { useUserContext } from "@/context/UserContext"

interface Recommendation {
  id: string
  label: string
  reason: string
  href: string
  icon: typeof Lightbulb
  iconColor: string
}

const ALL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "complete-checklist",
    label: "Complete Your Checklist",
    reason: "You have unfinished steps",
    href: "/checklist",
    icon: ClipboardList,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    id: "state-guidance",
    label: "Review Your State Laws",
    reason: "Know your legal rights & deadlines",
    href: "/state-guidance",
    icon: MapPin,
    iconColor: "text-indigo-600 bg-indigo-50",
  },
  {
    id: "find-towing",
    label: "Find Towing Services",
    reason: "Get your vehicle moved safely",
    href: "/find-providers?type=towing",
    icon: Wrench,
    iconColor: "text-orange-600 bg-orange-50",
  },
  {
    id: "find-bodyshop",
    label: "Find a Body Shop",
    reason: "Get your vehicle repaired",
    href: "/find-providers?type=bodyshop",
    icon: Car,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    id: "find-medical",
    label: "Find Medical Care",
    reason: "Injuries need prompt attention",
    href: "/find-providers?type=medical",
    icon: Stethoscope,
    iconColor: "text-red-600 bg-red-50",
  },
  {
    id: "find-attorney",
    label: "Consult an Attorney",
    reason: "Protect your legal interests",
    href: "/find-providers?type=attorney",
    icon: Scale,
    iconColor: "text-purple-600 bg-purple-50",
  },
  {
    id: "find-rental",
    label: "Arrange a Rental Car",
    reason: "Stay mobile while your car is repaired",
    href: "/find-providers?type=rental",
    icon: Key,
    iconColor: "text-green-600 bg-green-50",
  },
]

function scoreRecommendations(
  checkedItems: Set<string>,
  hasInjuries: boolean | null,
  selectedProviderType: string,
  selectedState: string,
  visitedPages: Set<string>,
  checklistProgress: number
): Record<string, number> {
  const scores: Record<string, number> = {
    "complete-checklist": 0,
    "state-guidance": 0,
    "find-towing": 0,
    "find-bodyshop": 10, // base: almost always relevant after an accident
    "find-medical": 0,
    "find-attorney": 0,
    "find-rental": 0,
  }

  // --- Injury question ---
  if (hasInjuries === true) {
    scores["find-medical"] += 80
    scores["find-attorney"] += 40
  } else if (hasInjuries === false) {
    scores["find-medical"] = -9999 // suppress entirely
    scores["find-bodyshop"] += 20
  }

  // --- Checklist items ---
  if (checkedItems.has("emergency-1")) {
    // Called 911 → likely injuries involved
    scores["find-medical"] += 25
    scores["find-attorney"] += 10
  }
  if (checkedItems.has("emergency-2")) {
    // Requested police report → legal paper trail started
    scores["find-attorney"] += 20
  }
  if (checkedItems.has("next-1")) {
    // Contacted insurance → attorney follow-up is smart
    scores["find-attorney"] += 15
  }
  if (checkedItems.has("next-2")) {
    // "Seek medical attention" checked
    scores["find-medical"] += 50
  }
  if (checkedItems.has("next-3")) {
    // "Don't admit fault" → litigation-aware, boost attorney
    scores["find-attorney"] += 30
  }
  if (checkedItems.has("doc-1") || checkedItems.has("doc-2")) {
    // Documenting damage → body shop is the next step
    scores["find-bodyshop"] += 15
  }

  // --- Checklist progress ---
  if (checklistProgress === 0) {
    scores["complete-checklist"] += 50
  } else if (checklistProgress < 100) {
    scores["complete-checklist"] += 30
  }
  // If 100% complete, don't recommend it

  // --- State guidance ---
  if (!visitedPages.has("state-guidance") && selectedState === "") {
    scores["state-guidance"] += 40
  } else if (!visitedPages.has("state-guidance")) {
    scores["state-guidance"] += 20
  }

  // --- Provider type selected ---
  if (selectedProviderType === "towing") {
    scores["find-bodyshop"] += 30
    scores["find-rental"] += 25
  } else if (selectedProviderType === "bodyshop") {
    scores["find-rental"] += 20
  } else if (selectedProviderType === "medical") {
    scores["find-attorney"] += 20
  }

  // Suppress already-browsed provider type
  if (selectedProviderType && selectedProviderType !== "all") {
    scores[`find-${selectedProviderType}`] = -9999
  }

  return scores
}

export function RecommendationPanel() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    checkedItems,
    hasInjuries,
    selectedProviderType,
    selectedState,
    visitedPages,
    checklistProgress,
  } = useUserContext()

  const scores = scoreRecommendations(
    checkedItems,
    hasInjuries,
    selectedProviderType,
    selectedState,
    visitedPages,
    checklistProgress
  )

  const topRecs = ALL_RECOMMENDATIONS.filter((r) => scores[r.id] > 0)
    .sort((a, b) => scores[b.id] - scores[a.id])
    .slice(0, 3)

  if (topRecs.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 rounded-xl border border-border bg-white shadow-xl">
      {/* Header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between rounded-t-xl bg-primary px-4 py-3 text-primary-foreground"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          <span className="text-sm font-semibold">Recommended Next Steps</span>
        </div>
        {collapsed ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {/* Recommendations */}
      {!collapsed && (
        <div className="divide-y divide-border">
          {topRecs.map((rec) => {
            const Icon = rec.icon
            return (
              <Link
                key={rec.id}
                to={rec.href}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className={`rounded-lg p-2 ${rec.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{rec.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{rec.reason}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
