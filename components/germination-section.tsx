export function GerminationSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text Content - Shows first on mobile, left on desktop */}
          <div className="md:w-1/2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              OUR EXCLUSIVE TECHNIQUE GUARANTEES YOUR SEEDS WILL SPROUT
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Our <span className="font-bold text-black">Germination Tray</span> uses a hydroponic foam method that
                simultaneously breaks the seeds' dormancy and kickstarts germination. This means that in as little as{" "}
                <span className="font-bold text-black">12 hours</span> your seeds will develop into sprouts, ready to be
                transplanted into soil.
              </p>

              <p>
                Your purchase includes a complete Germination Guide with step-by-step instructions on how to use the
                germination tray.
              </p>
            </div>
          </div>

          {/* Image - Shows second on mobile, right on desktop */}
          <div className="mt-8 md:mt-0 md:w-1/2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/design-mode/image%20848.png"
                alt="Germination tray with seedlings and hand opening lid"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
