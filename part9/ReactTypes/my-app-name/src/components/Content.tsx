import { CoursePart } from '../types';
import { Part } from './Part';

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((course) => <Part course={course} />);
};
