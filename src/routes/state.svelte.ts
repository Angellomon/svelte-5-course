type StrError = string;
type InputTypes = 'text' | 'date' | 'color';
type FormStateType = {
	name: string;
	birthday: string;
	hobby: string;
	favoriteColor: string;
	step: number;
	error: string;
};
type ValidatorFunc = (value: any) => StrError;

function validateName(name: string): StrError {
	if (!name) return 'missing name';

	return '';
}

function validateBirthday(birthday: string): StrError {
	if (!birthday) return 'missing birthday';

	const now = Date.now();
	const date = new Date(birthday);

	let diff = now - date.getTime(); // milliseconds
	diff /= 60 * 60 * 24 * 1000; // days
	diff = Math.abs(Math.round(diff / 365.25)); // years aprox

	if (diff < 18) return 'you must be 18 or older';

	return '';
}

function validateHobby(hobby: string): StrError {
	if (!hobby) return 'missing hobby';

	return '';
}

function validateFavoriteColor(color: string): StrError {
	if (!color) return 'missing favorite color';

	return '';
}

export class FormState {
	value: FormStateType = $state({
		name: '',
		birthday: '',
		hobby: '',
		favoriteColor: '',
		step: 0,
		error: ''
	});

	steps: {
		id: keyof FormStateType;
		question: string;
		type: InputTypes;
		validator: ValidatorFunc;
	}[] = [
		{
			id: 'name',
			question: 'Your Name',
			type: 'text',
			validator: validateName
		},
		{
			id: 'birthday',
			question: 'Your Birthday',
			type: 'date',
			validator: validateBirthday
		},
		{
			id: 'hobby',
			question: 'Your Hobby',
			type: 'text',
			validator: validateHobby
		},
		{
			id: 'favoriteColor',
			question: 'Your Favorite Color',
			type: 'color',
			validator: validateFavoriteColor
		}
	];
	validateStep = (): StrError => {
		for (let i = 0; i < this.steps.length; i++) {
			if (i === this.value.step) {
				const stepValue = this.value[this.steps[i].id];
				return this.steps[i].validator(stepValue as string);
			}
		}

		return '';
	};

	nextStep = () => {
		const error = this.validateStep();

		if (error) {
			this.value.error = error;
			return;
		}

		this.value.error = '';
		this.value.step += 1;
	};

	previousStep = () => {
		if (this.value.step <= 0) return;

		this.value.error = '';
		this.value.step -= 1;
	};
}

export function createForm() {
	return new FormState();
}
