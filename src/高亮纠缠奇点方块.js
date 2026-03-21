const KEY = "draw3d_marker_844_85_815";
const map_slot = {
  0: 36,
  1: 37,
  2: 38,
  3: 39,
  4: 40,
  5: 41,
  6: 42,
  7: 43,
  8: 44
};


main();

function main() {
  const existing = GlobalVars.getObject(KEY);
  
  if (existing) {
    try { existing.unregister(); } catch (e) { }
    GlobalVars.remove(KEY);
  }
  try {

    let slot = Player.openInventory().getSelectedHotbarSlotIndex();
    let targetSlot = map_slot[slot];
    
    let pos =  getPos(Player.openInventory().getSlot(targetSlot)) 
    Chat.log(pos)
    if (!pos) {
      try { existing.unregister(); } catch (e) { }
      return;
    }

    const draw = Hud.createDraw3D();

    draw.boxBuilder()
      .forBlock(pos.x, pos.y, pos.z)
      .color(0, 255, 255, 255)       // 边框 RGBA (青色，不透明)
      .fillColor(0, 255, 255, 30)    // 填充 RGBA (青色，透明度≈31%)
      .fill(true)
      .cull(false)
      .buildAndAdd();

    draw.addTraceLine(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 255)
    Chat.log("point1")
    draw.register();
    GlobalVars.putObject(KEY, draw);
    World.spawnParticle("minecraft:happy_villager", pos.x + 0.5, pos.y + 1.1, pos.z + 0.5, 0.25, 0.35, 0.25, 0.02, 24, true);
    Player.openInventory().close();
    // Player.getPlayer().lookAt(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
  } catch (e) {
  Chat.log(e)
   }
}

// 根据纠缠坐标获取坐标
function getPos(item) {

  const lore = item.getLore();
  if (!lore || lore.length === 0) return null;

  for (let line of lore) {
    const text = line.getString();
    const match = text.match(/x=(-?\d+),y=(-?\d+),z=(-?\d+)/);
    if (match) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      const z = parseInt(match[3]);
      return { x, y, z };
    }
  }
  return null;
}

