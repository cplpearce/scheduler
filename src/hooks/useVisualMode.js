import { useState } from 'react'

// C H A N G E   V I S U A L M O D E   H O O K
export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode)
  const [history, setHistory] = useState([initMode])

  // T R A N S I T I T I O N   V I S U A L   M O D E
  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory(prev => {
      const modeHistory = ((replace && [...prev.slice(0, -1)]) || [...prev])
      return [...modeHistory, newMode]
    })
  }
  // G O   B A C K   T O   L A S T   H I S T O R Y   V A L U E
  const back = () => {
    setHistory(prev => {
      // don't reverse past the intial value
      if (prev.length === 1) { return prev }
      // get the current history minus one value
      let modeHistory = [...prev.slice(0, -1)]
      setMode(modeHistory[modeHistory.length - 1]);
      return modeHistory;
    })
  };

  return { mode, transition, back }
}