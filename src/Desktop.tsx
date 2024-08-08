import { useState, useEffect } from 'react'
type PositionState = {
  top: number | string
  left: number | string
}
type FontColorState = {
  r: number | string
  g: number | string
  b: number | string
}

export const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [position, setPosition] = useState<PositionState>({ top: 0, left: 0 })
  const [fontColor, setFontColor] = useState<FontColorState>({
    r: 1,
    g: 1,
    b: 1,
  })

  useEffect(() => {
    // update clock every 1 second
    const timeIntervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)
    // change clocks position every 4 seconds
    const positionIntervalId = setInterval(() => {
      const screenWidth = 800
      const screenHeight = 600
      const randomTop = Math.random() * (screenHeight - 50)
      const randomLeft = Math.random() * (screenWidth - 150)
      setPosition({
        top: `${randomTop}px`,
        left: `${randomLeft}px`,
      })
    }, 4000)

    // update color every 100 miliseconds
    const fontColorInterval = setInterval(() => {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      setFontColor({ r: r, g: g, b: b })
    }, 1000)

    return () => {
      clearInterval(timeIntervalId)
      clearInterval(positionIntervalId)
      clearInterval(fontColorInterval)
    }
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return (
    <div className="relative w-[800px] h-[600px] rounded-sm">
      <div
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: `rgb(${fontColor.r},${fontColor.g},${fontColor.b})`,
          borderRadius: '5px',
        }}
      >
        <h1 className="text-2xl">{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</h1>
      </div>
    </div>
  )
}
