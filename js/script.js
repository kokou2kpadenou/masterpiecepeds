// Others variables


var customCal = document.getElementsByClassName('flatpickr');
var submitBtn = document.getElementById('submit');
var validationMessage = {
	fullname: 'Name required.',
	phone: 'Phone number required.',
	object: 'Object required.',
	date: 'Date required.',
	recaptcha: 'Check I am not a robot.'
}


/*
	-----------------------------------------------------------------------------
		Easy loading
	-----------------------------------------------------------------------------
*/
var allImage = document.querySelectorAll('.easy-loading');
var headerTarget = document.querySelector('header');
var testimonials = document.getElementById('testimonials');

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {

			// Easy load images
			for (var i = 0; i < allImage.length; i++) {
				if (allImage[i].getAttribute('src') === '') {
					allImage[i].setAttribute('src',  allImage[i].getAttribute('data-img'));
				}
			}

			// Active background image for testimonials
			testimonials.classList.add('visible');

    }
  })
}, {});

observer.observe(headerTarget);

var formApt = document.getElementById('form-apt');
var formObserver = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {

			/*
			-----------------------------------------------------------------------------
			flatpickr props for english
			-----------------------------------------------------------------------------
			*/

			if (defaultLang === 'en') {


	      var cal = {
	        enableTime: true,
	        altFormat: "F j, Y",
	        dateFormat: 'l, F j, Y H:i',
	        minDate: new Date().fp_incr(5),
	        minTime: '09:00',
	        maxTime: '17:00',
	        disable: [
	          function(date) {
	            return (date.getDay() === 0 || date.getDay() === 6);
	          }
	        ],
	        locale: flatpickr.l10ns.en,
	        plugins: [new confirmDatePlugin({})],
	        wrap: true,
	      };

			}

			/*
			-----------------------------------------------------------------------------
			flatpickr props for english
			-----------------------------------------------------------------------------
			*/

			if (defaultLang === 'es') {


	      var cal = {
	    		enableTime: true,
	    		altFormat: "F j, Y",
	    		dateFormat: 'l, F j, Y H:i',
	    		minDate: new Date().fp_incr(5),
	    		minTime: '09:00',
	    		maxTime: '17:00',
	    		time_24hr: true,
	    		disable: [
	    			function(date) {
	    				return (date.getDay() === 0 || date.getDay() === 6);
	    			}
	    		],
	    		locale: flatpickr.l10ns.es,
	    		plugins: [new confirmDatePlugin({})],
	    		wrap: true,
	    	};
			}

			// flatpickr calendar initialisation
			customCal.flatpickr(cal);

    }
  })
}, {});

formObserver.observe(formApt);





/*
	-----------------------------------------------------------------------------
		Action after loading.
	-----------------------------------------------------------------------------
*/

window.addEventListener('load', start);

function start(e) {
	var slideshowIntervalId;
	var slideshowNavBtn = document.getElementsByClassName('slideshow__nav__btn');
	var curr = 1;


	function Move() {
		curr = (curr % 4) + 1;
		document.getElementById('ind' + curr).checked = true;
	}

	function slideBtnClickHandle() {
		clearInterval(slideshowIntervalId);
		curr = this.getAttribute('data-id');
		slideshowIntervalId = setInterval(Move, 10000);
	}

	if (slideshowNavBtn.length > 0) {
		for (var i = 0; i < slideshowNavBtn.length; i++) {
			slideshowNavBtn[i].addEventListener('click', slideBtnClickHandle);
		}
		slideshowIntervalId = setInterval(Move, 10000);

	}

	others();
}


/*
	-----------------------------------------------------------------------------
		others
	-----------------------------------------------------------------------------
*/


function others() {
	var navigationItem = document.getElementsByClassName('menu-item');
	var popup = document.getElementsByClassName('popup-close');
	var navigationToggle = document.getElementById('navigation-toggle');

	// Close the menu when a menu element is clicked
	function navToggleClickHandle() {
		navigationToggle.checked = false;
	}

	for (var i = 0; i < navigationItem.length; i++) {
		navigationItem[i].addEventListener('click', navToggleClickHandle);
	}


	// Close popup menu when click outside the popup
	function closePopupHandle(e) {
		if (e.target.classList.contains('popup-close')) {
			window.location.hash = 'services';
		}
	}

	for (var j=0; j < popup.length; j++) {
		popup[j].addEventListener('click', closePopupHandle);
	}

}

/*
	-----------------------------------------------------------------------------
		Form related
	-----------------------------------------------------------------------------
*/


var confCancel = document.getElementById('conf-cancel');
var confEdit = document.getElementById('conf-edit');
var confConfirm = document.getElementById('conf-confirm');
var confirmation = document.querySelector('.confirmation');
var comfirmationMsg1 = document.querySelector('.confirmation__msg--1');
var comfirmationMsg2 = document.querySelector('.confirmation__msg--2');
var confData = document.getElementsByClassName('confirmation__data');
var aptFullname = document.getElementById('fullname');
var aptPhone = document.getElementById('phone');
var aptDate = document.getElementById('date');
var aptObject = document.getElementById('object');

/*
	-----------------------------------------------------------------------------
		Confirmation Dialog
	-----------------------------------------------------------------------------
*/

// Reset form
function aptResetAll() {
	grecaptcha.reset();
	submitBtn.disabled = true;
	formApt.reset();
}

// messages
function showMsg(msg) {
	if (msg === 1) {
		comfirmationMsg1.classList.remove('confirmation__invisible');
		comfirmationMsg2.classList.add('confirmation__invisible');
		confCancel.classList.remove('confirmation__invisible');
		confEdit.classList.remove('confirmation__invisible');
		confConfirm.innerText = 'Confirm';
		confirmation.removeEventListener('click', formConfHanlde);

	} else {
		comfirmationMsg1.classList.add('confirmation__invisible');
		comfirmationMsg2.classList.remove('confirmation__invisible');
		confCancel.classList.add('confirmation__invisible');
		confEdit.classList.add('confirmation__invisible');
		confConfirm.innerText = 'Ok';
		confirmation.addEventListener('click', formConfHanlde);

	}
}

// Set focus on Name
function setFocusFormName() {
	aptFullname.focus();
}


// fill Data
function fillData() {
	for (var i = 0; i < confData.length; i++) {
		switch (confData[i].getAttribute('data-input')) {
			case 'name':
				confData[i].textContent = aptFullname.value;
				break;
			case 'phone':
				confData[i].textContent = aptPhone.value;
				break;
			case 'date':
				confData[i].textContent = aptDate.value;
				break;
			case 'object':
				confData[i].textContent = aptObject.value;
				break;
			default:

		}
	}
}

function formConfHanlde(e) {
	if (e.target.classList.contains('confirmation')) {
		confirmation.classList.toggle('show');
	}
}

function submitHandle(e) {
	e.preventDefault();
	confirmation.classList.toggle('show');
	fillData();
	showMsg(1);
}

formApt.addEventListener('submit', submitHandle);

confCancel.addEventListener('click', function() {
	aptResetAll();
	confirmation.classList.toggle('show');
	setFocusFormName();
});


confEdit.addEventListener('click', function() {
	setFocusFormName();
	grecaptcha.reset();
	submitBtn.disabled = true;
	confirmation.classList.toggle('show');
});


// Confirmation button click
confConfirm.addEventListener('click', function() {
	if (this.innerText === 'Confirm') {
		showMsg(2);
		// TODO: send email

		aptResetAll();
	} else {
		confirmation.classList.toggle('show');
	}
});




/*
	-----------------------------------------------------------------------------
		Form validation
	-----------------------------------------------------------------------------
*/

// Hook Input handle function to the  control
var inputs = document.getElementsByClassName('appointment__section__input');
for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('input', handleInput);
}


// Event Input handle function
function handleInput(e) {
	var labelName = document.getElementById('lab' + e.target.name).textContent;
	var requiredMsg = defaultLang === 'es' ? 'Se requiere ' + labelName + '.' : labelName + ' is required.';

	if (e.target.type === 'tel') {
		// Check the format of the phone
		var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

		if (/\([0-9]{3}\) [0-9]{3}-[0-9]{4}/.test(e.target.value)) {
			delete validationMessage[e.target.name];
		} else if (e.target.value !== '') {
			validationMessage[e.target.name] = defaultLang === 'es' ? 'El formato correcto es (555) 222-2568' :'Correct format is (555) 222-2568';
		} else {
			validationMessage[e.target.name] = requiredMsg;
		}

	} else if (e.target.value === '') {
		validationMessage[e.target.name] = requiredMsg;
	} else {
		delete validationMessage[e.target.name];
	}

	showValidationMsg(e.target.name, validationMessage);
	btnSetEnable(validationMessage);
}

// Validation message display
function showValidationMsg(elt, msg) {
	var label = document.getElementById('er' + elt);
	if (msg[elt]) {
		label.textContent = msg[elt];
		label.classList.add('appointment__section__error');
	} else {
		label.textContent = '';
		label.classList.remove('appointment__section__error');	}
}

// Submit button enabled according to form validation.
function btnSetEnable(msg) {
	submitBtn.disabled = !(Object.keys(msg).length === 0);
}


// I am not robot checked
function robotChecked() {
	delete validationMessage.recaptcha;
	btnSetEnable(validationMessage);
}

// I am not robot not checked
function robotUnchecked() {
	validationMessage.recaptcha = defaultLang === 'es' ? 'Comprueba que no soy robot.' : 'Check I am not robot.';
	btnSetEnable(validationMessage);
}
