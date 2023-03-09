/** @format */

import { useState } from "react";
import "./App.css";

function App() {
	const [sessionTime, setSessionTime] = useState(5);
	const [breakTime, setBreakTime] = useState(5);
	const [timeLeft, setTimeLeft] = useState(sessionTime);
	const [active, setActive] = useState("");
	const [runningBool, setRunningBool] = useState(false);
	const [breakBool, setBreakBool] = useState(false);

	// a function to format time into minutes and seconds
	const formatTimeMinutesSeconds = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${
			seconds < 10 ? "0" : ""
		}${seconds}`;
	};

	// a function to format time into minutes
	const formatTimeMinutes = (time) => {
		const minutes = Math.floor(time / 60);
		return `${minutes}`;
	};

	// a function to change the sessionTime and breakTime state, using the setTimeLeft to change the timeLeft state
	const changeTime = (time, type) => {
		if (!runningBool) {
			if (type === "session") {
				if (time < 60) {
					setSessionTime(60);
					setTimeLeft(60);
				} else if (time > 60 * 60) {
					setSessionTime(60 * 60);
					setTimeLeft(60 * 60);
				} else {
					setSessionTime(time);
					setTimeLeft(time);
				}
			} else if (type === "break") {
				if (time < 60) {
					setBreakTime(60);
				} else if (time > 60 * 60) {
					setBreakTime(60 * 60);
				} else {
					setBreakTime(time);
				}
			}
		}
	};

	const playAudio = () => {
		const audio = document.getElementById("beep");
		audio.currentTime = 0;
		audio.play();
	};

	const buttonPressed = (index) => {
		// increment or decrement using the index
		if (index === "breakDecrement") {
			changeTime(breakTime - 60, "break");
		} else if (index === "breakIncrement") {
			changeTime(breakTime + 60, "break");
		} else if (index === "sessionDecrement") {
			changeTime(sessionTime - 60, "session");
		} else if (index === "sessionIncrement") {
			changeTime(sessionTime + 60, "session");
		}

		// start and stop using the index
		if (index === "start") {
			console.log("START was pressed.");
			setRunningBool(true);
			console.log("runningBool: " + runningBool);
			setRunningBool(true);
			console.log("runningBool: " + runningBool);
			// const timer = setInterval(() => {
			// 	if (runningBool) {
			// 		console.log("1runningBool: " + runningBool);
			// 		if (timeLeft === 0) {
			// 			playAudio();
			// 			setBreakBool(!breakBool);
			// 			if (breakBool) {
			// 				setTimeLeft(sessionTime);
			// 			} else {
			// 				setTimeLeft(breakTime);
			// 			}
			// 		} else {
			// 			setTimeLeft((timeLeft) => timeLeft - 1);
			// 			console.log(timeLeft);
			// 		}
			// 	} else {
			// 		clearInterval(timer);
			// 	}
			// }, 1000);
		} else if (index === "stop") {
			console.log("STOP was pressed.");
			setRunningBool(false);
		}

		if (index === "reset") {
			setSessionTime(25 * 60);
			setBreakTime(5 * 60);
			setTimeLeft(25 * 60);
			setRunningBool(false);
			const audio = document.getElementById("beep");
			audio.pause();
			audio.currentTime = 0;
		}

		// using setActive to change the border color of the button
		setActive(index);
		setTimeout(() => {
			setActive(999);
		}, 200);
	};

	return (
		<div className="App">
			<audio
				id="beep"
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			></audio>
			<div className="flex h-screen w-screen place-items-center bg-[#923737]">
				<div className="mx-1 w-[560px] min-w-[420px] max-w-xl border-4 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc] bg-[#dcd5d5] shadow-[5px_5px_5px_black] sm:mx-auto">
					<div className="bg-gradient-to-r from-[#923737] to-[#cccccc] p-1 font-mono text-lg font-bold text-gray-50">
						freeCodeCamp: 25 + 5 Clock
					</div>
					<div className="mx-auto grid w-auto select-none grid-cols-2 text-center font-mono text-2xl sm:text-3xl">
						<div id="break-label" className="my-3">
							<h2>Break Length</h2>
						</div>
						<div id="session-label" className="my-3">
							<h2>Session Length</h2>
						</div>

						<div className="">
							<span
								id="break-decrement"
								className={`px-2 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
									active === "breakDecrement"
										? "border-2 border-zinc-700"
										: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
								}`}
								onClick={() => {
									buttonPressed("breakDecrement");
								}}
							>
								-
							</span>
							<div
								id="break-length"
								className="mx-5 inline-block w-10"
							>
								{formatTimeMinutes(breakTime)}
							</div>
							<span
								id="break-increment"
								className={`px-2 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
									active === "breakIncrement"
										? "border-2 border-zinc-700"
										: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
								}`}
								onClick={() => {
									buttonPressed("breakIncrement");
								}}
							>
								+
							</span>
						</div>

						<div className="">
							<span
								id="session-decrement"
								className={`px-2 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
									active === "sessionDecrement"
										? "border-2 border-zinc-700"
										: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
								}`}
								onClick={() => {
									buttonPressed("sessionDecrement");
								}}
							>
								-
							</span>
							<div
								id="session-length"
								className="mx-5 inline-block w-10"
							>
								{formatTimeMinutes(sessionTime)}
							</div>
							<span
								id="session-increment"
								className={`px-2 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
									active === "sessionIncrement"
										? "border-2 border-zinc-700"
										: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
								}`}
								onClick={() => {
									buttonPressed("sessionIncrement");
								}}
							>
								+
							</span>
						</div>

						<div className="col-span-2 my-8 mx-auto border-2 border-b-slate-200 border-r-slate-200 border-l-[#cccccc] border-t-[#cccccc] bg-slate-100 p-2 shadow-[2px_2px_2px_black]">
							<div id="timer-label">
								{breakBool ? `Break` : `Session`}
							</div>
							<div
								id="time-left"
								className="inline-block text-8xl font-semibold"
							>
								{formatTimeMinutesSeconds(timeLeft)}
							</div>
						</div>

						<div
							id="start_stop"
							className={`mx-auto mb-4 inline-block w-52 py-1 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
								active === "startStop"
									? "border-2 border-zinc-700"
									: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
							}`}
							onClick={() => {
								{
									runningBool
										? buttonPressed("stop")
										: buttonPressed("start");
								}
							}}
						>
							{runningBool ? "Stop" : "Start"}
						</div>
						<div
							id="reset"
							className={`mx-auto mb-4 inline-block w-52 py-1 shadow-[2px_2px_2px_black] hover:cursor-pointer hover:bg-zinc-400 ${
								active === "reset"
									? "border-2 border-zinc-700"
									: "border-2 border-t-slate-200 border-l-slate-200 border-r-[#cccccc] border-b-[#cccccc]"
							}`}
							onClick={() => {
								buttonPressed("reset");
							}}
						>
							Reset
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
