import Item from "../Base/Item"

export default class item_ninja_gear extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_Ninja_Gear
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_ninja_gear", item_ninja_gear)