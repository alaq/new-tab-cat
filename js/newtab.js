chrome.storage.local.get(['opens', 'lastOpen', 'color', 'emoji'], function(data) {
  document.body.style['background-color'] = data.color || '#212127'
  document.getElementsByClassName('cat')[0].innerHTML = data.emoji || '🐈'
  if (!Number.isInteger(data.opens) || data.lastOpen !== new Date().getDay()) {
    updateOpens(0)
  } else {
    updateOpens(data.opens + 1)
  }
})

const updateOpens = newTotal => {
  const newSize = 20 + newTotal * 2
  document.body.style['font-size'] = Math.min(newSize, 324) + 'px'
  document.getElementsByClassName('cat')[0].title = newTotal + ' new tabs today'
  chrome.storage.local.set({ opens: newTotal, lastOpen: new Date().getDay() }, function() {
    console.log('opens is set to ' + newTotal)
  })
}
