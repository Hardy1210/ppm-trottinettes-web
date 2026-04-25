'use client'

import { PrimaryButton } from '@/ui/Buttons'
import { useEffect, useState } from 'react'

export function ValidationOverlay() {
const [ showOverlay, setShowOverlay ] = useState(false)

useEffect(() => {
    const timer = window.setTimeout(() => {
        setShowOverlay(true)
    }, 3_000)
    return () => window.clearTimeout(timer)
}, [])
if (!showOverlay) return null

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500 font-title">
          Prévisualisation
        </p>

        <h1 className="text-2xl font-semibold text-neutral-950 font-title">
          Site en cours de validation
        </h1>

        <p className="mt-4 text-sm leading-6 text-neutral-600 font-body">
          Ce lien est une version de prévisualisation temporaire. La mise en
          ligne officielle sera disponible prochainement sur le nom de domaine
          définitif.
        </p>
        <div className="mt-6">
            <PrimaryButton onClick={() => setShowOverlay(false)}>
                Accéder au site
            </PrimaryButton>
        </div>
      </div>
    </div>
  );
}