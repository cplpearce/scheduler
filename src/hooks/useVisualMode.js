import { useState } from 'react'

export default function useVisualMode(initMode, newMode) {
  const [mode, setMode] = useState(initMode);

  return { mode }
}