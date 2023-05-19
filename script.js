const getId = (elem) => document.getElementById(elem)
const getSel = (elem) => document.querySelector(elem)
const getSelAll = (elem) => document.querySelectorAll(elem)  
const createElem = (elem) => document.createElement(elem)


let totalBlocks = 0
// const blocks = []
const blocks = {}


const item = getSel(".block")
const contextElement = getId('context-menu');
const scope = getSel("body")

class Block {
  constructor(i, parent){
    this.x = 0
    this.y = 0
    this.i = i
    this.parentBlock = document.querySelector(".block-"+ parent)
  }

  addLine(){

  }

  interactBlock(){
    console.log(this.i)
    const that = this
    interact('.block-'+ that.i)
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move (event) {
            var target = event.target
            var x = (parseFloat(that.x) || 0)
            var y = (parseFloat(that.y) || 0)

            // update the element's style
            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left
            y += event.deltaRect.top

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            // target.setAttribute('data-x', x)
            // target.setAttribute('data-y', y)
            that.x = x
            that.y = y
            // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
          }
        },
        // snapEdges: {
        //   targets: [interact.snappers.grid({ x: 100, y: 50 })],
        // },
        // modifiers: [
        //   // keep the edges inside the parent
        //   interact.modifiers.restrictEdges({
        //     outer: 'parent'
        //   }),

        //   // minimum size
        //   interact.modifiers.restrictSize({
        //     min: { width: 100, height: 50 }
        //   })
        // ],

        inertia: true
      })
      .draggable({
        listeners: {
          start (event) {
            console.log(event.type, event.target)
          },
          move (event) {
            that.x += event.dx
            that.y += event.dy
    
            event.target.style.transform =
              `translate(${that.x}px, ${that.y}px)`
          },
        },
        // modifiers: [
        //   interact.modifiers.restrictRect({
        //     restriction: 'parent',
        //     // endOnly: true
        //   })
        // ]
      })
      // .draggable({
      //   listeners: { move: window.dragMoveListener },
      //   // inertia: true,
      //   // modifiers: [
      //   //   interact.modifiers.restrictRect({
      //   //     restriction: 'parent',
      //   //     endOnly: true
      //   //   })
      //   // ]
      // })
  }

  interactBlock2(){
    console.log(this.i)
    const that = this
    interact('.block-'+ that.i)
    .draggable({
      listeners: {
        start (event) {
          console.log(event.type, event.target)
        },
        move (event) {
          that.x += event.dx
          that.y += event.dy
  
          event.target.style.transform =
            `translate(${that.x}px, ${that.y}px)`
        },
      }
    })
  }

  // createLine(){
  //   const line = createElem('div')
  //   line.classList.add('line')
  //   line.dataset.line = this.i
  //   this.parentBlock.appendChild(line)
  // }

}

// getSel(".block").addEventListener("mouseover", (e) => {
//   console.log(e.target.style.cursor)

// })

// var that = {x:0,y:0}
// interact('.logo').draggable({
//   listeners: {
//     start (event) {
//       console.log(event.type, event.target)
//     },
//     move (event) {
//       that.x += event.dx
//       that.y += event.dy

//       event.target.style.transform =
//         `translate(${that.x}px, ${that.y}px)`
//     },
//   }
// })

document.addEventListener('click', (e) => {
  console.log(getComputedStyle(e.target).cursor)
  if(getComputedStyle(e.target).cursor === 'text') {
    console.log("resize")
  }
  if(e.target !== contextElement) {
    contextElement.classList.remove('visible');
  }
  if(e.target.classList.contains('block')) {
    // e.target.innerHTML = '<textarea class="block-textarea"></textarea>'
  }
})

let temp = ""

contextElement.addEventListener('click', (e) => {
  totalBlocks++
  console.log(e.target)
  const parentElem = temp.dataset.block
  console.log(parentElem)

  const block = new Block(totalBlocks, parentElem)
  block.interactBlock()
  // block.createLine()
  blocks[totalBlocks] = block

  const newBlock = createElem('div')
  newBlock.classList.add('block', ('block-' + totalBlocks))
  newBlock.dataset.block = totalBlocks
  const newBlockText = createElem('textarea')
  newBlockText.classList.add('block-textarea', 'block-textarea-' + totalBlocks)
  // newBlockText.setAttribute("src", "./stirner.jpg")
  newBlock.appendChild(newBlockText)
  
  block.parentBlock.appendChild(newBlock)

  console.log(blocks)
})

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log(e.target)
  temp = e.target.parentNode
  console.log(temp)

  //do something differant context menu
  const { clientX, clientY } = e;

  contextElement.style.top = `${clientY}px`;
  contextElement.style.left = `${clientX}px`;

  contextElement.classList.add('visible');
  //if context is over block
})



function dragAndDrop() {
  getSelAll(".block").forEach((item, i) => {
    const block = new Block(totalBlocks)
    block.interactBlock()
    // block.createLine()
    blocks[i] = block
    getSel(".block-"+ i).dataset.block = i
    totalBlocks = i

  })
}

dragAndDrop()


// anime({
//   targets: '.block span',
//   translateX: 250
// });

// anime({
//   targets: '.block span',
//   width: '100%', // -> from '28px' to '100%',
//   easing: 'easeInOutQuad',
//   direction: 'alternate',
//   loop: false
// });

// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');

// ctx.beginPath();
// ctx.moveTo(1, 5);
// ctx.lineTo(300, 150);
// ctx.stroke();
// ctx.closePath();