import { useEffect, useRef } from 'react'

export default function useOutSideClick(close, listenCapturing = true) {
  const ref = useRef()
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close()
      }
    }
    document.addEventListener('click', handleClick, listenCapturing)

    return document.addEventListener('click', handleClick, listenCapturing)
  }, [close, listenCapturing])
  return ref
}
