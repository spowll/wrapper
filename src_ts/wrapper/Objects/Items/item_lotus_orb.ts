import Item from "../Base/Item"

export default class item_lotus_orb extends Item {
	public readonly m_pBaseEntity!: CDOTA_Item_Lotus_Orb
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_lotus_orb", item_lotus_orb)
