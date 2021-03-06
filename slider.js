const leftArrowButton = document.getElementById('leftArrow')
const rightArrowButton = document.getElementById('rightArrow')
const slideContainer = document.getElementById('slideContainer')
const statusContainer = document.getElementById('statusContainer')
const imageArray = ['fsociety', 'forest', 'windows11', 'japan']

let imageIndex = 0
let canChangeImage = true;

(function makeStatuses () {
  for (const image in imageArray) {
    const status = document.createElement('div')
    status.classList.add('status')
    const statusID = `status_${image}`
    status.setAttribute('id', statusID)
    const statusText = document.createTextNode(1 + parseInt(image))
    status.appendChild(statusText)
    statusContainer.appendChild(status)
  }
})()

const updateStatus = () => {
  const allStatuses = Array.from(statusContainer.children)
  const statusToUpdate = allStatuses[imageIndex]
  for (const status in allStatuses) {
    const currentStatus = allStatuses[status]
    if (currentStatus !== statusToUpdate || currentStatus.classList.contains('darkStatus')) {
      currentStatus.classList.remove('darkStatus')
    } else {
      currentStatus.classList.add('darkStatus')
    }
  }
}
updateStatus()

const removeImage = (direction) => {
  const imageToRemove = slideContainer.lastChild
  if (direction === 'left') {
    imageToRemove.classList.add('leavingRight')
  } else imageToRemove.classList.add('leavingLeft')
  setTimeout(() => {
    slideContainer.removeChild(imageToRemove)
  }, 2100)
}

const loadImage = (direction) => {
  const idx = imageIndex
  const imgName = imageArray[idx]
  const imageDOM = document.createElement('div')

  let imageURL

  switch (imgName) {
    case 'fsociety':
      imageURL = './images/fsociety.jpg'
      break
    case 'forest':
      imageURL = './images/forest.jpeg'
      break
    case 'windows11':
      imageURL = './images/windows11.jpg'
      break
    case 'japan':
      imageURL = './images/samurai.png'
      break
    default:
      alert(`Image at index ${idx} does not exist`)
      break
  }

  imageDOM.style.backgroundImage = `url(${imageURL})`

  if (direction === 'right') {
    imageDOM.classList.add('image', 'enteringRight')
  } else imageDOM.classList.add('image', 'enteringLeft')

  slideContainer.appendChild(imageDOM)
}
loadImage('right')

const moveImageLeft = () => {
  if (canChangeImage) {
    canChangeImage = false
    if ((imageIndex - 1) < 0) {
      imageIndex = imageArray.length - 1
    } else imageIndex--
    removeImage('left')
    loadImage('left')
    updateStatus()
    setTimeout(() => { canChangeImage = true }, 1500)
  }
}

const moveImageRight = () => {
  if (canChangeImage) {
    canChangeImage = false
    if ((imageIndex + 1) > imageArray.length - 1) {
      imageIndex = 0
    } else imageIndex++
    removeImage('right')
    loadImage('right')
    updateStatus()
    setTimeout(() => { canChangeImage = true }, 1500)
  }
}

leftArrowButton.addEventListener('click', () => {
  moveImageLeft()
})

rightArrowButton.addEventListener('click', () => {
  moveImageRight()
});

(function activateStatuses () {
  const statusArray = Array.from(document.getElementById('statusContainer').children)
  for (const status in statusArray) {
    const statusNumber = statusArray.indexOf(statusArray[status])
    statusArray[status].addEventListener('click', () => {
      const checkDifference = () => {
        if (imageIndex < statusNumber) {
          moveImageRight()
          setTimeout(() => { checkDifference() }, 1500)
        } else if (imageIndex > statusNumber) {
          moveImageLeft()
          setTimeout(() => { checkDifference() }, 1500)
        } else console.log('difference now equal')
      }
      checkDifference()
    })
  }
})()
