import ManagerBase from "../../abstract/Base"
import { Color, Game, RendererSDK, Vector2, Unit, Entity, Roshan, ArrayExtensions, Menu } from "wrapper/Imports"
import { 
	BaseTree, 
	drawStatus, 
	IsAlive, 
	NotificationRoshanStateChat, 
	State, 
	statusPosX, 
	statusPosY, 
	drawStatusSize,

	IconSettingsState,
	IconSettingsColorDied,
	IconSettingsColorAlive,
	IconSettingsSwitch,
	NotificationRoshanStateSound,
	
	AegisStatusPosX,
	AegisStatusPosY,
	AegisSettingsState,
	AegisdrawStatusSize,
	AegisSettingsStateIcon,
	
} from "./Menu"



var Timer: number = 0,
	Units: Unit[] = [],
	checkTick: number = 0,
	roshanKillTime: number = 0,
	aegisPickUpTime: number = 0, // TODO for fireEvents
	checkTickMessage: number = 0,
	RoshanAttack: boolean = false,
	AegisTime: number = 0,
	Base: ManagerBase = new ManagerBase,
	TimersOne: string,
	TimersTwo: string,
	AegisTextTime: string

export function ParticleCreate(Handle: BigInt) {
	if (Handle === 7431777948785381669n) {
		if (NotificationRoshanStateChat.value && Game.GameTime > 0) {
			Game.ExecuteCommand("say_team check please roshan maybe respawn")
			Timer = 0
		}
		IsAlive.OnValue(x => x.value = true)
	}
	if (Handle === 13891217767486593796n) {
		if (NotificationRoshanStateChat.value) {
			if (Timer < Game.GameTime) {
				Game.ExecuteCommand("say_team please check roshan")
				Timer += (Game.GameTime + 10)
			}
		}
	}
	if (Handle === 14219564939631888289n) {
		if (NotificationRoshanStateChat.value) {
			Game.ExecuteCommand("chatwheel_say 53; chatwheel_say 57;") // > Roshan and time
			Timer = 0
			roshanKillTime = 480
			AegisTime = 300 // transfer on fire events (Game events)
		}
		IsAlive.OnValue(x => x.value = false)
	}
}

function RenderIcon(position_unit: Vector2, path_icon: string, Size: Menu.Slider, color?: Color) {
	RendererSDK.Image(path_icon,
		position_unit.SubtractScalar(20 / 4).Clone().AddScalarY(4).AddScalarX(-Size.value - 5),
		new Vector2(Size.value * 1.2, Size.value * 1.2), Units.some(x => x.Name === "npc_dota_roshan") 
		? new Color(252, 173, 3) 
		: !color 
			? new Color(255, 255, 255)
			: color,
	)
}

function RoshanDrawAliveDied(Text: string, color?: Color) {
	let VectorSize = RendererSDK.WindowSize.DivideScalar(100).MultiplyScalarX(statusPosX.value).MultiplyScalarY(statusPosY.value)
	if (IconSettingsState.value) {
		switch (IconSettingsSwitch.selected_id) {
			case 0:
				RenderIcon(VectorSize, "panorama/images/hud/icon_roshan_psd.vtex_c", drawStatusSize, color)
				break;
			case 1:
				RenderIcon(VectorSize, "panorama/images/hud/reborn/roshan_timer_roshan_psd.vtex_c", drawStatusSize, color)
				break;
		}
	}
	let is_under = Units.some(x => x.Name.includes("roshan"))
		? "Roshan is under attack"
		: Text
	RendererSDK.Text(`${BaseTree.name}: ` + is_under, VectorSize, new Color(255, 255, 255, 255), "Calibri", drawStatusSize.value, FontFlags_t.ANTIALIAS)
}

export function Tick() {
	if (Units.length <= 0 || !State.value) {
		return false
	}
	let Time = Game.RawGameTime
	setTimeout(DeleteUnits, 250)
	if (Units.some(x => x.Name !== "npc_dota_roshan")) {
		return false
	}
	console.log(1)
	if (Time >= checkTick) {
		Game.ExecuteCommand("playvol sounds\\ui\\ping_attack " + NotificationRoshanStateSound.value / 100)
		checkTick = Time + 4
	}
	if (!NotificationRoshanStateChat.value) {
		return false
	}
	if (Time >= checkTickMessage) {
		Game.ExecuteCommand("say_team Please, check roshan...")
		checkTickMessage = Time + 10
	}
}

export function Draw() {
	if (!State.value || !drawStatus.value || !Game.IsInGame)
		return false
	if (!IsAlive.value) {
		let time = Game.RawGameTime
		if (time >= checkTick) {
			let RoshTimeOne = --roshanKillTime,
				RoshTimeTwo = RoshTimeOne + 180
			if (Math.sign(RoshTimeOne) !== -1) {
				TimersOne = Base.TimeSecondToMin(RoshTimeOne)
			}
			if (Math.sign(RoshTimeTwo) !== -1) {
				TimersTwo = Base.TimeSecondToMin(RoshTimeTwo)
			}
			if (AegisSettingsState.value) {
				let Time = --AegisTime
				if (Math.sign(Time) !== -1) {
					AegisTextTime = Base.TimeSecondToMin(Time)
				}
			}
			checkTick = time + 1
		}
		if (TimersOne !== undefined && TimersTwo !== undefined) {
			let VectorSize = RendererSDK.WindowSize.DivideScalar(100).MultiplyScalarX(statusPosX.value).MultiplyScalarY(statusPosY.value).Clone().AddScalarX(+drawStatusSize.value * 4.7)
			RendererSDK.Text(TimersOne + ", " + TimersTwo, VectorSize, new Color(255, 255, 255, 255), "Calibri", drawStatusSize.value, FontFlags_t.ANTIALIAS)
		}
		if (AegisSettingsState.value && AegisTextTime !== undefined && AegisTime > 0) {
			let VectorSizeAegis = RendererSDK.WindowSize.DivideScalar(100).MultiplyScalarX(AegisStatusPosX.value).MultiplyScalarY(AegisStatusPosY.value).Clone().AddScalarX(+AegisdrawStatusSize.value * 4.7)
			RendererSDK.Text("Aegis end: " + AegisTextTime, VectorSizeAegis, new Color(255, 255, 255, 255), "Calibri", AegisdrawStatusSize.value, FontFlags_t.ANTIALIAS)
			if (AegisSettingsStateIcon.value) {
				RenderIcon(VectorSizeAegis, "panorama/images/onstage_pods/aegis_png.vtex_c", AegisdrawStatusSize)
			}
		}
	}
	if (Units.length > 0) {
		Units.filter(x => {
			if (!x.Name.includes("roshan") && x.Distance2D(Base.RoshanPosition) <= 900) {
				RendererSDK.DrawMiniMapIcon("minimap_danger", Base.RoshanPosition, 900)
				RendererSDK.DrawMiniMapIcon(`minimap_heroicon_${x.Name}`, Base.RoshanPosition, 900)
			}
		})
	}
	IsAlive.value
		? RoshanDrawAliveDied("Alive", IconSettingsColorAlive.Color)
		: RoshanDrawAliveDied("Died", IconSettingsColorDied.Color)
}

export function UnitAnimationCreate(unit: Unit) {
	if (!unit.IsValid || unit.IsVisible || !State.value)
		return
	Units.push(unit)
}
function DeleteUnits() {
	Units = []
}
export function GameEnded() {
	DeleteUnits()
	checkTick = 0
	TimersOne = undefined
	TimersTwo = undefined
	aegisPickUpTime = 0
	checkTickMessage = 0
	RoshanAttack = false
}