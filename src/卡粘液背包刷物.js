packetClass1 = PacketHelper.getPacketType("player_action",false)
drop = ReflectHelper.getEnumParameter(packetClass1, 0, "DROP_ITEM");
direction = ReflectHelper.getEnumParameter(packetClass1, 2, "DOWN");
packet1 = new packetClass1(drop, new (Consts.BlockPos)(0, 0, 0), direction)

packetClass2 = PacketHelper.getPacketType("use_item", false)
hand = ReflectHelper.getEnumParameter(packetClass2, 0, "MAIN_HAND")
packet2 = new packetClass2(hand, 0, Player.getPlayer().getYaw(), Player.getPlayer().getPitch())
PacketHelper.sendPacket(packet2)
PacketHelper.sendPacket(packet1)