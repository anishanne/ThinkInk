"use client"

import { useCallback, useEffect, useRef } from "react"
import ReactCanvasConfetti from "react-canvas-confetti"

interface ConfettiProps {
  active: boolean
  onComplete?: () => void
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const refAnimationInstance = useRef<any>(null)

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })

    // Call onComplete after animation finishes
    setTimeout(() => {
      onComplete && onComplete()
    }, 2000)
  }, [makeShot, onComplete])

  useEffect(() => {
    if (active) {
      fire()
    }
  }, [active, fire])

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    />
  )
}
