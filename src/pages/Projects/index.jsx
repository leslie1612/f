import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import API from "../../utils/api";
import "./projects.css";

const Projects = () => {
  const { token } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [reloadProjects, setReloadProjects] = useState(false);

  React.useEffect(() => {
    API.getProjects(token).then((json) => {
      setProjects(json.data);
    });
  }, [reloadProjects]);

  const addNewProject = () => {
    console.log(projectName);
    if (projectName === "") {
      alert("Project name can't be empty.");
    }
    const data = {
      name: projectName,
    };
    API.addNewProject(data, token).then((status) => {
      if (status === 201) {
        setReloadProjects(!reloadProjects);
        setProjectName("");
        setOpened(false);
      } else if (status === 400) {
        alert("Project name is already used.");
      }
    });
  };

  const cancel = () => {
    setOpened(false);
    setProjectName("");
  };

  const deleteProject = (project) => {
    if (confirm(`Delete project ${project.name} ?`)) {
      API.deleteProject(project.id, token).then((status) => {
        if (status === 204) {
          setReloadProjects(!reloadProjects);
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <Card onClick={() => setOpened(true)}>
          <Card.Body>
            <Card.Title>+ Add Project</Card.Title>
          </Card.Body>
        </Card>
        {opened && (
          <>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={() => addNewProject()}>submit</button>
            <button onClick={() => cancel()}>cancel</button>
          </>
        )}

        {projects &&
          projects.map((project) => (
            <Card key={project.id}>
              <Card.Body>
                <Link to={`/table/${project.id}`}>
                  <Card.Title>{project.name}</Card.Title>
                </Link>
              </Card.Body>
              <Button
                variant="outline-danger"
                onClick={() => deleteProject(project)}
              >
                X
              </Button>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Projects;