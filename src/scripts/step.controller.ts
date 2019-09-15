export class StepController {
    public stepElement: Element;
    public titleElement: Element;
    public subtitleElement: Element;
    public answersElements: Element[];
    public buttonElement: Element;
    public isQuestionStep: boolean;
    public isCorrectAnswer: boolean;

    constructor(stepElement: Element) {
        this.setStepElements(stepElement);
    }

    public showStep(): void {
        this.stepElement.classList.add('step_active');
    }

    public hideStep(): void {
        this.stepElement.classList.remove('step_active');
    }

    public showAttemptResult(attemptedAnswerElement: Element): void {
        this.stepElement.classList.add('step_result');
        this.answersElements.forEach((answerElement: Element) => {
            if (attemptedAnswerElement.isSameNode(answerElement)) {
                answerElement.classList.add('step__answer_attempt');
            }
        });
        this.isCorrectAnswer = attemptedAnswerElement.classList.contains('step__answer_correct');
        this.buttonElement.classList.remove('button_disabled');
    }

    public setQuizResult(correctAnswersCount: number, maxCorrectAnswersCount: number): void {
        if (correctAnswersCount === maxCorrectAnswersCount) {
            this.titleElement.textContent = 'Perfect result';
            this.titleElement.classList.add('step__title_green');
        } else if (correctAnswersCount > maxCorrectAnswersCount / 2) {
            this.titleElement.textContent = 'Good result';
            this.titleElement.classList.add('step__title_orange');
        } else {
            this.titleElement.textContent = 'So bad result';
            this.titleElement.classList.add('step__title_red');
        }

        this.subtitleElement.textContent = `You have ${correctAnswersCount} of ${maxCorrectAnswersCount} correct answers`;
    }

    public cleanStepResult(): void {
        if (this.isQuestionStep) {
            this.stepElement.classList.remove('step_result');
            this.answersElements.forEach((answerElement: Element) => {
                answerElement.classList.remove('step__answer_attempt');
            });
            this.isCorrectAnswer = false;
            this.buttonElement.classList.add('button_disabled');
        }
    }

    private setStepElements(stepElement: Element): void {
        this.stepElement = stepElement;
        this.titleElement = stepElement.querySelector('.step__title');
        this.subtitleElement = stepElement.querySelector('.step__subtitle');
        this.answersElements = Array.from(stepElement.querySelectorAll('.step__answer'));
        this.buttonElement = stepElement.querySelector('.step__button');
        this.isQuestionStep = this.answersElements.length > 0;
        this.isCorrectAnswer = false;
    }
}
