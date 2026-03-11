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
  IL: {
    name: "Illinois",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$1,500+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Illinois Department of Transportation (SR-1 Form)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "5 years from accident date",
    },
    specialRules: [
      "Modified comparative fault state - cannot recover if more than 50% at fault",
      "Must carry uninsured motorist coverage",
      "Driver must remain at scene and provide contact and insurance info",
      "Failure to report can lead to license suspension",
    ],
    requiredDocuments: [
      "SR-1 Accident Report Form",
      "Police report",
      "Insurance information exchange",
      "Photo documentation",
      "Medical records if injured",
    ],
  },
  WA: {
    name: "Washington",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "4 days from accident",
      where: "Washington State Patrol (Online or mail)",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state - can recover even if mostly at fault",
      "Uninsured motorist coverage required",
      "Must report accidents with injury or significant property damage",
      "Distracted driving laws strictly enforced",
    ],
    requiredDocuments: [
      "Washington State Patrol Collision Report",
      "Police report number",
      "Insurance card exchange",
      "Witness contact information",
      "Photographs of scene and vehicles",
    ],
  },
  CO: {
    name: "Colorado",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Colorado Department of Revenue (DR 2447 Form)",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault state - cannot recover if 50% or more at fault",
      "Must carry uninsured/underinsured motorist coverage",
      "Colorado requires drivers to exchange insurance information at the scene",
      "Hit and run must be reported to law enforcement immediately",
    ],
    requiredDocuments: [
      "DR 2447 Accident Report",
      "Police report (if law enforcement responded)",
      "Insurance information from all parties",
      "Medical documentation for injuries",
      "Repair estimates",
    ],
  },
  GA: {
    name: "Georgia",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Immediately if injuries; 30 days for property-only",
      where: "Georgia Department of Driver Services",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "4 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Move over law requires moving vehicle from traffic if safe to do so",
      "Uninsured motorist coverage required unless waived in writing",
      "Drivers must remain at scene and provide reasonable assistance",
    ],
    requiredDocuments: [
      "Georgia Uniform Motor Vehicle Accident Report",
      "Police report",
      "Proof of insurance",
      "Driver's license information exchange",
      "Witness statements",
    ],
  },
  AZ: {
    name: "Arizona",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$2,000+ in damage or any injury",
      deadline: "Within a reasonable time (typically 24 hours)",
      where: "Arizona Department of Transportation (SR 40 Form)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Pure comparative fault - damages reduced proportionally by your fault percentage",
      "No-fault insurance not required; at-fault driver's liability insurance applies",
      "Must provide proof of financial responsibility after any accident",
      "SR-22 certificate may be required after serious violations",
    ],
    requiredDocuments: [
      "SR 40 Accident Report",
      "Police report if law enforcement responded",
      "Insurance information exchange",
      "Photos of damage and scene",
      "Medical reports if injured",
    ],
  },
  AK: {
    name: "Alaska",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$50,000 per person / $100,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$2,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Alaska DMV (SR-1 Form)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "Uninsured motorist coverage required",
      "Must remain at scene and render aid if safe to do so",
      "Remote area accidents may require special reporting procedures",
    ],
    requiredDocuments: [
      "Alaska SR-1 Accident Report",
      "Police report if available",
      "Insurance information exchange",
      "Photos of damage",
      "Witness contact information",
    ],
  },
  AL: {
    name: "Alabama",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$250+ in damage or any injury",
      deadline: "Immediately or as soon as possible",
      where: "Local law enforcement or Alabama Law Enforcement Agency",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Contributory negligence state - any fault on your part may bar recovery",
      "Alabama is one of few states with pure contributory negligence",
      "Must notify insurer promptly after accident",
      "SR-13 may be required by insurer",
    ],
    requiredDocuments: [
      "Police report",
      "Insurance information exchange",
      "SR-13 (if requested by insurer)",
      "Photos of damage and scene",
      "Witness statements",
    ],
  },
  AR: {
    name: "Arkansas",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "30 days from accident",
      where: "Arkansas Department of Finance and Administration",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Must exchange license and registration at scene",
      "SR-1 form required for reportable accidents",
      "Uninsured motorist coverage required unless waived",
    ],
    requiredDocuments: [
      "SR-1 Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of vehicles and scene",
      "Medical documentation if injured",
    ],
  },
  CT: {
    name: "Connecticut",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "5 days from accident",
      where: "Connecticut DMV (Motor Vehicle Accident Report)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must report to DMV within 5 days if police did not file a report",
      "Uninsured motorist coverage required",
      "PIP coverage available but not mandatory",
    ],
    requiredDocuments: [
      "DMV Motor Vehicle Accident Report",
      "Police report if law enforcement responded",
      "Insurance information exchange",
      "Medical records for injuries",
      "Witness contact information",
    ],
  },
  DE: {
    name: "Delaware",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Immediately to police; 10 days to DMV",
      where: "Delaware DMV (Form BA-8)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($15,000 minimum) required",
      "Can sue for serious injuries exceeding PIP threshold",
      "Modified comparative fault applies for lawsuits",
      "Must carry uninsured motorist coverage",
    ],
    requiredDocuments: [
      "BA-8 Accident Report Form",
      "Police report",
      "PIP claim form",
      "Medical records",
      "Proof of insurance",
    ],
  },
  HI: {
    name: "Hawaii",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$20,000 per person / $40,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$3,000+ in damage or any injury",
      deadline: "Immediately to police; report filed by officer",
      where: "Hawaii Police Department",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP ($10,000) required for all registered vehicles",
      "Can only sue for serious injuries or when PIP is exhausted",
      "Pure comparative fault for lawsuits",
      "Must notify insurer within a reasonable time",
    ],
    requiredDocuments: [
      "Police report",
      "PIP insurance claim",
      "Medical documentation",
      "Proof of insurance",
      "Photos of damage",
    ],
  },
  IA: {
    name: "Iowa",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$20,000 per person / $40,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$1,500+ in damage or any injury",
      deadline: "72 hours from accident",
      where: "Iowa Department of Transportation",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "5 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry proof of financial responsibility",
      "Uninsured motorist coverage required",
      "Must exchange information with other parties at scene",
    ],
    requiredDocuments: [
      "Iowa Accident Report (if police not present)",
      "Police report if law enforcement responded",
      "Insurance information exchange",
      "Photos of damage",
      "Witness statements",
    ],
  },
  ID: {
    name: "Idaho",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$1,500+ in damage or any injury",
      deadline: "Immediately if injury; 10 days otherwise",
      where: "Idaho Transportation Department",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Comparative fault state - damages reduced by fault percentage",
      "Cannot recover if more than 50% at fault",
      "Must carry proof of insurance at all times",
      "Hit and run must be reported immediately to law enforcement",
    ],
    requiredDocuments: [
      "Idaho Accident Report Form",
      "Police report",
      "Insurance information exchange",
      "Photos of damage and scene",
      "Medical records if injured",
    ],
  },
  IN: {
    name: "Indiana",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Indiana BMV (Operator's Report of Accident)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured motorist coverage",
      "Operator's Report of Accident required within 10 days",
      "Must remain at scene and provide aid if possible",
    ],
    requiredDocuments: [
      "Operator's Report of Accident (State Form 39767)",
      "Police report",
      "Insurance information exchange",
      "Witness contact information",
      "Medical documentation for injuries",
    ],
  },
  KS: {
    name: "Kansas",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately to police; DMV report if no officer present",
      where: "Kansas DMV",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($4,500 minimum) required",
      "Can sue for serious injuries or damages exceeding PIP",
      "Modified comparative fault applies for lawsuits",
      "Must carry uninsured/underinsured motorist coverage",
    ],
    requiredDocuments: [
      "Kansas Accident Report",
      "PIP claim form",
      "Police report",
      "Medical records",
      "Proof of insurance",
    ],
  },
  KY: {
    name: "Kentucky",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Kentucky State Police or local law enforcement",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Choice no-fault state - drivers can opt out of no-fault system",
      "PIP coverage ($10,000) required unless opted out",
      "Can sue for serious injuries if in no-fault system",
      "Pure comparative fault applies for lawsuits",
    ],
    requiredDocuments: [
      "Kentucky Accident Report",
      "PIP claim form (if in no-fault system)",
      "Police report",
      "Medical records",
      "Insurance information exchange",
    ],
  },
  LA: {
    name: "Louisiana",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$15,000 per person / $30,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Immediately to police; 24 hours to DMV for unreported accidents",
      where: "Louisiana DPSC",
    },
    statueOfLimitations: {
      personalInjury: "1 year from accident date",
      propertyDamage: "1 year from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "One of the shortest statutes of limitations in the US - only 1 year",
      "Must report to police if injury, death, or damage over threshold",
      "Uninsured motorist coverage required unless waived in writing",
    ],
    requiredDocuments: [
      "Louisiana Accident Report (DPSC Form)",
      "Police report",
      "Insurance information exchange",
      "Medical documentation",
      "Photos of damage and scene",
    ],
  },
  MA: {
    name: "Massachusetts",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$20,000 per person / $40,000 per accident",
      propertyDamage: "$5,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "5 days from accident",
      where: "Massachusetts Registry of Motor Vehicles (Form CRA)",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($8,000) required",
      "Can only sue for injuries with medical bills over $2,000 or serious disfigurement",
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured motorist coverage",
    ],
    requiredDocuments: [
      "CRA Crash Report Form",
      "PIP claim form",
      "Police report (if applicable)",
      "Medical records and bills",
      "Proof of insurance",
    ],
  },
  MD: {
    name: "Maryland",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$30,000 per person / $60,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "15 days from accident",
      where: "Maryland MVA (DR-101 Form)",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Contributory negligence state - any fault may bar recovery entirely",
      "One of few states still using contributory negligence standard",
      "Must notify insurer promptly",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "DR-101 Accident Report",
      "Police report",
      "Insurance information exchange",
      "Medical records",
      "Witness statements",
    ],
  },
  ME: {
    name: "Maine",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$50,000 per person / $100,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$2,000+ in damage or any injury",
      deadline: "Immediately if injury or death; otherwise within 10 days",
      where: "Maine BMV (Operator Report of Traffic Accident)",
    },
    statueOfLimitations: {
      personalInjury: "6 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Maine has one of the longest statutes of limitations (6 years)",
      "Must carry uninsured motorist coverage",
      "Must exchange information with all parties at scene",
    ],
    requiredDocuments: [
      "Operator Report of Traffic Accident",
      "Police report if law enforcement responded",
      "Insurance information exchange",
      "Photos of damage",
      "Medical documentation",
    ],
  },
  MI: {
    name: "Michigan",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$50,000 per person / $100,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately to police if injury; 10 days otherwise",
      where: "Michigan State Police or local law enforcement",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "No-fault state with tiered PIP coverage options",
      "Unlimited PIP was the default but drivers can now choose lower limits",
      "Can only sue for serious impairment of body function or death",
      "Must file PIP claim with your own insurer within 1 year",
    ],
    requiredDocuments: [
      "Michigan Crash Report",
      "PIP claim form",
      "Police report",
      "Medical records and bills",
      "Proof of insurance",
    ],
  },
  MN: {
    name: "Minnesota",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$30,000 per person / $60,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Minnesota DPS (Driver and Vehicle Services)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($40,000) required",
      "Can sue for serious injury or medical bills over $4,000",
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured/underinsured motorist coverage",
    ],
    requiredDocuments: [
      "Minnesota Motor Vehicle Crash Report",
      "PIP claim form",
      "Police report",
      "Medical records",
      "Insurance information exchange",
    ],
  },
  MO: {
    name: "Missouri",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Immediately to police; DMV notification within 5 days",
      where: "Missouri Department of Revenue",
    },
    statueOfLimitations: {
      personalInjury: "5 years from accident date",
      propertyDamage: "5 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "Missouri has one of the longer statutes of limitations at 5 years",
      "Must exchange insurance and contact information at scene",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "Missouri Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of vehicles and scene",
      "Medical documentation",
    ],
  },
  MS: {
    name: "Mississippi",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Immediately or as soon as reasonably possible",
      where: "Mississippi Department of Public Safety",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "Must notify insurer within a reasonable time",
      "Hit and run must be reported to police immediately",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "Mississippi Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Witness statements",
    ],
  },
  MT: {
    name: "Montana",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately if injury; otherwise as soon as possible",
      where: "Montana Motor Vehicle Division",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Comparative fault state - damages reduced by fault percentage",
      "Must remain at scene until police arrive if injury occurred",
      "Proof of insurance must be carried at all times",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "Montana Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of accident scene",
      "Witness contact information",
    ],
  },
  NC: {
    name: "North Carolina",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$30,000 per person / $60,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Within 10 days of accident",
      where: "North Carolina DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Contributory negligence state - any fault may bar recovery entirely",
      "One of four states still using contributory negligence standard",
      "Must carry uninsured motorist coverage",
      "License plate must be surrendered if vehicle is totaled",
    ],
    requiredDocuments: [
      "North Carolina Accident Report (DMV-349)",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Medical records if injured",
    ],
  },
  ND: {
    name: "North Dakota",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Within 10 days if police report was not filed",
      where: "North Dakota Department of Transportation",
    },
    statueOfLimitations: {
      personalInjury: "6 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($30,000) required",
      "Can sue for serious injuries exceeding PIP threshold",
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Must carry uninsured/underinsured motorist coverage",
    ],
    requiredDocuments: [
      "North Dakota Accident Report",
      "PIP claim form",
      "Police report",
      "Medical records",
      "Proof of insurance",
    ],
  },
  NE: {
    name: "Nebraska",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,500+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Nebraska DMV",
    },
    statueOfLimitations: {
      personalInjury: "4 years from accident date",
      propertyDamage: "4 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Must carry uninsured motorist coverage",
      "Must exchange license, registration, and insurance information",
      "Financial responsibility must be shown after accident",
    ],
    requiredDocuments: [
      "Nebraska Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Medical documentation",
    ],
  },
  NH: {
    name: "New Hampshire",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Within 15 days if no police report filed",
      where: "New Hampshire DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Only state that does not require auto insurance (but must prove financial responsibility)",
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "If uninsured, must post bond or show financial responsibility after accident",
      "Uninsured motorist coverage recommended",
    ],
    requiredDocuments: [
      "New Hampshire Accident Report",
      "Police report",
      "Insurance or financial responsibility documentation",
      "Photos of damage",
      "Witness statements",
    ],
  },
  NJ: {
    name: "New Jersey",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$15,000 per person / $30,000 per accident",
      propertyDamage: "$5,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "10 days from accident",
      where: "New Jersey MVC (Form NA-1)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "Choice no-fault state - drivers choose verbal or dollar threshold",
      "Verbal threshold limits lawsuits to serious injuries",
      "Dollar threshold ($3,600) allows broader lawsuit rights",
      "PIP coverage required; limits depend on chosen plan",
    ],
    requiredDocuments: [
      "NA-1 Accident Report Form",
      "PIP claim form",
      "Police report",
      "Medical records",
      "Proof of insurance",
    ],
  },
  NM: {
    name: "New Mexico",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$500+ in damage or any injury",
      deadline: "Within 5 days",
      where: "New Mexico Motor Vehicle Division",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "4 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "Must carry proof of insurance and present to officer if asked",
      "Uninsured motorist coverage required unless waived",
      "Must exchange contact and insurance information at scene",
    ],
    requiredDocuments: [
      "New Mexico Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of vehicles and damage",
      "Medical records if injured",
    ],
  },
  NV: {
    name: "Nevada",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$750+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Nevada DMV (SR-1 Form)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry proof of insurance at all times",
      "Uninsured motorist coverage required",
      "Must report to DMV within 10 days of accidents meeting threshold",
    ],
    requiredDocuments: [
      "SR-1 Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Witness contact information",
    ],
  },
  OH: {
    name: "Ohio",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately to police if injury; otherwise within 10 days",
      where: "Ohio BMV (Crash Report)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry proof of financial responsibility",
      "Uninsured motorist coverage required",
      "Must exchange information with all involved parties",
    ],
    requiredDocuments: [
      "Ohio Crash Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage and scene",
      "Medical documentation",
    ],
  },
  OK: {
    name: "Oklahoma",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$300+ in damage or any injury",
      deadline: "Immediately to police; 10 days to DMV if police not present",
      where: "Oklahoma Department of Public Safety",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must exchange name, address, license, and insurance info at scene",
      "Uninsured motorist coverage required",
      "Must render reasonable aid to injured parties",
    ],
    requiredDocuments: [
      "Oklahoma Accident Report",
      "Police report",
      "Insurance information exchange",
      "Witness statements",
      "Photos of damage",
    ],
  },
  OR: {
    name: "Oregon",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$2,500+ in damage or any injury",
      deadline: "72 hours from accident",
      where: "Oregon DMV (Form 735-32)",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "PIP coverage ($15,000) required",
      "Must carry uninsured motorist coverage",
      "Must report if there is injury, death, or damage over $2,500",
    ],
    requiredDocuments: [
      "Oregon DMV Form 735-32 Accident Report",
      "Police report if applicable",
      "PIP claim form",
      "Insurance information exchange",
      "Medical records if injured",
    ],
  },
  PA: {
    name: "Pennsylvania",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$15,000 per person / $30,000 per accident",
      propertyDamage: "$5,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "5 days if police did not file a report",
      where: "Pennsylvania PennDOT",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Choice no-fault state - limited or full tort options",
      "Limited tort restricts right to sue; full tort allows broader claims",
      "PIP coverage ($5,000) required",
      "Must carry uninsured motorist coverage",
    ],
    requiredDocuments: [
      "PennDOT Accident Report (AA-600)",
      "PIP claim form",
      "Police report",
      "Medical documentation",
      "Proof of insurance",
    ],
  },
  RI: {
    name: "Rhode Island",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately to police if injury; otherwise 21 days",
      where: "Rhode Island DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "10 years from accident date",
    },
    specialRules: [
      "Pure comparative fault state",
      "Rhode Island has one of the longest property damage statutes of limitations (10 years)",
      "Must carry uninsured motorist coverage",
      "Must exchange contact and insurance info at scene",
    ],
    requiredDocuments: [
      "Rhode Island Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Witness statements",
    ],
  },
  SC: {
    name: "South Carolina",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "15 days from accident",
      where: "South Carolina DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Uninsured motorist coverage required",
      "Must carry proof of insurance at all times",
      "Financial responsibility law strictly enforced",
    ],
    requiredDocuments: [
      "South Carolina Accident Report (FR-309)",
      "Police report",
      "Insurance information exchange",
      "Photos of damage and scene",
      "Medical records if injured",
    ],
  },
  SD: {
    name: "South Dakota",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Within 30 days if police report not filed",
      where: "South Dakota Department of Revenue",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured/underinsured motorist coverage",
      "Must exchange contact and insurance information at scene",
      "SR-22 may be required after serious violations",
    ],
    requiredDocuments: [
      "South Dakota Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Witness contact information",
    ],
  },
  TN: {
    name: "Tennessee",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$400+ in damage or any injury",
      deadline: "20 days from accident",
      where: "Tennessee Department of Safety and Homeland Security",
    },
    statueOfLimitations: {
      personalInjury: "1 year from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 50% or more at fault",
      "Tennessee has a short 1-year statute of limitations for personal injury",
      "Must exchange contact and insurance information",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "Tennessee Accident Report (SR-21)",
      "Police report",
      "Insurance information exchange",
      "Medical documentation if injured",
      "Photos of vehicles and scene",
    ],
  },
  UT: {
    name: "Utah",
    faultType: "No-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $65,000 per accident",
      propertyDamage: "$15,000",
    },
    reportingRequirements: {
      threshold: "$2,500+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Utah Division of Motor Vehicles",
    },
    statueOfLimitations: {
      personalInjury: "4 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "No-fault state - PIP coverage ($3,000) required",
      "Can sue for serious injuries or medical expenses over $3,000",
      "Modified comparative fault applies for lawsuits",
      "Must carry uninsured motorist coverage",
    ],
    requiredDocuments: [
      "Utah Accident Report",
      "PIP claim form",
      "Police report",
      "Medical records",
      "Insurance information exchange",
    ],
  },
  VA: {
    name: "Virginia",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$30,000 per person / $60,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$1,500+ in damage or any injury",
      deadline: "Immediately to police if injury or death",
      where: "Virginia DMV",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "5 years from accident date",
    },
    specialRules: [
      "Contributory negligence state - any fault may bar recovery entirely",
      "Uninsured motorist fee ($500/year) can be paid instead of insurance, but not recommended",
      "Must exchange contact and insurance information",
      "Insurance minimums recently increased effective 2025",
    ],
    requiredDocuments: [
      "Virginia DMV Crash Report (CRD-1)",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Medical records if injured",
    ],
  },
  VT: {
    name: "Vermont",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$3,000+ in damage or any injury",
      deadline: "72 hours from accident",
      where: "Vermont DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "3 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured/underinsured motorist coverage",
      "Must report accidents involving injury, death, or property damage over threshold",
      "Must exchange contact and insurance information at scene",
    ],
    requiredDocuments: [
      "Vermont Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Medical documentation",
    ],
  },
  WI: {
    name: "Wisconsin",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$10,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Wisconsin DMV",
    },
    statueOfLimitations: {
      personalInjury: "3 years from accident date",
      propertyDamage: "6 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured motorist coverage",
      "Must exchange contact, license, and insurance info",
      "SR-21 form required for reportable accidents",
    ],
    requiredDocuments: [
      "Wisconsin Accident Report (MV4002)",
      "Police report",
      "Insurance information exchange",
      "SR-21 Form",
      "Medical records if injured",
    ],
  },
  WV: {
    name: "West Virginia",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$25,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "Immediately to police; 15 days to DMV if no officer",
      where: "West Virginia DMV",
    },
    statueOfLimitations: {
      personalInjury: "2 years from accident date",
      propertyDamage: "2 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry uninsured motorist coverage",
      "Must exchange contact and insurance information at scene",
      "Must remain at scene until police arrive if injury occurred",
    ],
    requiredDocuments: [
      "West Virginia Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage",
      "Medical records if injured",
    ],
  },
  WY: {
    name: "Wyoming",
    faultType: "At-Fault State",
    minimumLiability: {
      bodilyInjury: "$25,000 per person / $50,000 per accident",
      propertyDamage: "$20,000",
    },
    reportingRequirements: {
      threshold: "$1,000+ in damage or any injury",
      deadline: "10 days from accident",
      where: "Wyoming Department of Transportation",
    },
    statueOfLimitations: {
      personalInjury: "4 years from accident date",
      propertyDamage: "4 years from accident date",
    },
    specialRules: [
      "Modified comparative fault - cannot recover if 51% or more at fault",
      "Must carry proof of insurance at all times",
      "Must exchange contact and insurance information at scene",
      "Uninsured motorist coverage required",
    ],
    requiredDocuments: [
      "Wyoming Accident Report",
      "Police report",
      "Insurance information exchange",
      "Photos of damage and scene",
      "Witness statements",
    ],
  },
}

const states = [
  { value: "AK", label: "Alaska" },
  { value: "AL", label: "Alabama" },
  { value: "AR", label: "Arkansas" },
  { value: "AZ", label: "Arizona" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "IA", label: "Iowa" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "MA", label: "Massachusetts" },
  { value: "MD", label: "Maryland" },
  { value: "ME", label: "Maine" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MO", label: "Missouri" },
  { value: "MS", label: "Mississippi" },
  { value: "MT", label: "Montana" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "NE", label: "Nebraska" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NV", label: "Nevada" },
  { value: "NY", label: "New York" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VA", label: "Virginia" },
  { value: "VT", label: "Vermont" },
  { value: "WA", label: "Washington" },
  { value: "WI", label: "Wisconsin" },
  { value: "WV", label: "West Virginia" },
  { value: "WY", label: "Wyoming" },
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
