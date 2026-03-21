const FLAG = "自动喂食_1"

const { runSingleRepeat } = require('../libs/Mylib.js');

function main(){
    ls = World.getEntities(5, "minecraft:allay")
    Chat.log(ls.size())
    for(var idx in ls){
        entity = ls.get(idx)
        Player.interactions().interactEntity(entity, false, true)
        Client .waitTick(1)
    }
    Client.waitTick(10)
    return true
}

runSingleRepeat(main, FLAG)