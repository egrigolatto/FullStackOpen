

const Total = ({ course }) => {

  let exercises1 = course.parts[0].exercises;
  let exercises2 = course.parts[1].exercises;
  let exercises3 = course.parts[2].exercises;

  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

export { Total };