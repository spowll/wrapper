import Item from "../Base/Item"

export default class item_point_booster extends Item {
	public NativeEntity: Nullable<C_DOTA_Item_PointBooster>
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_point_booster", item_point_booster)
