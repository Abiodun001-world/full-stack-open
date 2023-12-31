import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ courses }) => (
  <div>
    {courses.map(course => (
      <div key={course.id}>
        {course.name === 'Half Stack application development' && (
          <h1>Web development curriculum</h1>
        )}
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

export default Course;


