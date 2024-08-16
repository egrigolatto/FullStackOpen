import { Part } from "./Part";

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} course={part} />
      ))}
    </div>
  );
};


export { Content };
