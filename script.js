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

  // createLine(){
  //   const line = createElem('div')
  //   line.classList.add('line')
  //   line.dataset.line = this.i
  //   this.parentBlock.appendChild(line)
  // }

}

document.addEventListener('click', (e) => {
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
  newBlock.classList.add('block', ('block-'+ totalBlocks))
  newBlock.dataset.block = totalBlocks
  // const newBlockText = createElem('textarea')
  // newBlockText.classList.add('block-textarea')
  // newBlock.appendChild(newBlockText)
  
  block.parentBlock.appendChild(newBlock)

  console.log(blocks)
})

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log(e.target)
  temp = e.target

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