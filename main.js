let randomNam = Math.floor((Math.random() * (worldArr.length - 0)) + 0);
let dab = worldArr[randomNam].name;
let inputArr;
let inpuutLen = 5;
let inputPos = 0;
let answer = false;
let enChk = /[a-zA-Z]/; //영어
let keyboard = document.querySelector(".keyboard");
let keyboardBtn = document.querySelectorAll(".keyboard button");

// ( Math.random() * ( 최대값 - 최소값 )  ) + 최소값
init()
// console.log(worldArr);

function effectiveness(value) {
	//유효성 체크
	return enChk.test(value);
}

function spaceChk() {
	// input 공백 체크
	let count = 0;
	for (let i = 0; i < inpuutLen; i++) {
		let element = inputArr[i]
		let value = element.textContent
		if (value == "") {
			break;
		};
		count = i
	}
	if (count < inpuutLen - 1) {
		return false;
	} else {
		return true;
	}
}

function enterClick() {
	// 답 체크
	$(keyboardBtn).removeClass("on")
	$(keyboardBtn).blur();
	console.log(spaceChk());
	if (spaceChk()) {
		// 공백이 없는 경우
		dab = dab.toUpperCase();
		let count = 0;
		for (let i = 0; i < inpuutLen; i++) {
			console.log(i);
			let element = inputArr[i]
			let value = element.textContent.toUpperCase();
			if (value == dab[i]) {
				element.classList.add("darkendGreen")
				count++;
			} else if (dab.includes(value)) {
				element.classList.add("present")
			} else {
				element.classList.add("absent")
			}
			element.classList.remove('input')


			keyboardBtn.forEach(item => {
				let keyboardTxt = item.textContent.toUpperCase();
				if (keyboardTxt == value) {
					item.setAttribute("class", "");
					if (element.classList.contains('darkendGreen')) {
						item.classList.add("darkendGreen")
					} else if (element.classList.contains('present')) {
						item.classList.add("present")
					} else {
						item.classList.add("absent")
					}
				}
			});
		}

		if (count == inpuutLen) {
			alert("정답")
			answer = true;
		} else {
			let template = `<div class="box">
						<div class="input"></div>
						<div class="input"></div>
						<div class="input"></div>
						<div class="input"></div>
						<div class="input"></div>
					</div>`
			document.querySelector(".worldBox").insertAdjacentHTML('beforeend', template);
			init()
		}
	} else {
		alert("답을 입력해주세요")
		return false;
	}
}

function init() {
	inputPos = 0;
	inputArr = document.querySelectorAll(".input");
}


$(keyboardBtn).on("click", function (e) {
	if (!answer) {
		let kId = e.currentTarget.id;
		if (kId === 'enter') {
			enterClick();
		} else if (kId === 'backspace') {
			backspace()
		} else {
			let txt = $(this).text().toUpperCase();
			if (inputPos < inpuutLen) {
				inputArr[inputPos].textContent = txt
				inputPos++;
			}
			$(keyboardBtn).removeClass("on")
			$(this).addClass("on")
		}
	}
})


window.addEventListener('keydown', function (e) {
	let keyVal = e.key;
	let keyCode = e.keyCode;
	let code = e.code;
	if (code === 'Enter') {
		if (!answer) {
			enterClick();
		}
	}
	if (code === 'Backspace') {
		backspace()
	}
	if (!spaceChk()) {
		if (keyCode >= 65 && keyCode < 91) {
			let result = effectiveness(e.key)
			if (result) {
				if (inputPos < inpuutLen) {
					inputPos++;
				}
				inputArr[inputPos - 1].textContent = keyVal
			}
		}
	}
})

function backspace() {
	if (inputPos > 0) {
		inputPos--
		inputArr[inputPos].textContent = ''
	}
}
