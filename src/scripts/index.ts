import {QuizController} from './quiz.controller';
import '../styles/index.scss';

const quizController = new QuizController();
window.addEventListener('load', quizController.quizInit);
