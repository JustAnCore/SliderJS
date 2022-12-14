/*
- Thanks for using SliderJS
- If my repo was useful, you can star it on my GitHub @JustAnCore
*/

//ELEMENTS
const sliderDiv = document.querySelector('.slider-div')
const imagesDiv = document.querySelector('.images-div')

const arrLeft = document.querySelector('.left')
const arrRight = document.querySelector('.right')

const dotsDiv = document.querySelector('.dots-div')

//SLIDER CANVAS SIZE
const canvasWidth = 540
const canvasHeight = 360

//-----SETTINGS-----

let useOverflowHidden = false //Hide images if it's outside the slider container

let useAutoSlide = true //Automatic slide switching
let autoSlideDelay = 4 //Delay between switching slides in seconds (Don't works if useAutoSlide = false)
let autoSlideSide = 'right' //'left' or 'right'

let showDots = true //Show dots under the slider

let slideAnimationDuration = 1 //Slide animation duration

//------------------

//ARRAY OF IMAGES | the aspect ratio must match the canvas size
let images = 
['images/slide1.jpg', 'images/slide2.jpg', 'images/slide3.jpg', 'images/slide4.jpg']

//DO NOT CHANGE
let offset = 0
let clicked = false

drawDots()

syncWithSize()
displayImages()
applyCSS()

autoSlide()

sliderDiv.style.width = canvasWidth
sliderDiv.style.height = canvasHeight

arrLeft.onclick = function(){//Click on the left button
    move('left')
    clicked = true
}

arrRight.onclick = function(){//Click on the right button
    move('right')
    clicked = true
}

function displayImages(){//DISPLAY ALL IMAGES FROM images ARRAY
    for(let i = 0; i < images.length; i++){
        let _img = document.createElement('img')
        _img.src = images[i]

        _img.style.width = canvasWidth
        _img.style.height = canvasHeight
        
        imagesDiv.appendChild(_img)
    }
}

function drawDots(){
    if(showDots){
        let dotsDivWidth = 0

        for(let i = 0; i < images.length; i++){
            let _dot = document.createElement('div')
            _dot.classList = 'dot'
            _dot.id = 'dot' + (i + 1)
            dotsDiv.appendChild(_dot)
            dotsDivWidth += 16 + 3;
        }

        //dotsDiv.style.marginLeft = ((canvasWidth/2) - dotsDivWidth/2) + 'px'
    }
}

function changeCurrentDot(){
    if(showDots){
        for(let i = 0; i < images.length; i++){
            document.getElementById('dot' + (i+1)).innerHTML = ''
        }
    
        const _dot = document.getElementById('dot' + (-(offset/canvasWidth)+1))
        let _currDot = document.createElement('div')
        _currDot.classList = 'dot-current'
        _dot.appendChild(_currDot)
    }
}

function syncWithSize(){
    const arrows = document.querySelectorAll('.arrow-div')
    arrows.forEach((arr) => {arr.style.height = canvasHeight})
    const right = document.querySelector('.right')
    right.style.left = canvasWidth - canvasWidth / 100 * 25

    document.querySelectorAll('.arrow-img')[0].style.paddingTop = (canvasHeight/2 - 25) + 'px'
    document.querySelectorAll('.arrow-img')[1].style.paddingTop = (canvasHeight/2 - 25) + 'px'
}

function applyCSS(){
    if(useOverflowHidden){
        sliderDiv.style.overflow = 'hidden'
    }else{
        sliderDiv.style.overflow = 'visible'
    }

    imagesDiv.style.transitionDuration = slideAnimationDuration + 's'
}
 
async function autoSlide(){
    if(useAutoSlide){
        if(!clicked){
            move(autoSlideSide)
            await delay(autoSlideDelay)
            autoSlide()
        }else{
            clicked = false;
            await delay(autoSlideDelay)
            autoSlide()
        }
    }
}

function move(_dir){
    if(_dir === 'left'){
        if(offset === 0){
            offset = -(images.length*canvasWidth - canvasWidth)
            imagesDiv.style.left = offset
        }
        else{
            imagesDiv.style.left = offset + canvasWidth
            offset += canvasWidth
        }
    }
    else if(_dir === 'right'){
        if(offset + -canvasWidth - canvasWidth < -images.length*canvasWidth){
            offset = 0
            imagesDiv.style.left = offset
        }
        else{
            imagesDiv.style.left = offset + -canvasWidth
            offset += -canvasWidth
        }
    }

    changeCurrentDot()

    //console.log(offset + ' | ' + _dir)
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time * 1000))
}