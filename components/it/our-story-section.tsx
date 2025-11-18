import { Star } from 'lucide-react'
import Image from "next/image"

export function OurStorySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/design-mode/Gemini_Generated_Image_bh8t6jbh8t6jbh8t.png"
                alt="Helena Viana, fondatrice di Versia Garden, in serra"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">La Nostra Storia</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                La storia di Versia Garden inizia con la passione della nostra fondatrice, la botanica Helena Viana, per il potere dei fiori di trasformare l'ordinario nello straordinario. Ha visto che migliaia di persone condividevano questo sogno ma erano trattenute dalla frustrazione di semi rari inaccessibili e difficili da coltivare. La sua missione è diventata chiara: creare un ecosistema completo per permettere a chiunque di avere successo, concentrandosi esclusivamente sulla gioia del giardinaggio.
              </p>

              <p>
                Da quella missione è nato il movimento 'The Colour Awakening'. Oggi siamo più di un negozio; siamo partner per tutti coloro che desiderano essere agenti di trasformazione coltivando la bellezza nelle proprie case. Unisciti a noi, pianta un seme e guarda la tua storia di colore svolgersi.
              </p>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center gap-2 pt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">(19.329 Recensioni)</span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/design-mode/a8e399fcfcf6a29c3ce0bd1ae5ff2900d1d38aa9.webp"
              alt="Processo di germinazione dell'ibisco"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
