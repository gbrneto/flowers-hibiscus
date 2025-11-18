import { Flower2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Eye-Catching Blooms",
      description: "Each flower boasts multiple layers of ruffled petals for a fuller, more dramatic look.",
    },
    {
      title: "Long Flowering Season",
      description: "Enjoy continuous blooms from summer into early fall.",
    },
    {
      title: "Perfect for any space",
      description: "Whether planted in pots, garden beds, or along walkways, they shine wherever they grow.",
    },
    {
      title: "Butterfly & Hummingbird Magnet",
      description: "These tropical beauties attract pollinators, adding life and movement to your garden.",
    },
  ]

  return (
    <section className="bg-background py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
            <video autoPlay loop muted playsInline className="w-full rounded-lg">
              <source
                src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Sementes/0922%282%29.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            Unleash a Tropical Explosion of Petals: Rare Double Hibiscus Young Plants
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            Bring a lush, exotic vibe to your garden with our{" "}
            <span className="font-semibold text-foreground">Double Hibiscus</span> Starter Plants. Known for their full, layered
            blooms and vibrant colors, these flowers create a striking display that's impossible to ignore.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Features You'll Love</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 text-emerald-600">
                    <Flower2 className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
