import { CourseParts } from '../types';

export const Content = ({ courseParts }: { courseParts: CourseParts[] }) => {
  return courseParts.map((course) => (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  ));
};
