import { Check, X } from 'lucide-react'

export function ComparisonSection() {
  const features = [
    "Giovani Piante Curate Professionalmente non OGM",
    "Garanzia di Arrivo Sano e Crescita",
    "Kit Completo con Guida e Garanzia",
    "Supporto Clienti 24/7",
    "Pagamento 100% Sicuro Con Crittografia SSL",
    "Guida alla Germinazione con Istruzioni Passo-Passo",
    "Guida alla Piantagione e Cura con Istruzioni Passo-Passo",
  ]

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Heading */}
          <div className="lg:max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Perché scegliere il Kit di Giovani Piante di Ibisco di Versia Garden?
            </h2>
            <p className="text-muted-foreground">Scopri perché i nostri kit offrono risultati superiori.</p>
          </div>

          {/* Comparison Table */}
          <div className="flex-1 lg:max-w-xl">
            {/* Table Header - only shows Versia and Others */}
            <div className="flex justify-end gap-0 mb-2 pr-1">
              <div className="w-24 text-center font-bold text-sm">Versia</div>
              <div className="w-24 text-center font-bold text-sm">Altri</div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col gap-0 shadow-lg rounded-lg overflow-hidden">
              {features.map((feature, index) => (
                <div key={index} className="flex">
                  {/* Feature column - green background with left rounded corners */}
                  <div
                    className={`bg-[#2d5f4f] text-white p-4 font-medium text-sm md:text-base flex-1 ${
                      index === 0 ? "rounded-tl-lg" : ""
                    } ${index === features.length - 1 ? "rounded-bl-lg" : ""}`}
                  >
                    {feature}
                  </div>

                  {/* Versia column - checkmark */}
                  <div className="w-24 bg-white p-4 flex items-center justify-center border-l border-gray-200">
                    <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                  </div>

                  {/* Others column - X mark with right rounded corners */}
                  <div
                    className={`w-24 bg-white p-4 flex items-center justify-center border-l border-gray-200 ${
                      index === 0 ? "rounded-tr-lg" : ""
                    } ${index === features.length - 1 ? "rounded-br-lg" : ""}`}
                  >
                    <X className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
