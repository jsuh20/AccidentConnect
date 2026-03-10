import { useState } from "react"
import {
  AlertTriangle,
  Camera,
  Phone,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
}

const initialChecklist: ChecklistItem[] = [
  { id: "safety-1", title: "Check for injuries", description: "Assess yourself and passengers for any injuries, no matter how minor", category: "Safety First", completed: false },
  { id: "safety-2", title: "Move to safety if possible", description: "If safe to do so, move vehicles to the side of the road to avoid blocking traffic", category: "Safety First", completed: false },
  { id: "safety-3", title: "Turn on hazard lights", description: "Alert other drivers to the accident by turning on your hazard lights", category: "Safety First", completed: false },
  { id: "safety-4", title: "Set up warning triangles/flares", description: "If you have them, place warning triangles or flares behind your vehicle", category: "Safety First", completed: false },
  { id: "emergency-1", title: "Call 911 if needed", description: "Call emergency services if there are injuries, significant damage, or hazardous conditions", category: "Emergency Services", completed: false },
  { id: "emergency-2", title: "Request police report", description: "Ask for a police officer to come and file an official accident report", category: "Emergency Services", completed: false },
  { id: "emergency-3", title: "Get police report number", description: "Write down the police report number for your insurance claim", category: "Emergency Services", completed: false },
  { id: "exchange-1", title: "Exchange driver information", description: "Get name, address, phone number, driver's license number from other driver(s)", category: "Exchange Information", completed: false },
  { id: "exchange-2", title: "Exchange insurance information", description: "Get insurance company name, policy number, and contact information", category: "Exchange Information", completed: false },
  { id: "exchange-3", title: "Record vehicle details", description: "Note make, model, year, color, and license plate of all vehicles involved", category: "Exchange Information", completed: false },
  { id: "exchange-4", title: "Get witness information", description: "If there are witnesses, get their names and contact information", category: "Exchange Information", completed: false },
  { id: "doc-1", title: "Take photos of all vehicles", description: "Photograph damage to all vehicles from multiple angles", category: "Documentation", completed: false },
  { id: "doc-2", title: "Photograph accident scene", description: "Take wide shots showing vehicle positions, road conditions, traffic signs", category: "Documentation", completed: false },
  { id: "doc-3", title: "Photo other driver's documents", description: "Take photos of the other driver's license and insurance card", category: "Documentation", completed: false },
  { id: "doc-4", title: "Note weather and road conditions", description: "Document weather, lighting, road conditions, and any relevant factors", category: "Documentation", completed: false },
  { id: "doc-5", title: "Write down your account", description: "Write detailed notes about what happened while it's fresh in your memory", category: "Documentation", completed: false },
  { id: "next-1", title: "Contact your insurance", description: "Report the accident to your insurance company as soon as possible", category: "Next Steps", completed: false },
  { id: "next-2", title: "Seek medical attention", description: "See a doctor even if you feel fine - some injuries appear later", category: "Next Steps", completed: false },
  { id: "next-3", title: "Don't admit fault", description: "Avoid making statements about fault at the scene or to the other party", category: "Next Steps", completed: false },
]

const categories = ["Safety First", "Emergency Services", "Exchange Information", "Documentation", "Next Steps"]

const categoryIcons: Record<string, typeof AlertTriangle> = {
  "Safety First": AlertTriangle,
  "Emergency Services": Phone,
  "Exchange Information": Users,
  "Documentation": Camera,
  "Next Steps": ClipboardList,
}

export function Checklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [currentCategory, setCurrentCategory] = useState<string>("Safety First")

  const currentCategoryIndex = categories.indexOf(currentCategory)
  const currentCategoryItems = checklist.filter((item) => item.category === currentCategory)
  const completedCount = checklist.filter((item) => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = (completedCount / totalCount) * 100

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const goToNextCategory = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategory(categories[currentCategoryIndex + 1])
    }
  }

  const goToPreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategory(categories[currentCategoryIndex - 1])
    }
  }

  const Icon = categoryIcons[currentCategory] ?? ClipboardList

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
            <ClipboardList className="h-4 w-4" />
            <span className="text-sm font-medium">Step-by-Step Guidance</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Post-Accident Checklist
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Follow these steps carefully to ensure you handle everything properly
            after an accident. Check off each item as you complete it.
          </p>
        </div>

        <Card className="mb-8 border-2 border-primary/20 shadow-md">
          <CardContent className="pt-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Overall Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            {completedCount === totalCount && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                <CheckCircle className="h-6 w-6 shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Checklist Complete!</p>
                  <p className="text-sm text-green-700">
                    You've completed all steps. Now connect with local providers
                    to get your vehicle repaired.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const categoryItems = checklist.filter((item) => item.category === category)
              const completedItems = categoryItems.filter((item) => item.completed).length
              const isComplete = completedItems === categoryItems.length
              const isCurrent = category === currentCategory
              const CatIcon = categoryIcons[category] ?? ClipboardList

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCurrentCategory(category)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg border-2 px-4 py-3 transition-all ${
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : isComplete
                        ? "border-green-200 bg-green-50 text-green-700 hover:border-green-300"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <CatIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isCurrent
                        ? "bg-primary-foreground/20"
                        : isComplete
                          ? "bg-green-200 text-green-800"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {completedItems}/{categoryItems.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <Card className="mb-8 shadow-md">
          <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">{currentCategory}</CardTitle>
                <CardDescription>
                  Complete all items in this category before moving forward
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {currentCategoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    item.completed
                      ? "border-green-200 bg-green-50"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={item.id}
                        className={`mb-1 block cursor-pointer font-semibold ${
                          item.completed ? "text-green-900 line-through" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </label>
                      <p
                        className={`text-sm ${
                          item.completed ? "text-green-700" : "text-muted-foreground"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    {item.completed && (
                      <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={goToPreviousCategory}
                disabled={currentCategoryIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Step {currentCategoryIndex + 1} of {categories.length}
              </span>
              <Button
                onClick={goToNextCategory}
                disabled={currentCategoryIndex === categories.length - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <AlertTriangle className="h-5 w-5" />
              Important Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-amber-900">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Never leave the accident scene before completing necessary steps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Don't admit fault or make statements that could be used against you</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Contact your insurance company within 24 hours of the accident</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Keep all documentation and receipts related to the accident</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
