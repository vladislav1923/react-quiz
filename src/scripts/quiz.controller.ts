import {StepController} from "./step.controller";

export class QuizController {
    private readonly maxCorrectAnswersCount = 8;
    private readonly stepsList: StepController[] = [];
    private currentStepIndex: number = 0;

    public quizInit = (): void => {
        this.setStepsList();
        this.setStepListeners();
    };

    private onAnswerClick = (event: Event): void => {
        this.stepsList[this.currentStepIndex].showAttemptResult(event.target as Element);
    };

    private onNextStepClick = (): void => {
        this.stepsList[this.currentStepIndex].hideStep();
        if (this.currentStepIndex === this.stepsList.length - 1) {
            this.stepsList.forEach((step: StepController) => {
                step.cleanStepResult();
            });
            this.currentStepIndex = 1;
        } else {
            this.currentStepIndex++;
        }
        if (this.currentStepIndex === this.stepsList.length - 1) {
            const correctAnswersCount = this.stepsList.filter((step: StepController) => step.isCorrectAnswer).length;
            this.stepsList[this.currentStepIndex].setQuizResult(correctAnswersCount, this.maxCorrectAnswersCount);
        }
        this.stepsList[this.currentStepIndex].showStep();
    };

    private setStepsList(): void {
        document.querySelectorAll('.step').forEach((stepElement: Element) => {
            this.stepsList.push(new StepController(stepElement));
        });
    };

    private setStepListeners(): void {
        this.stepsList.forEach((step: StepController) => {
            if (step.isQuestionStep) {
                step.answersElements.forEach((element: Element) => {
                    element.addEventListener('click', this.onAnswerClick);
                });
            }

            step.buttonElement.addEventListener('click', this.onNextStepClick);
        })
    };
}
