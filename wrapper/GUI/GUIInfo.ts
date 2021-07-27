import Vector2 from "../Base/Vector2"
import { DOTA_GameState } from "../Enums/DOTA_GameState"
import EventsSDK from "../Managers/EventsSDK"
import InputManager from "../Managers/InputManager"
import RendererSDK from "../Native/RendererSDK"
import { GameRules } from "../Objects/Base/Entity"
import CLowerHUD from "./CLowerHUD"
import CMinimap from "./CMinimap"
import COpenShop from "./COpenShop"
import CPreGame from "./CPreGame"
import CScoreboard from "./CScoreboard"
import CShop from "./CShop"
import CTopBar from "./CTopBar"

const latest_screen_size = new Vector2()
const GUIInfo = new (class CGUIInfo {
	public debug_draw = false
	public Minimap = undefined as any as CMinimap
	public Shop = undefined as any as CShop
	public OpenShopMini = undefined as any as COpenShop
	public OpenShopLarge = undefined as any as COpenShop
	public TopBar = undefined as any as CTopBar
	public PreGame = undefined as any as CPreGame
	public LowerHUD = [] as CLowerHUD[]
	public Scoreboard = undefined as any as CScoreboard
	public HUDFlipped = false

	// Looks like it's hardcoded
	// Do not change it unless anything breaks.
	private readonly proportional_base = 1080

	public OnDraw(): void {
		const screen_size = RendererSDK.WindowSize,
			hud_flipped = ConVars.GetInt("dota_hud_flip") !== 0
		const everything_changed = (
			this.HUDFlipped !== hud_flipped
			|| !latest_screen_size.Equals(screen_size)
		)
		latest_screen_size.CopyFrom(screen_size)
		this.HUDFlipped = hud_flipped
		if (everything_changed || this.TopBar === undefined || this.TopBar.HasChanged())
			this.TopBar = new CTopBar(screen_size)
		if (everything_changed || this.Minimap === undefined || this.Minimap.HasChanged())
			this.Minimap = new CMinimap(screen_size, hud_flipped)
		if (everything_changed || this.Shop === undefined || this.Shop.HasChanged())
			this.Shop = new CShop(screen_size, hud_flipped)
		if (everything_changed || this.OpenShopMini === undefined || this.OpenShopMini.HasChanged())
			this.OpenShopMini = new COpenShop(false, screen_size, hud_flipped)
		if (everything_changed || this.OpenShopLarge === undefined || this.OpenShopLarge.HasChanged())
			this.OpenShopLarge = new COpenShop(true, screen_size, hud_flipped)
		if (everything_changed || this.PreGame === undefined || this.PreGame.HasChanged())
			this.PreGame = new CPreGame(screen_size)
		if (everything_changed || this.PreGame === undefined || this.PreGame.HasChanged())
			this.PreGame = new CPreGame(screen_size)
		if (everything_changed || this.Scoreboard === undefined || this.Scoreboard.HasChanged())
			this.Scoreboard = new CScoreboard(screen_size)
		if (everything_changed || this.LowerHUD.length === 0) {
			this.LowerHUD.splice(0)
			for (let i = 0; i < 24; i++)
				this.LowerHUD.push(new CLowerHUD(screen_size, i))
		}
		if (this.debug_draw)
			this.DebugDraw()
	}
	public DebugDraw(): void {
		if (GameRules?.GameState !== DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION) {
			this.TopBar.DebugDraw()
			this.Minimap.DebugDraw()
			this.Shop.DebugDraw()
			if (InputManager.IsShopOpen)
				this.OpenShopLarge.DebugDraw()
			this.LowerHUD[4].DebugDraw()
			if (InputManager.IsScoreboardOpen)
				this.Scoreboard.DebugDraw()
		} else
			this.PreGame.DebugDraw()
	}
	public ScaleWidth(w: number, screen_size = RendererSDK.WindowSize): number {
		let screen_height = screen_size.y
		if (screen_size.x === 1280 && screen_height === 1024)
			screen_height = 960
		else if (screen_size.x === 720 && screen_height === 576)
			screen_height = 540
		return Math.round(screen_height / this.proportional_base * w)
	}
	public ScaleHeight(h: number, screen_size = RendererSDK.WindowSize): number {
		const screen_height = screen_size.y
		return Math.round(screen_height / this.proportional_base * h)
	}
})()
export default GUIInfo

EventsSDK.on("PreDraw", () => GUIInfo.OnDraw())
