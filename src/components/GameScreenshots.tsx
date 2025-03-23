/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface Screenshot {
  id: number
  image: string
}

export default function GameScreenshots({ screenshots }: { screenshots: Screenshot[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!screenshots.length) return null

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            onClick={() => setSelectedImage(screenshot.image)}
            className="cursor-pointer rounded-lg overflow-hidden"
          >
            <div className="relative aspect-video">
              <Image src={screenshot.image || "/placeholder.svg"} alt="Game screenshot" fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Game screenshot fullscreen"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  )
}

