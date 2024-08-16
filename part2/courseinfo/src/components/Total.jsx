

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return <b>Total of {totalExercises} exercises</b>;
};

export { Total };