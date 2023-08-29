import { Content } from "./Content";
import { Header } from "./Header";

export function Course({ course }) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
}
