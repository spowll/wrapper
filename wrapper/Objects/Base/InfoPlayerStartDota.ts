import { WrapperClass } from "../../Decorators"
import { Team } from "../../Enums/Team"
import Entity from "./Entity"

@WrapperClass("C_InfoPlayerStartDota")
export default class InfoPlayerStartDota extends Entity {
	public get SpawnerTeam(): Team {
		return this.Name_ === "Spawner_bad" ? Team.Dire : Team.Radiant
	}
}
