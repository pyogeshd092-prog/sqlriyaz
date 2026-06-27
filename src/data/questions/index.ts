import { easyQuestions } from './easy';
import { easy2Questions } from './easy2';
import { easy3Questions } from './easy3';
import { mediumQuestions } from './medium';
import { medium2Questions } from './medium2';
import { medium3Questions } from './medium3';
import { hardQuestions } from './hard';
import { hard2Questions } from './hard2';
import { hard3Questions } from './hard3';
import { expertQuestions } from './expert';
import { expert2Questions } from './expert2';
import { expert3Questions } from './expert3';
import type { Question } from '../../types';

export const questions: Question[] = [
  ...easyQuestions,
  ...easy2Questions,
  ...easy3Questions,
  ...mediumQuestions,
  ...medium2Questions,
  ...medium3Questions,
  ...hardQuestions,
  ...hard2Questions,
  ...hard3Questions,
  ...expertQuestions,
  ...expert2Questions,
  ...expert3Questions,
];

export {
  easyQuestions, easy2Questions, easy3Questions,
  mediumQuestions, medium2Questions, medium3Questions,
  hardQuestions, hard2Questions, hard3Questions,
  expertQuestions, expert2Questions, expert3Questions
};
export type { Question };
