class AudioController {
    sounds = {}
    counter = {}
    maxCount = 5
  
    addSound({
      key,
      src,
      speed = 1,
      loop = false,
      startTime = 0,
      volume = 0.5,
    }) {
      this.sounds[key] = new Audio(src)
      this.counter[key] = 0
      this.sounds[key].playbackRate = speed
      this.sounds[key].volume = volume
      this.sounds[key].loop = loop
      this.sounds[key].currentTime = startTime
      this.sounds[key].initialTime = startTime
    }
  
    playSound(key) {
      let sound = this.sounds[key]
      if(sound.loop && !sound.paused) 
        return
      
      sound.currentTime = sound.initialTime
      if(this.counter[key] < this.maxCount && !sound.loop) {
        sound = this.sounds[key].cloneNode()
        sound.addEventListener('ended', () => {
          this.counter[key]--
        })
        this.counter[key]++
      }
      sound.play()
    }
  
    endSound(key) {
      const sound = this.sounds[key]
      if(sound.loop) {
        sound.pause()
        sound.currentTime = 0
      }
    }
  }
  
  module.exports = AudioController