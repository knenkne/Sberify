import React, { useRef, useEffect, useState, useCallback } from 'react'
import lottie from 'lottie-web'

import animationData from '../../lottie/play'

const animationOptions = {
  container: null,
  loop: false,
  autoplay: false,
  renderer: 'canvas',
  animationData,
  rendererSettings: {}
}

export default ({ onClick }) => {
  const buttonRef = useRef(null)
  const [animation, setAnimation] = useState(null)

  const handleClick = useCallback(() => {
    onClick()
    animation.play()
    animation.setDirection(-animation.playDirection)
  }, [animation])

  // 3 TIMES UPDATE
  useEffect(() => {
    setAnimation(
      lottie.loadAnimation({
        ...animationOptions,
        container: buttonRef.current
      })
    )
  }, [buttonRef])

  useEffect(() => {
    if (animation) {
      console.log(animation)
      animation.setSubframe(false)
      animation.goToAndStop(7, true)
    }
  }, [animation])

  return <button className="song__play" onClick={handleClick} ref={buttonRef} />
}
