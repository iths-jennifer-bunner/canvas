//Interacting with The Canvas | HTML5 Canvas Tutorial for Beginners - Ep. 4
//Chris courses youtube
let canvas = document.querySelector('canvas')

canvas.width =window.innerWidth     //bli en hel skärm
canvas.height = window.innerHeight

let c = canvas.getContext('2d')

// c.fillStyle = 'rgba(255,0,0,0.5)' //för att fylla alla boxarna m färg, annars läses fillstylen ovan av först
// c.fillRect(100, 100, 100, 100)  // c.fillRect(x, y, width, height)
// c.fillStyle = 'rgba(0,0,255,0.5)'
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0,255,0,0.5)'
// c.fillRect(300, 300, 100, 100)

//   Line
// c.beginPath()


// c.moveTo(50,300)    // c.moveTo(x,y) i pixlar
// c.lineTo(300,100)
// c.lineTo(400,300)
// c.strokeStyle = 'hotpink'   //ändra färg på streck
// c.stroke()  //to make the stroke

// c.moveTo(300,100)
// c.lineTo(500,200)
// c.strokeStyle = 'blue'
// c.stroke()

// Arc/ Circle
// c.beginPath()
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke()
// let color = ['red','blue','yellow','black', 'gray', 'green', 'orange']
// let strokeStyle = color[Math.floor(Math.random()*color.length)]
// c.strokeStyle= strokeStyle

// c.strokeStyle='rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+','+Math.random()+')';


// for( let i = 0; i < 1000; i++){  //för att göra flera cirklar mha loopar
//     let x = Math.random() * window.innerWidth
//     let y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = c.strokeStyle='rgba('+Math.random()*256+','+Math.random()*256+','+Math.random()*256+','+Math.random()+')';
//     c.stroke()
// }
// let x = Math.random() * innerWidth
// let y = Math.random() * innerHeight
// let dx = (Math.random() - 0.5) * 8//  är velocity (farten)
// let dy = (Math.random() - 0.5) * 8
// let radius = 30

let mouse = {
    x: undefined,
    y: undefined
}
let maxRadius = 40
// let minRadius = 2

window.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener('resize', function(){
    canvas.width =window.innerWidth    
    canvas.height = window.innerHeight
    init()
})
let colorArray = [
    '#FEDA84',
    '#FF9B83',
    '#976393',
    '#685489',
    '#43457F',
]

function Circle(x, y, dx, dy, radius){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    // this.rgb_colors = 'rgba('+ Math.random()* 255 +','+ Math.random()* 255 + ','+ Math.random()* 255 + ',' + Math.random()+')'
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)]

    this.draw = function(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.strokeStyle = this.rgb_colors
        c.strokeStyle = 'white'
        // c.fillStyle = this.rgb_colors
        c.fillStyle = this.color
        c.stroke()
        c.fill()
    }
    this.update = function() {
        if( this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        }
        if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        }
        this.x += this.dx 
        this.y += this.dy

        //interactivity w 
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y -this.y > -50){
        if( this.radius < maxRadius ){
            this.radius += 1
        }
        }else if( this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
}


let circleArray = []

function init(){
    circleArray = []
    for( let i = 0; i < 800; i++){
    let radius = Math.random() *3+1
    let x = Math.random() * (innerWidth - radius*2)+radius
    let y = Math.random() * (innerHeight - radius*2)+radius
    let dx = (Math.random() - 0.5) //  är velocity (farten) kan ta gånger 2
    let dy = (Math.random() - 0.5)
    circleArray.push(new Circle(x, y, dx, dy, radius))

}
}

// circle.draw()

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)  //rensar skärmen varje gång en cirkel skapas
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update()
    }
    
}
animate()

init()