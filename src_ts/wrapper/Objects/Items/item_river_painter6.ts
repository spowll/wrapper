import Item from "../Base/Item"

export default class item_river_painter6 extends Item {
	public NativeEntity: Nullable<CDOTA_Item_RiverPainter6>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_river_painter6", item_river_painter6)
