import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Domande Frequenti
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Qual è la dimensione delle piantine?</AccordionTrigger>
            <AccordionContent>
              Le nostre piante vengono spedite con un'altezza robusta tra{" "}
              <strong>10cm e 15cm</strong>, con un sistema radicale ben sviluppato e
              pronto per una crescita rapida.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>È una pianta perenne?</AccordionTrigger>
            <AccordionContent>
              Sì, sono piante perenni. Generalmente offrono una fioritura
              spettacolare dalla{" "}
              <strong>
                tarda primavera per tutta l'estate fino all'autunno inoltrato
              </strong>
              . Nei climi più caldi, possono fiorire quasi tutto l'anno.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Posso piantarle in autunno o inverno?</AccordionTrigger>
            <AccordionContent>
              Assolutamente! Possono essere piantate tutto l'anno. Nei mesi più
              freddi, consigliamo di iniziare in vaso all'interno o in una serra
              vicino a una finestra soleggiata, spostandole all'esterno una volta
              passato il rischio di gelo.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Richiedono molta manutenzione?</AccordionTrigger>
            <AccordionContent>
              Affatto. Sono piante semplici che prosperano facilmente. Consigli
              chiave: assicurati che ricevano{" "}
              <strong>4-6 ore di sole diretto</strong> al giorno, mantieni il
              terreno costantemente umido (ma non inzuppato) e usa un fertilizzante
              bilanciato durante la stagione di fioritura.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
