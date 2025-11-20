import { Flower2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Fioriture Spettacolari",
      description:
        "Ogni fiore sboccia con molteplici strati di petali ondulati, creando un effetto voluminoso e scenografico unico nel suo genere.",
    },
    {
      title: "Fioritura Prolungata",
      description:
        "Un'esplosione di colori che ti accompagna senza sosta dall'inizio dell'estate fino ai primi freschi autunnali.",
    },
    {
      title: "Ideale per Ogni Spazio",
      description:
        "In vaso sul terrazzo, in aiuola o lungo i vialetti: queste piante donano splendore ovunque decidano di mettere radici.",
    },
    {
      title: "Un Richiamo per la Natura",
      description:
        "Queste meraviglie tropicali attirano farfalle e impollinatori, portando vita, movimento e allegria nel tuo angolo verde.",
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
                src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/video%20hibiscus%20pg.mp4"
                type="video/mp4"
              />
              Il tuo browser non supporta il tag video.
            </video>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            Trasforma il tuo Giardino in un Paradiso Tropicale: Rari Ibischi Doppi, Pronti a Fiorire
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            Dona un tocco esotico e lussureggiante ai tuoi spazi con i nostri{" "}
            <span className="font-semibold text-foreground">Ibischi Doppi</span>. Famosi per i loro fiori ricchi,
            strutturati e dai colori vibranti, regalano uno spettacolo naturale che lascia senza fiato.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Caratteristiche che Amerai</h3>

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
