import { Color, EventsSDK, Game, Hero, LocalPlayer, Menu, RendererSDK, Vector2, DOTAGameUIState_t, EntityManager } from "wrapper/Imports"

const EMBMenu = Menu.AddEntry(["Visual", "Enemy Bars"]),
	emb = EMBMenu.AddNode("Mana Bars"),
	ehb = EMBMenu.AddNode("Hp Bars"),
	stateMain = emb.AddToggle("State", true),
	embText = emb.AddToggle("Show numbers", false),
	embSize = emb.AddSlider("Size", 14, 10, 30),
	ehbText = ehb.AddToggle("Show numbers", false),
	ehbSize = ehb.AddSlider("Size", 14, 10, 30)

EventsSDK.on("Draw", () => {
	if (LocalPlayer === undefined || !stateMain.value || !Game.IsInGame || Game.UIState !== DOTAGameUIState_t.DOTA_GAME_UI_DOTA_INGAME || LocalPlayer.IsSpectator)
		return false
	let off_x: number,
		off_y: number,
		// off_x_text: number,
		// off_y_text: number,
		manabar_w: number,
		manabar_h: number,
		screen_size = RendererSDK.WindowSize,
		ratio = RendererSDK.GetAspectRatio()

	{ // TODO: multiple aspect ratio support (current: 16:10)
		if (ratio === "16x9") {
			off_x = screen_size.x * -0.027
			off_y = screen_size.y * -0.01715
			manabar_w = screen_size.x * 0.053
			manabar_h = screen_size.y * 0.005
			// off_x_text = screen_size.x * 0.017;
			// off_y_text = screen_size.y * -0.003;

		} else if (ratio === "16x10") {
			off_x = screen_size.x * -0.02950
			off_y = screen_size.y * -0.01715
			manabar_w = screen_size.x * 0.0583
			manabar_h = screen_size.y * 0.0067
		} else if (ratio === "21x9") {
			off_x = screen_size.x * -0.020
			off_y = screen_size.y * -0.01715
			manabar_w = screen_size.x * 0.039
			manabar_h = screen_size.y * 0.007
		} else {
			off_x = screen_size.x * -0.038
			off_y = screen_size.y * -0.01715
			manabar_w = screen_size.x * 0.075
			manabar_h = screen_size.y * 0.0067
		}
	}

	EntityManager.GetEntitiesByClass(Hero).forEach(hero => {
		if (!hero.IsEnemy() || hero.IsIllusion || !hero.IsAlive || !hero.IsVisible)
			return
		let wts = RendererSDK.WorldToScreen(hero.Position.AddScalarZ(hero.HealthBarOffset))
		if (wts === undefined)
			return
		wts.AddScalarX(off_x).AddScalarY(off_y)
		let size = new Vector2(manabar_w, manabar_h)
		RendererSDK.FilledRect(wts, size, Color.Black)
		size.MultiplyScalarForThis(hero.Mana / hero.MaxMana)
		size.SetY(manabar_h)
		RendererSDK.FilledRect(wts, size, Color.RoyalBlue)
		let addx = 25, addy = -4, addyehb = -10 + (-embSize.value / 4)
		if (ratio === "21x9") {
			addx = 46
		}
		wts.AddScalarX(addx).AddScalarY(addy)
		if (embText.value) {
			RendererSDK.Text(`${Math.floor(hero.Mana)}/${Math.floor(hero.MaxMana)}`, wts, Color.White, "Calibri", new Vector2(embSize.value, 200))
		}
		if (ehbText.value) {
			RendererSDK.Text(`${Math.floor(hero.HP)}/${Math.floor(hero.MaxHP)}`, wts.AddScalarY(addyehb), Color.White, "Calibri", new Vector2(ehbSize.value, 200))
		}
		// let mana: any = Math.round(hero.Mana);
		// wts.AddScalarX(off_x_text).AddScalarY(off_y_text);
		// RendererSDK.Text(mana + "/" + Math.round(hero.MaxMana), wts, Color.White, "Calibri", new Vector2(14, 100))
	})
})