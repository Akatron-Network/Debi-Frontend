import React from 'react'
import { Link , useParams } from 'react-router-dom';

export default function User() {
    const { colID } = useParams();

  return (
  <>
      <h2>User: {colID}</h2>

      <Link to="/users">Back to Users</Link>
    </>
  )
}
