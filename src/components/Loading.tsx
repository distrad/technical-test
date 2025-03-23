export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

