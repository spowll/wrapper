import Item from "../Base/Item"

export default class item_vitality_booster extends Item {
	public readonly m_pBaseEntity!: C_DOTA_Item_VitalityBooster
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("item_vitality_booster", item_vitality_booster)
