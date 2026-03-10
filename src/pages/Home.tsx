import { Link } from "react-router-dom"
import {
  ClipboardCheck,
  MapPin,
  Users,
  Shield,
  Phone,
  CheckCircle,
  Wrench,
  Scale,
  Stethoscope,
  Car,
} from "lucide-react"
import { ButtonLink } from "@/components/ButtonLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Trusted by 50,000+ accident victims
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Stay Calm. We'll Guide You Through It.
              </h1>
              <p className="mb-8 max-w-xl text-xl text-blue-100">
                Been in an accident? Get immediate step-by-step guidance and
                connect with trusted local professionals—all in one place.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonLink
                  to="/checklist"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <ClipboardCheck className="mr-2 h-5 w-5" />
                  Start Accident Checklist
                </ButtonLink>
                <ButtonLink
                  to="/find-providers"
                  variant="heroOutline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Find Local Help
                </ButtonLink>
              </div>
              <div className="mt-8 flex items-center gap-2 text-blue-100">
                <Phone className="h-4 w-4" />
                <span>
                  24/7 Emergency Support:{" "}
                  <span className="font-semibold text-white">1-800-ACCIDENT</span>
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
                <img
                  src="/hero.jpeg"
                  alt="Emergency roadside assistance after a car accident"
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                50K+
              </div>
              <div className="text-muted-foreground">People Helped</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                2,500+
              </div>
              <div className="text-muted-foreground">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                50
              </div>
              <div className="text-muted-foreground">States Covered</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                24/7
              </div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need After an Accident
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              From immediate guidance to finding trusted help, we've got you
              covered every step of the way.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Link to="/checklist" className="group">
              <Card className="h-full cursor-pointer border-2 transition-shadow hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <CardTitle>Interactive Accident Checklist</CardTitle>
                  <CardDescription>
                    Step-by-step digital guidance to help you immediately after
                    an accident. Know exactly what to do and when.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Safety checks and emergency procedures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Documentation and photo guidance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Insurance claim preparation
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/find-providers" className="group">
              <Card className="h-full cursor-pointer border-2 transition-shadow hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500/20">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Verified Local Providers</CardTitle>
                  <CardDescription>
                    Instantly connect with trusted towing services, body shops,
                    attorneys, medical clinics, and rental car companies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Background-checked professionals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Real reviews from accident victims
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Direct contact information
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link to="/state-guidance" className="group">
              <Card className="h-full cursor-pointer border-2 transition-shadow hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 transition-colors group-hover:bg-purple-500/20">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <CardTitle>State-Specific Guidance</CardTitle>
                  <CardDescription>
                    Get accurate legal and insurance information tailored to
                    your state's specific regulations and requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Local insurance requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        State-specific legal obligations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Reporting deadlines and procedures
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Provider Types - chips in sets of 3+ */}
      <section className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Connect with Trusted Professionals
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              We partner with verified, high-quality service providers in your
              area
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: Wrench, label: "Towing Services", color: "bg-orange-100 text-orange-600" },
              { icon: Car, label: "Body Shops", color: "bg-blue-100 text-blue-600" },
              { icon: Scale, label: "Attorneys", color: "bg-purple-100 text-purple-600" },
              { icon: Stethoscope, label: "Medical Clinics", color: "bg-red-100 text-red-600" },
              { icon: Car, label: "Rental Cars", color: "bg-green-100 text-green-600" },
            ].map((provider, index) => (
              <Card
                key={index}
                className="text-center transition-shadow hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${provider.color}`}
                  >
                    <provider.icon className="h-8 w-8" />
                  </div>
                  <p className="font-semibold text-foreground">{provider.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink to="/find-providers" variant="default" size="lg">
              Find Providers Near You
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-muted/50 to-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How AccidentConnect Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to get the help you need
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Complete the Checklist",
                desc: "Follow our interactive accident checklist to ensure you take all necessary steps at the scene and document everything properly.",
              },
              {
                step: 2,
                title: "Get State Guidance",
                desc: "Receive customized legal and insurance information based on your state's specific requirements and regulations.",
              },
              {
                step: 3,
                title: "Connect with Providers",
                desc: "Get matched with verified local professionals including towing, repair shops, attorneys, and medical services.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <Card className="h-full shadow-md">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Been in an accident? Don't wait.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Get immediate guidance and connect with trusted local help right now.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink
              to="/checklist"
              variant="hero"
              size="lg"
              className="w-full sm:w-auto"
            >
              <ClipboardCheck className="mr-2 h-5 w-5" />
              Start Accident Checklist
            </ButtonLink>
            <ButtonLink
              to="/find-providers"
              variant="heroOutline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Phone className="mr-2 h-5 w-5" />
              Get Emergency Help
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  )
}
