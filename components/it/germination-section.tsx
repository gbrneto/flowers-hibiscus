export function GerminationSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text Content - Shows first on mobile, left on desktop */}
          <div className="md:w-1/2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              LA NOSTRA CURA ESPERTA GARANTISCE CHE LE TUE PIANTE PROSPERINO
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Ognuna delle nostre giovani piante è curata da coltivatori esperti per sviluppare un sistema radicale robusto, rendendola forte e resiliente.
              </p>

              <p>
                Le spediamo direttamente dal nostro vivaio a te in imballaggi su misura e sicuri. Questo assicura che la tua pianta arrivi sana e pronta a prosperare, saltando completamente la fase fragile e incerta della germinazione.
              </p>
            </div>
          </div>

          {/* Image - Shows second on mobile, right on desktop */}
          <div className="mt-8 md:mt-0 md:w-1/2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/design-mode/image%20895.png"
                alt="Vassoio di germinazione con piantine e mano che apre il coperchio"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
