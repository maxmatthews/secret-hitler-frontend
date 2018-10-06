import { observable } from "mobx";

const globalStore = new observable({
	roomCode: "ABCD",
	playerName: "",
	players: [],
	gameStarted: false
});

export default globalStore;
