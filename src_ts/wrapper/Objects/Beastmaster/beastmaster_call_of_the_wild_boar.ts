import Ability from "../Base/Ability"

export default class beastmaster_call_of_the_wild_boar extends Ability {
	public readonly m_pBaseEntity!: CDOTA_Ability_Beastmaster_CallOfTheWild_Boar
}

import { RegisterClass } from "wrapper/Objects/NativeToSDK"
RegisterClass("beastmaster_call_of_the_wild_boar", beastmaster_call_of_the_wild_boar)
