import { useState } from "react"
import {
  Search,
  MapPin,
  Star,
  Phone,
  Mail,
  ExternalLink,
  Wrench,
  Car,
  Scale,
  Stethoscope,
  Clock,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Review {
  author: string
  rating: number
  comment: string
}

interface Provider {
  id: string
  name: string
  type: string
  rating: number
  reviewCount: number
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  distance: number
  verified: boolean
  featured: boolean
  specialties: string[]
  openNow: boolean
  responseTime: string
  reviews: Review[]
}

const mockProviders: Provider[] = [
  { id: "1", name: "QuickTow 24/7 Emergency Service", type: "towing", rating: 4.9, reviewCount: 342, phone: "(555) 123-4567", address: "123 Main St", city: "Springfield", state: "CA", zipCode: "90210", distance: 2.3, verified: true, featured: true, specialties: ["Emergency Towing", "Flatbed", "Heavy Duty"], openNow: true, responseTime: "15-20 min", reviews: [
    { author: "Marcus T.", rating: 5, comment: "Showed up in under 15 minutes after my accident on the highway. Driver was professional and careful with my car. Highly recommend!" },
    { author: "Diane R.", rating: 5, comment: "Called at 2am and they were there within 20 minutes. Fair pricing and very courteous. Will definitely use again." },
  ]},
  { id: "2", name: "Premier Auto Body & Collision", type: "bodyshop", rating: 4.8, reviewCount: 567, phone: "(555) 234-5678", address: "456 Oak Ave", city: "Springfield", state: "CA", zipCode: "90211", distance: 3.1, verified: true, featured: true, specialties: ["Insurance Claims", "Paint & Body", "Frame Repair"], openNow: true, responseTime: "Same day estimates", reviews: [
    { author: "Sandra K.", rating: 5, comment: "My car looks brand new after the repair. They handled all the insurance paperwork and kept me updated throughout the process." },
    { author: "James L.", rating: 4, comment: "Great quality work. Took a few extra days but the paint match was perfect. Worth the wait." },
  ]},
  { id: "3", name: "Johnson & Associates Law Firm", type: "attorney", rating: 4.9, reviewCount: 189, phone: "(555) 345-6789", address: "789 Legal Plaza", city: "Springfield", state: "CA", zipCode: "90212", distance: 4.5, verified: true, featured: false, specialties: ["Personal Injury", "Car Accidents", "Insurance Disputes"], openNow: false, responseTime: "24hr consultation", reviews: [
    { author: "Patricia M.", rating: 5, comment: "Attorney Johnson fought hard for my settlement after a rear-end collision. I received 3x more than the insurance company's first offer." },
    { author: "Robert H.", rating: 5, comment: "Very responsive and kept me informed every step of the way. Settled my case in 4 months. Exceptional service." },
  ]},
  { id: "4", name: "Springfield Medical Center - Urgent Care", type: "medical", rating: 4.7, reviewCount: 823, phone: "(555) 456-7890", address: "321 Health Blvd", city: "Springfield", state: "CA", zipCode: "90213", distance: 1.8, verified: true, featured: true, specialties: ["Accident Injuries", "X-Ray on Site", "Workers Comp"], openNow: true, responseTime: "Walk-ins welcome", reviews: [
    { author: "Angela W.", rating: 5, comment: "Got checked out here right after my accident. X-rays were done on site and the staff was compassionate and thorough." },
    { author: "Kevin B.", rating: 4, comment: "Short wait time and the doctor took my neck pain seriously. Documented everything I needed for my insurance claim." },
  ]},
  { id: "5", name: "Elite Rental Cars", type: "rental", rating: 4.6, reviewCount: 445, phone: "(555) 567-8901", address: "654 Commerce Dr", city: "Springfield", state: "CA", zipCode: "90214", distance: 2.7, verified: true, featured: false, specialties: ["Insurance Replacements", "Same-Day Pickup", "Long-Term Rates"], openNow: true, responseTime: "2hr pickup", reviews: [
    { author: "Lisa N.", rating: 5, comment: "Coordinated directly with my insurance for a replacement vehicle. Had a clean car ready within 2 hours of my accident." },
    { author: "Tom G.", rating: 4, comment: "Good selection of vehicles and competitive rates. Staff was helpful explaining the insurance replacement process." },
  ]},
  { id: "6", name: "Reliable Towing Services", type: "towing", rating: 4.5, reviewCount: 234, phone: "(555) 678-9012", address: "987 Industrial Way", city: "Springfield", state: "CA", zipCode: "90215", distance: 5.2, verified: true, featured: false, specialties: ["24/7 Service", "Motorcycle Towing", "Lockout Service"], openNow: true, responseTime: "20-30 min", reviews: [
    { author: "Chris P.", rating: 5, comment: "Towed my motorcycle after a slide on the freeway. They handled it with great care and arrived faster than expected." },
    { author: "Maria S.", rating: 4, comment: "Reliable and honest pricing. Driver helped me stay calm after a stressful accident. Would recommend to anyone." },
  ]},
]

const providerTypes = [
  { value: "all", label: "All Services" },
  { value: "towing", label: "Towing Services" },
  { value: "bodyshop", label: "Body Shops" },
  { value: "attorney", label: "Attorneys" },
  { value: "medical", label: "Medical Care" },
  { value: "rental", label: "Rental Cars" },
]

const typeIcons: Record<string, typeof Shield> = {
  towing: Wrench,
  bodyshop: Car,
  attorney: Scale,
  medical: Stethoscope,
  rental: Car,
}

const typeColors: Record<string, string> = {
  towing: "bg-orange-100 text-orange-700 border-orange-200",
  bodyshop: "bg-blue-100 text-blue-700 border-blue-200",
  attorney: "bg-purple-100 text-purple-700 border-purple-200",
  medical: "bg-red-100 text-red-700 border-red-200",
  rental: "bg-green-100 text-green-700 border-green-200",
}

export function FindProviders() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchZip, setSearchZip] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("distance")
  const [reviewModalId, setReviewModalId] = useState<string | null>(null)
  const [newAuthor, setNewAuthor] = useState<string>("")
  const [newRating, setNewRating] = useState<number>(5)
  const [newComment, setNewComment] = useState<string>("")

  function openModal(id: string) {
    setReviewModalId(id)
    setNewAuthor("")
    setNewRating(5)
    setNewComment("")
  }

  function closeModal() {
    setReviewModalId(null)
  }

  function submitReview() {
    if (!newAuthor.trim() || !newComment.trim() || !reviewModalId) return
    setProviders((prev) =>
      prev.map((p) =>
        p.id === reviewModalId
          ? { ...p, reviews: [...p.reviews, { author: newAuthor.trim(), rating: newRating, comment: newComment.trim() }], reviewCount: p.reviewCount + 1 }
          : p
      )
    )
    closeModal()
  }

  const filteredProviders = providers
    .filter((p) => selectedType === "all" || p.type === selectedType)
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount
      return 0
    })

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Verified Providers Only</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Find Trusted Local Help
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Connect with verified, highly-rated professionals in your area. All
            providers are background-checked and reviewed by real customers.
          </p>
        </div>

        <Card className="mb-8 shadow-md">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Service Type
                </label>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  options={providerTypes}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  ZIP Code
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter ZIP"
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Sort By
                </label>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={[
                    { value: "distance", label: "Distance" },
                    { value: "rating", label: "Highest Rated" },
                    { value: "reviews", label: "Most Reviewed" },
                  ]}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 flex flex-wrap gap-2">
          {providerTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                selectedType === type.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProviders.length}
            </span>{" "}
            verified providers
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-600" />
            <span>All providers verified and background-checked</span>
          </div>
        </div>

        <div className="space-y-6">
          {filteredProviders.map((provider) => {
            const Icon = typeIcons[provider.type] ?? Shield
            const colorClass = typeColors[provider.type] ?? "bg-muted text-muted-foreground"

            return (
              <Card
                key={provider.id}
                className={`shadow-md transition-shadow hover:shadow-lg ${
                  provider.featured ? "border-2 border-primary/30" : ""
                }`}
              >
                {provider.featured && (
                  <div className="flex items-center gap-2 border-b border-border bg-primary/10 px-4 py-2 text-primary">
                    <Award className="h-4 w-4" />
                    <span className="text-sm font-medium">Featured Provider</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1">
                      <div className="mb-4 flex items-start gap-4">
                        <div
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
                        >
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 text-xl font-bold text-foreground">
                            {provider.name}
                          </h3>
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-foreground">
                                {provider.rating}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({provider.reviewCount} reviews)
                              </span>
                            </div>
                            {provider.verified && (
                              <Badge
                                variant="outline"
                                className="border-green-200 bg-green-50 text-green-700"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="mb-4 flex flex-wrap gap-2">
                            {provider.specialties.slice(0, 3).map((s, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {s}
                              </Badge>
                            ))}
                          </div>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {provider.address}, {provider.city}, {provider.state}{" "}
                                {provider.zipCode}
                              </span>
                              <Badge variant="outline">{provider.distance} mi</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <a
                                href={`tel:${provider.phone}`}
                                className="text-primary hover:underline"
                              >
                                {provider.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{provider.responseTime}</span>
                              {provider.openNow && (
                                <Badge className="border-green-200 bg-green-100 text-green-700">
                                  Open Now
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:w-64">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground">Customer Reviews</p>
                        <div className="h-[13rem] overflow-y-auto pr-1 space-y-3">
                        {provider.reviews.map((review, i) => (
                          <div key={i} className="rounded-lg bg-muted/50 p-3 text-sm">
                            <div className="mb-1 flex items-center gap-2">
                              <div className="flex">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                  <Star key={j} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="font-medium text-foreground">{review.author}</span>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-dashed"
                        onClick={() => openModal(provider.id)}
                      >
                        + Add Review
                      </Button>
                      <div className="flex gap-3 lg:flex-col">
                        <Button className="flex-1">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Providers
          </Button>
        </div>
      </div>

      {reviewModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 shadow-xl">
            <h2 className="mb-1 text-lg font-bold text-white">Write a Review</h2>
            <p className="mb-4 text-sm text-slate-300">
              {providers.find((p) => p.id === reviewModalId)?.name}
            </p>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-white">Your Name</label>
              <Input
                placeholder="e.g. John D."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="bg-slate-700 text-white placeholder:text-slate-400 border-slate-600"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-white">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-1 block text-sm font-medium text-white">Your Review</label>
              <textarea
                className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
                placeholder="Share your experience with this provider..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={submitReview} disabled={!newAuthor.trim() || !newComment.trim()}>
                Submit
              </Button>
              <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
