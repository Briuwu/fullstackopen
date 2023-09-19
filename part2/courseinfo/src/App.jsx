import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        const total = course.parts.reduce(
          (total, part) => total + part.exercises,
          0
        );

        return (
          <div key={course.id}>
            <Header title={course.name} />
            <Course course={course.parts} />
            <Total total={total} />
          </div>
        );
      })}
    </div>
  );
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Total = ({ total }) => {
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default App;
