const FLAG = "图腾计数_cnt"
if(event.type == "EntityStatusS2CPacket"){
    bytebuf = event.getPacketBuffer();
    entityId = bytebuf.readInt()
    
    try{
        entity = WorldHelper.getEntityByIdUnsafe(entityId)
         if(entity != null){
            stateByte = bytebuf.readByte()
            if(stateByte == 35){
                entityHelper = JavaUtils.getHelperFromRaw(entity)
                if(entityHelper.getType() == "minecraft:player"){
                    Chat.log(entityHelper.getPlayerName() + " pop a totem")
                }
            }
            
            
        }
    }catch(e){
    }
   
    if(Player.getPlayer() != null){
        if(EntityHelper.getEntityId(Player.getPlayer().getRaw()) == entityId){
            stateByte = bytebuf.readByte()
            if(stateByte == 35){
                GlobalVars.incrementAndGetInt(FLAG)
            }
        }
    }
}