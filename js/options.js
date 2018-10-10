const defaultColor = '#212127'
const defaultEmoji = '🐈'

const getCustomSettings = () => {
  let colorElement = document.getElementById('color-picker')
  let emojiElement = document.getElementById('emoji-input')

  chrome.storage.local.get(['color', 'emoji'], function(data) {
    colorElement.value = data.color || defaultColor
    emojiElement.value = data.emoji || defaultEmoji
  })

  let saveButton = document.createElement('button')
  saveButton.innerHTML = 'Save'
  saveButton.addEventListener('click', function() {
    chrome.storage.local.set({ color: colorElement.value, emoji: emojiElement.value }, function() {
      console.log('color is ' + colorElement.value + ', and emoji is ' + emojiElement.value)
    })
  })
  let resetButton = document.createElement('button')
  resetButton.innerHTML = 'Reset'
  resetButton.addEventListener('click', reset)
  let resetCountButton = document.createElement('button')
  resetCountButton.innerHTML = 'Reset count to 0'
  resetCountButton.addEventListener('click', resetCount)

  const buttonDiv = document.getElementById('button-div')

  buttonDiv.appendChild(saveButton)
  buttonDiv.appendChild(resetButton)
  buttonDiv.appendChild(resetCountButton)
}

const reset = () => {
  chrome.storage.local.set({ color: defaultColor, emoji: defaultEmoji }, function() {
    let colorElement = document.getElementById('color-picker')
    let emojiElement = document.getElementById('emoji-input')
    colorElement.value = defaultColor
    emojiElement.value = defaultEmoji
  })
  feedback('Reset to default values!')
}
const resetCount = () => {
  chrome.storage.local.set({ opens: 0 }, function() {
    console.log('Count reset to 0!')
  })
  feedback('Count reset to 0!')
}

const feedback = msg => {
  const feedbackDiv = document.getElementById('feedback-div')
  feedbackDiv.innerHTML = msg
}

getCustomSettings()
