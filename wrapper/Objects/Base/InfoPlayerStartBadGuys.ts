import { WrapperClass } from "../../Decorators"
import { Team } from "../../Enums/Team"
import InfoPlayerStartDota from "./InfoPlayerStartDota"

@WrapperClass("CInfoPlayerStartBadGuys")
export default class InfoPlayerStartBadGuys extends InfoPlayerStartDota {
	public get SpawnerTeam(): Team {
		return Team.Dire
	}
}
