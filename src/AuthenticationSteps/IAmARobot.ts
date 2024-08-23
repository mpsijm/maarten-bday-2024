import { Authentication } from '../Authentication.js';
import { Console } from '../Console.js';
import { AbstractAuthenticationStep } from './AbstractAuthenticationStep.js';

export class IAmARobot extends AbstractAuthenticationStep {
	private robotInputElement: HTMLInputElement;
	private formElement: HTMLFormElement;
	private labelElement: HTMLLabelElement;

	public constructor(authentication: Authentication) {
		super(authentication);
		this.generateElement();
	}

	protected generateElement(): void {
		this.robotInputElement = <HTMLInputElement>document.createElement('input');
		this.robotInputElement.type = 'checkbox';
		this.robotInputElement.value = '1';
		this.robotInputElement.id = 'authentication-step-enter-name-robot-input';
		this.robotInputElement.disabled = true;

		this.labelElement = <HTMLLabelElement>document.createElement('label');
		this.labelElement.innerText = 'Ik ben een robot';
		this.labelElement.htmlFor = 'authentication-step-enter-name-robot-input';

		const submitInputElement = <HTMLInputElement>(
			document.createElement('input')
		);
		submitInputElement.type = 'submit';
		submitInputElement.value = 'Controleren';

		this.formElement = <HTMLFormElement>document.createElement('form');
		this.formElement.appendChild(this.robotInputElement);
		this.formElement.appendChild(this.labelElement);
		this.formElement.appendChild(submitInputElement);

		this.element = <HTMLDivElement>document.createElement('div');
		this.element.classList.add('authentication-step');
		this.element.id = 'authentication-step-enter-name';
		this.element.style.width = '100%';
		this.element.style.height = '100%';
		this.element.style.backgroundColor = 'white';
		this.element.style.color = 'black';

		this.element.appendChild(this.formElement);
	}

	public initialize(): void {
		this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));

		Console.log('🔓 Vooruit, voor deze ene keer mag je hier klooien :).');
	}

	public terminate(): void {
		this.formElement.removeEventListener(
			'submit',
			this.onFormSubmit.bind(this),
		);

		Console.log(
			'🔒 Klaar met de pret, de element inspector is weer verboden terrein.',
		);
	}

	public getRobotInputElement(): HTMLInputElement {
		return this.robotInputElement;
	}

	public getFormElement(): HTMLFormElement {
		return this.formElement;
	}

	private onFormSubmit(e: SubmitEvent): void {
		e.preventDefault();
		this.validate();
	}

	protected validate(): void {
		if (!this.getRobotInputElement().checked) {
			alert('Sorry, je bent geen robot');
			return;
		}

		return this.getAuthentication().gotToNextAuthenticationStep();
	}
}
