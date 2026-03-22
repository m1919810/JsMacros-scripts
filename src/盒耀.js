const { getIdSlot, getAndMoveMulti, checkTitle } = require('./Mylib.js');


const COMMON_TITLE = "合成"
const STOP_TITLE = "合成"
const NULL_TITLE = ""
const INTERACT_TITLE="网格"
Chat.log("byd");
const MAX_COUNT = 384
const ROWS = 6
const PASSWORD = "114514"



function main(blockpos) {
    while (true) {
        Chat.log("point1")


        

        var endflag = false
        var slot_2 = getIdSlot("minecraft:ender_pearl")
        if (slot_2 == -1) {
            Chat.log("run with out ender pearl")
            endflag = true
        }
        while (true) {
            try {
                if ((World.getEntities(0.5, ["minecraft:player"]))[0].getY() < 0) {
                    Chat.log("wait till respawn")
                    Client.waitTick(1)
                } else {
                    break;
                }
            } catch (e) {
                Client.waitTick(1)
            }
        }
        Client.waitTick(1)
        //Chat.log(Player.openInventory().getSlot(44).getCount())
        Chat.log("interact 1")
        Player.interactions().interactEntity(blockpos, false)

        while (true) {
            try {
                if ((World.getEntities(0.5, ["minecraft:player"]))[0].getY() > 0) {
                    Chat.log("wait till tp")
                    Player.interactions().interactEntity(blockpos, false)
                    Client.waitTick(3)
                } else {
                    break;
                }
            } catch (e) {
                Client.waitTick(1)
            }
        }
        
        Chat.log("interact 2")
        Player.interactions().interact()
        do {
            Client.waitTick(1)
        } while ((INTERACT_TITLE != Player.openInventory().getContainerTitle()))
        for(var i=0;i<50;++i) {
            Client.waitTick(1)

            try {
                var slot = getIdSlot("minecraft:glowstone_dust", 54, 100)
                if (slot != -1) {
                    Player.openInventory().quick(slot)
                    Client.waitTick(5)
                    if (getIdSlot("minecraft:glowstone_dust", 54, 100)==-1)
                        break;
                    else 
                        continue
                } else {
                    continue;
                }
            }
            catch (e) {
                Chat.log("error1")
                break;
            }
        }
      

        // var slot = getIdSlot("minecraft:glowstone_dust", 54,114)
        // if(slot!=-1){
        //     Player.openInventory().quick(slot)
        // }
        Client.waitTick(1)

        var slot = getIdSlot("minecraft:chest",  54,114)
        Chat.log(slot)
        if(slot==-1){
            var slot = getIdSlot("minecraft:chest", 0, 54)
            Chat.log(slot)
            if (slot != -1) {
                Player.openInventory().click(slot, 0)
                Client.waitTick(5)
                Player.openInventory().click(82,0)
            } 
        }
        Client.waitTick(5)
        Player.openInventory().close()
       
        
    
        if (endflag) return -2


        Client.waitTick(2)
        Chat.log("one loop finish")
    }


}
function mainloop(b1, b2, b3) {
    var vart
    while ((vart = main(b1)) == -2) {
        Chat.log("main end with" + vart.toString())
        Client.waitTick(20)
        Player.openInventory().setSelectedHotbarSlotIndex(0)
        Client.waitTick(20)
        // Player.openInventory().close()
        // Player.interactions().interactBlock(b2.getX(), b2.getY(), b2.getZ(), "up", false)
        // Client.waitTick(5)
        // Chat.log(Player.openInventory().getContainerTitle())
        // if (checkTitle("普通的存储单元")) {
        //     for (let i = 0; i < 9; ++i) {
        //         var slot = getIdSlot("SF_MOMOTECH_QUANTUM", 0, 54);
        //         if (slot == -1) return -1
        //         Player.openInventory().quick(slot)
        //         Client.waitTick(1)
        //     }
        // }
        // else return -3
        Player.openInventory().close()
        Client.waitTick(20)
        if (Player.getCurrentPlayerInput().sneaking == true) {
            break;
        }
        Player.interactions().interactBlock(b3.getX(), b3.getY(), b3.getZ(), "up", false)
        Client.waitTick(5)
        if (checkTitle("普通的存储单元")) {
            for (let i = 0; i < 6; ++i) {
                var slot = getIdSlot("minecraft:ender_pearl", 0, 54);
                if (slot == -1) return -1
                getAndMoveMulti(slot,82+i,16)

                //Player.openInventory().quick(slot)
                Client.waitTick(1)
            }
        }
        else return -5
        Player.openInventory().close()
        Client.waitTick(20)
        if (Player.getCurrentPlayerInput().sneaking == true) {
            break;
        }

    } return 1
}
Chat.log("scan Entity:")
Client.waitTick(20)
var blockt = Player.interactions().getTargetedEntity()
Chat.log("get one" + blockt.getType());
Chat.log("scan Block:")
Client.waitTick(20)
var blockv = Player.interactions().getTargetedBlock()
blockv1 = blockv.east()
blockv2 = blockv.west()
var a = mainloop(blockt, blockv2, blockv1);
Chat.log("终止辣牢底 返回值" + a.toString());