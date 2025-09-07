import { Player } from './player/player.js'

console.log(`hello world`)

console.log(`bye world`)

let player1 = new Player("lucas")

console.log(`bye ${player1.point.x} world`)
console.log(`bye ${player1.name} world`)

player1.shout("who")