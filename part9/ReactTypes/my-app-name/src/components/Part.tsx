import { CoursePart } from '../types';

export const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <>
          <p
            style={{
              fontWeight: 'bold',
            }}
          >
            {course.name} {course.exerciseCount}
          </p>
          <p>
            <em>{course.description}</em>
          </p>
        </>
      );
      break;
    case 'group':
      return (
        <>
          <p
            style={{
              fontWeight: 'bold',
            }}
          >
            {course.name} {course.exerciseCount}
          </p>
          <p>
            <em>project exercises {course.groupProjectCount}</em>
          </p>
        </>
      );
      break;
    case 'background':
      return (
        <>
          <p style={{ fontWeight: 'bold' }}>
            {course.name} {course.exerciseCount}
          </p>
          <p>
            <em>{course.description}</em>
          </p>
          <p>submit to {course.backgroundMaterial}</p>
        </>
      );
      break;
    default:
      break;
  }
};
