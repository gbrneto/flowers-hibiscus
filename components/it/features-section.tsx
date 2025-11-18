import { Flower2 } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      title: "Fiori Sorprendenti",
      description: "Ogni fiore vanta più strati di petali arricciat per un aspetto più pieno e drammatico.",
    },
    {
      title: "Lunga Stagione di Fioritura",
      description: "Goditi fiori continui dall'estate fino all'inizio dell'autunno.",
    },
    {
      title: "Perfetto per qualsiasi spazio",
      description: "Che sia piantato in vasi, aiuole o lungo i vialetti, brilla ovunque cresca.",
    },
    {
      title: "Calamita per Farfalle e Colibrì",
      description: "Queste bellezze tropicali attirano gli impollinatori, aggiungendo vita e movimento al tuo giardino.",
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
              Il tuo browser non supporta il tag video.
            </video>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            Scatena un'Esplosione Tropicale di Petali: Giovani Piante di Ibisco Doppio Raro
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            Porta un'atmosfera lussureggiante ed esotica nel tuo giardino con le nostre{" "}
            <span className="font-semibold text-foreground">Piante di Ibisco Doppio</span>. Conosciute per i loro fiori pieni e stratificati e i colori vibranti, questi fiori creano uno spettacolo straordinario impossibile da ignorare.
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
