/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}

export default function GameTrailers({ trailers }: { trailers: Trailer[] }) {
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(trailers[0] || null)

  if (!trailers.length) return null

  return (
    <div>
      {activeTrailer && (
        <div className="mb-4">
          <video src={activeTrailer.data.max} controls className="w-full rounded-lg" poster={activeTrailer.preview}>
            Your browser does not support the video tag.
          </video>
          <h3 className="mt-2 font-medium">{activeTrailer.name}</h3>
        </div>
      )}

      {trailers.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {trailers.map((trailer) => (
            <div
              key={trailer.id}
              onClick={() => setActiveTrailer(trailer)}
              className={`relative cursor-pointer rounded-lg overflow-hidden ${
                activeTrailer?.id === trailer.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="relative aspect-video">
                <img
                  src={trailer.preview || "/placeholder.svg"}
                  alt={trailer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={24} className="text-white" />
                </div>
              </div>
              <p className="text-xs p-2 truncate">{trailer.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

