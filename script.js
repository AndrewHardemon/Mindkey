const getId = (elem) => document.getElementById(elem)
const getSel = (elem) => document.querySelector(elem)
const getSelAll = (elem) => document.querySelectorAll(elem)  
const createElem = (elem) => document.createElement(elem)


let totalBlocks = 0
const blocks = []


const item = getSel(".block")
const contextElement = getId('context-menu');
const scope = getSel("body")

class Block {
  constructor(i){
    this.x = 0
    this.y = 0
    this.i = i
  }

  interactBlock(){
    console.log(this.i)
    const that = this
    interact('.block-'+ that.i).draggable({
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

}

document.addEventListener('click', (e) => {
  if(e.target !== contextElement) {
    contextElement.classList.remove('visible');
  }
})

contextElement.addEventListener('click', (e) => {
  totalBlocks++
  
  const newBlock = createElem('div')
  newBlock.classList.add('block', ('block-'+ totalBlocks))
  document.body.appendChild(newBlock)
  
  blocks.push(new Block(totalBlocks).interactBlock())
})

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  //do something differant context menu
  const { clientX, clientY } = e;

  contextElement.style.top = `${clientY}px`;
  contextElement.style.left = `${clientX}px`;

  contextElement.classList.add('visible');
  //if context is over block
})



function dragAndDrop() {
  getSelAll(".block").forEach((item, i) => {
    blocks.push(new Block(i).interactBlock())
    totalBlocks = i
  })
}

dragAndDrop()