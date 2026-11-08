import { Scale, ShieldCheck, FlaskConical, Mail, Calendar, Github, Linkedin } from "lucide-react";

const principles = [
  {
    icon: Scale,
    title: "Baseline first",
    description:
      "A simple model has to lose before a bigger one is allowed in. On a flight-delay dataset the simple one won, and I have distrusted training-set wins ever since.",
  },
  {
    icon: ShieldCheck,
    title: "A human gate where mistakes are expensive",
    description:
      "ConfMail holds sensitive requests for a person instead of guessing. Automation earns trust one lane at a time, with the thresholds chosen on real traffic.",
  },
  {
    icon: FlaskConical,
    title: "Tests at production scale",
    description:
      "A change that passes on six files can fail on six thousand. I load-check before merge, because I once learned that the hard way.",
  },
];

const links = [
  { icon: Mail, label: "Email", value: "satasiyasahil14@gmail.com", href: "mailto:satasiyasahil14@gmail.com" },
  { icon: Calendar, label: "Calendly", value: "30 minute intro call", href: "https://calendly.com/satasiyasahil14/30min" },
  { icon: Github, label: "GitHub", value: "@sahil1402", href: "https://github.com/sahil1402" },
  { icon: Linkedin, label: "LinkedIn", value: "@sahilsatasiya", href: "https://www.linkedin.com/in/sahilsatasiya/" },
];

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
              Introduction
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                Sahil Satasiya
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            A software and machine-learning engineer in Los Angeles, finishing an MS in Computer Science at USC
            while working on two production systems: HARVEST, the training-data intake platform at Meridian
            Intelligence, and ConfMail, an email assistant for conference chairs that I built at USC&apos;s Melady Lab.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Open to software, ML and AI roles", "Los Angeles", "MS Computer Science, USC"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-card/50 px-3.5 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">About me</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I actually do</h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                At Meridian Intelligence I work on HARVEST, the platform that takes in training data from partners.
                Most of that work is making intake boring: a storage audit that found 5.47 TB stored for 1.83 TB of
                unique files, a trace of how six files became 797 ingest runs and the dispatch throttle that fixed it,
                and an in-app feedback product that went from idea to production in eleven days.
              </p>
              <p>
                At USC&apos;s Melady Lab I built ConfMail, an assistant that drafts and routes email for conference
                chairs. It runs in a live pilot for AAAI-27 on AAAI&apos;s own server. The part I care about most is
                where it refuses to act: sensitive requests are held for a person, and every threshold was chosen on
                real chair traffic. It ships with more than 2,400 backend tests.
              </p>
              <p>
                Before that I co-founded CampusX, a student marketplace at USC, where I built an LLM trust-and-safety
                classifier and a two-tower recommender; built PySpark data pipelines at Tata Consultancy Services for
                Givaudan; and learned on a flight-delay dataset that a logistic regression can beat XGBoost if you let
                it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">How I work</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Three habits I bring to a team</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.title}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Now</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Shipping on HARVEST, keeping ConfMail&apos;s pilot healthy, and looking for the next team.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                If any of this would help your team, email is the fastest way to reach me.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded border border-border/50 bg-background/40 px-4 py-3 transition-all duration-300 hover:border-primary/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                    <link.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground">{link.label}</span>
                    <span className="block truncate text-sm text-foreground group-hover:text-primary transition-colors">{link.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
