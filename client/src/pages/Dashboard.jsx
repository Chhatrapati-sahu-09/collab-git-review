import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects");
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const res = await api.post("/projects", { name: newProjectName });
      setProjects([...projects, res.data]);
      setNewProjectName("");
    } catch (error) {
      console.error("Error creating project");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleCreateProject} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New Project Name..."
          className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {project.name}
            </h2>
            <p className="text-sm text-gray-500">
              Role: {project.owner._id === user?._id ? "Owner" : "Member"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
