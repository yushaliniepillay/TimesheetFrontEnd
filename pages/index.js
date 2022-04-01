import React from "react";
import Nav from '../components/nav'
import AddProject from '../components/Project/addProject'
import ViewProject from '../components/Project/viewProject'

const Home = () => {

  return (
    <div>
      <Nav />
      <label className="flex justify-center py-5 font-serif text-3xl font-bold "> PROJECTS</label>
      
      {/* modal pop up to add new project */}
      <AddProject />
      {/* view and edit existing project */}
      <ViewProject />
      
    </div >
  )
}

export default Home