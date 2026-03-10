import { useState } from "react"
import {
  MapPin,
  FileText,
  Shield,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Phone,
  Scale,
  Car,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select } from "@/components/ui/select"

interface StateInfo {
  name: string
  faultType: string
  minimumLiability: { bodilyInjury: string; propertyDamage: string }
  reportingRequirements: { threshold: string; deadline: string; where: string }
  statueOfLimitations: { personalInjury: string; propertyDamage: string }
  specialRules: string[]
  requiredDocuments: string[]
}

const stateData: Record<string, StateInfo> = {
  CA: {
    name: "California",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$15,000 per person / $30,000 per accident",
      propertyDamage: "$5,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "California DMV (Form SR-1)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Comparative negligence state - damages reduced by your percentage of fault",
      "Must exchange driver's license and vehicle registration information",
      "Failure to report can result in license suspension",
      "Uninsured motorist coverage is not mandatory but recommended",
    ],
    requiredDocuments: [
      "SR-1 Accident Report Form",
      "Police report (if applicable)",
      "Insurance information exchange",
      "Photo documentation of damage",
      "Witness statements",
    ],
  },
  NY: {
    name: "New York",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "New York DMV (Form MV-104)",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "No-fault insurance covers medical expenses regardless of who caused accident",
      "Must have Personal Injury Protection (PIP) coverage",
      "Can only sue for serious injuries that meet threshold requirements",
      "Must report accident involving $1,000+ damage within 10 days",
    ],
    requiredDocuments: [
      "MV-104 Report of Motor Vehicle Accident",
      "Police report (required for injuries)",
      "No-fault insurance claim form",
      "Medical documentation",
      "Proof of insurance",
    ],
  },
  TX: {
    name: "Texas",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$30,000 per person / $60,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage, injury, or death",
      deadline: "10 days from accident",
      where: "Texas Department of Transportation (Form CR-2)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Proportionate responsibility state - damages reduced by fault percentage",
      "Must show proof of financial responsibility after accident",
      "Uninsured motorist rate is high - strongly recommend UM coverage",
      "Hit and run or uninsured motorist must be reported to police immediately",
    ],
    requiredDocuments: [
      "CR-2 Crash Report",
      "CR-3 Blue Form (from officer at scene)",
      "Driver's Record Request (for insurance)",
      "Insurance verification",
      "Damage estimates",
    ],
  },
  FL: {
    name: "Florida",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "Not required (No-Fault)",
      propertyDamage: "$10,000 PIP / $10,000 PDL",
    },
    reportingRequirements: {
      threshold: "$500+ in damage, injury, or death",
      deadline: "10 days from accident",
      where: "Florida Department of Highway Safety (Long Form Report)",
    },
    statueOfLimitations: {
      personalInjury: "4 years from accident date",
      propertyDamage: "4 years from accident date",
    },
    specialRules: [
      "No-Fault state - PIP coverage is mandatory",
      "Can only sue for serious permanent injury or significant scarring",
      "Must seek medical treatment within 14 days for PIP benefits",
      "Bodily injury liability is not required but highly recommended",
    ],
    requiredDocuments: [
      "Florida Traffic Crash Report (Long Form)",
      "PIP insurance claim",
      "Medical records (within 14 days)",
      "Proof of insurance",
      "Police report number",
    ],
  },
}

const states = [
  { value: "CA", label: "California" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "FL", label: "Florida" },
]

export function StateGuidance() {
  const [selectedState, setSelectedState] = useState<string>("CA")
  const [activeTab, setActiveTab] = useState<string>("requirements")
  const stateInfo = stateData[selectedState]

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-purple-700">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Location-Specific Information</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            State-Specific Accident Guidance
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Get accurate legal and insurance information tailored to your state's
            specific regulations and requirements.
          </p>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-purple-50 shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex flex-1 items-center gap-3">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted-foreground">
                    Select Your State
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Choose your state to see specific requirements and regulations
                  </p>
                </div>
              </div>
              <div className="w-full md:w-64">
                <Select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  options={states}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="mb-8 border-2 border-primary/20 bg-primary/5">
          <Shield className="h-5 w-5 text-primary" />
          <AlertTitle className="text-foreground">
            {stateInfo.name} is a{" "}
            <span className="font-bold">{stateInfo.faultType}</span>
          </AlertTitle>
          <AlertDescription>
            {stateInfo.faultType === "No-Fault State"
              ? "In a no-fault state, your own insurance covers your medical expenses regardless of who caused the accident. You can only sue the at-fault driver in specific circumstances."
              : "In an at-fault state, the driver responsible for the accident is liable for damages. You can file a claim with their insurance or sue them directly."}
          </AlertDescription>
        </Alert>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="legal">Legal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Reporting Requirements
                  </CardTitle>
                  <CardDescription>
                    When and how to report your accident in {stateInfo.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Reporting Threshold</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">
                      {stateInfo.reportingRequirements.threshold}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Deadline</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">
                      {stateInfo.reportingRequirements.deadline}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Where to Report</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">
                      {stateInfo.reportingRequirements.where}
                    </p>
                  </div>
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-sm text-amber-900">
                      Failure to report within the deadline may result in license
                      suspension or fines.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Statute of Limitations
                  </CardTitle>
                  <CardDescription>
                    Time limits for filing lawsuits in {stateInfo.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Scale className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Personal Injury Claims</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">
                      {stateInfo.statueOfLimitations.personalInjury}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Property Damage Claims</span>
                    </div>
                    <p className="pl-6 text-muted-foreground">
                      {stateInfo.statueOfLimitations.propertyDamage}
                    </p>
                  </div>
                  <Alert className="border-primary/20 bg-primary/5">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-sm">
                      You must file your lawsuit before this deadline or you may
                      lose the right to sue.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Minimum Insurance Requirements
                </CardTitle>
                <CardDescription>
                  Required insurance coverage amounts in {stateInfo.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-primary" />
                      <h3 className="font-bold text-foreground">Bodily Injury Liability</h3>
                    </div>
                    <p className="mb-2 text-2xl font-bold text-foreground">
                      {stateInfo.minimumLiability.bodilyInjury}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Covers injuries to others when you're at fault
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Car className="h-6 w-6 text-green-600" />
                      <h3 className="font-bold text-green-900">Property Damage Liability</h3>
                    </div>
                    <p className="mb-2 text-2xl font-bold text-green-900">
                      {stateInfo.minimumLiability.propertyDamage}
                    </p>
                    <p className="text-sm text-green-800">
                      Covers damage to others' property when you're at fault
                    </p>
                  </div>
                </div>
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-900">Important Note</AlertTitle>
                  <AlertDescription className="text-amber-800">
                    These are minimum requirements. We recommend purchasing higher
                    coverage limits to better protect yourself financially in case
                    of a serious accident.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-purple-600" />
                  Special Rules & Regulations
                </CardTitle>
                <CardDescription>
                  Important legal considerations for accidents in {stateInfo.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {stateInfo.specialRules.map((rule, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="mb-2 font-bold text-foreground">Need Legal Advice?</h4>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Laws can be complex and every situation is unique. Consider
                        consulting with a licensed attorney in {stateInfo.name} who
                        specializes in car accidents.
                      </p>
                      <Button>Find Local Attorneys</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Required Documentation
                </CardTitle>
                <CardDescription>
                  Documents you need to file and keep for {stateInfo.name} accidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 space-y-3">
                  {stateInfo.requiredDocuments.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border-2 border-border bg-card p-4 transition-colors hover:border-primary/30"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {i + 1}
                      </div>
                      <span className="font-medium text-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Documentation Tips</AlertTitle>
                  <AlertDescription className="space-y-1 text-green-800">
                    <p>• Keep copies of all documents for your records</p>
                    <p>• Take photos with your phone immediately after the accident</p>
                    <p>• Submit required forms within the deadline to avoid penalties</p>
                    <p>• Organize documents in a folder specific to this accident</p>
                  </AlertDescription>
                </Alert>
                <div className="mt-6">
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Download State Forms & Checklists
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-br from-slate-900 to-blue-900 text-white shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Quick Reference - {stateInfo.name}
            </CardTitle>
            <CardDescription className="text-blue-100">
              Keep these numbers handy after an accident
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="mb-1 text-sm text-blue-200">Emergency Services</p>
                <p className="text-2xl font-bold">911</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-blue-200">Non-Emergency Police</p>
                <p className="text-2xl font-bold">311</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-blue-200">State DMV</p>
                <p className="text-xl font-bold">1-800-DMV-INFO</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
