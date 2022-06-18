import { SOType } from "../Enums/SOType"
import { arrayRemoveCallback } from "../Utils/ArrayExtensions"
import { BinaryKV } from "../Utils/VBKV"

type Listener = (...args: any) => Promise<false | any> | false | any
export class EventEmitter {
	protected readonly events = new Map<string, [Listener, number][]>()
	protected readonly events_after = new Map<string, [Listener, number][]>()
	protected readonly listener2line = new Map<Listener, string>()

	public on(name: string, listener: Listener, priority = 0): EventEmitter {
		this.listener2line.set(listener, new Error().stack?.split("\n")[2] ?? "")

		const listeners = this.events.get(name) ?? []
		listeners.push([listener, priority])
		this.events.set(name, listeners.sort((a, b) => a[1] - b[1]))

		return this
	}
	public after(name: string, listener: Listener, priority = 0): EventEmitter {
		this.listener2line.set(listener, new Error().stack?.split("\n")[2] ?? "")

		const listeners = this.events_after.get(name) ?? []
		listeners.push([listener, priority])
		this.events_after.set(name, listeners.sort((a, b) => a[1] - b[1]))

		return this
	}

	public removeListener(name: string, listener: Listener): EventEmitter {
		const listeners = this.events.get(name)
		if (listeners === undefined)
			return this

		if (arrayRemoveCallback(listeners, val => val[0] === listener))
			this.listener2line.delete(listener)
		return this
	}

	public async emit(name: string, cancellable = false, ...args: any[]): Promise<boolean> {
		const listeners = this.events.get(name),
			listeners_after = this.events_after.get(name)

		if (listeners !== undefined)
			for (const [listener] of listeners)
				try {
					if ((await listener(...args) === false) && cancellable)
						return false
				} catch (e: any) {
					console.error(e instanceof Error ? e : new Error(e), this.listener2line.get(listener))
				}
		if (listeners_after !== undefined)
			for (const [listener] of listeners_after)
				try {
					await listener(...args)
				} catch (e: any) {
					console.error(e instanceof Error ? e : new Error(e), this.listener2line.get(listener))
				}
		return true
	}

	public once(name: string, listener: Listener, priority = 0): EventEmitter {
		const onceListener = (...args: any) => {
			this.removeListener(name, onceListener)
			listener(...args)
		}
		return this.on(name, onceListener, priority)
	}
}

declare interface Events extends EventEmitter {
	on(name: "UIStateChanged", callback: (new_state: number) => void, priority?: number): Events
	/**
	 * That's analog of https://docs.microsoft.com/en-us/previous-versions/windows/desktop/legacy/ms633573(v%3Dvs.85 (w/o hwnd)
	 * message_type: https://www.autoitscript.com/autoit3/docs/appendix/WinMsgCodes.htm
	 */
	on(name: "WndProc", callback: (message_type: number, wParam: bigint, lParam: bigint) => false | any, priority?: number): Events
	on(name: "RequestUserCmd", callback: () => void, priority?: number): Events
	on(name: "Draw", callback: (visual_data: ArrayBuffer, w: number, h: number) => void, priority?: number): Events
	on(name: "PrepareUnitOrders", callback: () => false | any, priority?: number): Events
	on(name: "DebuggerPrepareUnitOrders", callback: (is_user_input: boolean, was_cancelled: boolean) => void, priority?: number): Events
	on(name: "GameEvent", listener: (event_name: string, obj: any) => void, priority?: number): Events
	on(name: "CustomGameEvent", listener: (event_name: string, data: Map<string, BinaryKV>) => void, priority?: number): Events
	on(name: "InputCaptured", listener: (is_captured: boolean) => void, priority?: number): Events
	on(name: "SharedObjectChanged", listener: (type_id: SOType, reason: number, msg: ArrayBuffer) => void, priority?: number): Events
	on(name: "NewConnection", listener: () => void, priority?: number): Events
	on(name: "ServerMessage", listener: (msg_id: number, buf: ArrayBuffer) => void, priority?: number): Events
	on(name: "GCPingResponse", listener: () => boolean, priority?: number): Events
	on(name: "MatchmakingStatsUpdated", listener: (msg: ArrayBuffer) => void, priority?: number): Events
	on(name: "ScriptsUpdated", listener: () => void, priority?: number): Events
	on(name: "IPCMessage", func: (source_worker_uid: bigint, name: string, msg: WorkerIPCType) => void, priority?: number): Events
	on(name: "WorkerSpawned", func: (worker_uid: bigint) => void, priority?: number): Events
	on(name: "WorkerDespawned", func: (worker_uid: bigint) => void, priority?: number): Events
	on(name: "SetLanguage", func: (language: number) => void, priority?: number): Events
}

const Events: Events = new EventEmitter()
export default Events
setFireEvent(async (name, cancellable, ...args) => Events.emit(name, cancellable, ...args))
