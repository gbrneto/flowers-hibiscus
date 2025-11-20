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
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the size of the young plants?</AccordionTrigger>
            <AccordionContent>
              Our plants are shipped at a robust size of{" "}
              <strong>10cm to 15cm (4-6 inches)</strong>, with a well-established
              root system ready for quick growth upon arrival.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it a perennial plant?</AccordionTrigger>
            <AccordionContent>
              Yes, these are perennial plants. They typically provide a spectacular
              bloom from{" "}
              <strong>late spring through summer and well into autumn</strong>. In
              warmer climates, they can bloom nearly year-round.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I plant them in Autumn or Winter?</AccordionTrigger>
            <AccordionContent>
              They can be planted year-round. In colder months, we
              recommend starting them in pots indoors or in a greenhouse near a
              sunny window, moving them outside once the risk of frost has passed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Do they require a lot of maintenance?</AccordionTrigger>
            <AccordionContent>
              Not at all. These are low-maintenance plants that thrive easily. Key
              care tips: Ensure they get <strong>4-6 hours of direct sunlight</strong>{" "}
              daily, keep the soil consistently moist (but not waterlogged), and use
              a balanced fertilizer during the blooming season.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
