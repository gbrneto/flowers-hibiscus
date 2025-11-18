export default function Loading() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="bg-[#002F5D] text-white text-center py-2 px-4">
        <p className="text-sm">Loading...</p>
      </div>

      <main className="w-full max-w-md mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-24 bg-gray-200 rounded-lg" />
          <div className="aspect-[9/16] bg-gray-200 rounded-[3rem] mx-auto" style={{ maxWidth: '320px' }} />
          <div className="h-32 bg-gray-200 rounded-lg" />
          <div className="h-14 bg-gray-200 rounded-lg" />
        </div>
      </main>
    </div>
  )
}
