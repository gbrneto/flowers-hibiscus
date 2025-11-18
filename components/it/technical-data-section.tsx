export function TechnicalDataSection() {
  return (
    <section className="bg-[#3d6f5f] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Technical Data Sheet Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-[#3d6f5f] mb-4">Scheda Tecnica: Varietà di Ibisco Raro.</h2>
          <p className="text-gray-700 mb-8">
            Per il massimo successo nella coltivazione, abbiamo preparato una guida completa con tutte le informazioni che devi sapere su questi fiori spettacolari.
          </p>

          <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
            {/* Scientific Name */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Nome Scientifico</div>
              <div className="p-4 md:col-span-2">
                <span className="italic">Hibiscus sp.</span> (Genere <span className="text-red-600">Hibiscus</span>)
              </div>
            </div>

            {/* Common Names */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Nomi Comuni</div>
              <div className="p-4 md:col-span-2">
                <span className="text-red-600">Ibisco</span>, Malva Rosa
              </div>
            </div>

            {/* Origin */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Origine</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">Asia e Isole del Pacifico</span>
              </div>
            </div>

            {/* Flower Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Colori dei Fiori</div>
              <div className="p-4 md:col-span-2">
                I nostri kit contengono giovani piantine sane di varietà rare con combinazioni di colori esotici e vibranti.
              </div>
            </div>

            {/* Ideal Planting Season */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Stagione di Piantagione Ideale</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">Tutto l'anno.</span>
              </div>
            </div>

            {/* Flowering Season */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Stagione di Fioritura</div>
              <div className="p-4 md:col-span-2">
                <span className="text-red-600">Principalmente in Estate e Autunno.</span> Nei climi caldi, può fiorire tutto l'anno.
              </div>
            </div>

            {/* Light Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Requisiti di Luce</div>
              <div className="p-4 md:col-span-2">
                <span className="text-blue-600">Spettro Completo.</span> Richiede 4-6 ore di sole diretto o luce artificiale equivalente al giorno.
              </div>
            </div>

            {/* Watering */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Irrigazione</div>
              <div className="p-4 md:col-span-2">Regolare. Mantenere il terreno costantemente umido, ma mai inzuppato.</div>
            </div>

            {/* Soil Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Tipo di Terreno</div>
              <div className="p-4 md:col-span-2">
                Fertile, ben drenante e ricco di materia organica. Leggermente acido (pH 6,5-6,8).
              </div>
            </div>

            {/* Plant Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Altezza della Pianta</div>
              <div className="p-4 md:col-span-2">
                Da 0,5 a 2 metri (1,64-6,5 piedi), a seconda della varietà e della potatura.
              </div>
            </div>

            {/* Life Cycle */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50">Ciclo di Vita</div>
              <div className="p-4 md:col-span-2">Perenne</div>
            </div>

            {/* Attracts */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-4 font-semibold bg-gray-50">Attira</div>
              <div className="p-4 md:col-span-2">
                <span className="font-semibold">Colibrì e Farfalle</span>, portando più vita nel tuo giardino.
              </div>
            </div>
          </div>
        </div>

        {/* European Cultivation Guide Card */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Guida alla Coltivazione Europea</h2>
          <p className="text-gray-700 mb-8">
            Le nostre varietà rare di <span className="text-red-600">Ibisco</span> possono portare un tocco tropicale nei giardini di tutta Europa. Con la giusta cura, puoi ottenere risultati straordinari.
          </p>

          <div className="space-y-6">
            {/* Ideal for Planting Directly in the Garden */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ideale per Piantare Direttamente in Giardino:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <span className="text-blue-600">
                    Portogallo, Spagna, Francia Meridionale, Italia, Grecia, Croazia, Cipro e Malta
                  </span>
                  , ecc.
                </li>
              </ul>
            </div>

            {/* Perfect for Patios & Balconies */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Perfetto per Patii e Balconi (in Vaso):</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <span className="text-blue-600">
                    Regno Unito, Irlanda, Germania, Paesi Bassi, Belgio, Polonia, Austria, Svizzera
                  </span>
                  , ecc.
                </li>
              </ul>
            </div>

            {/* Essential Tip */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="text-gray-800">
                <span className="font-bold">Consiglio Essenziale:</span> Nei paesi più freddi, basta portare il tuo Ibisco in vaso all'interno in un luogo luminoso prima del primo gelo invernale per godere della sua bellezza anno dopo anno.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
