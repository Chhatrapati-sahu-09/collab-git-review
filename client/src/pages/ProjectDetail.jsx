import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProjectDetail = () => {
  const { id } = useParams(); // This is the projectId from the URL
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, [id]);

  const fetchDocuments = async () => {
    try {
      const res = await api.get(`/documents/project/${id}`);
      setDocuments(res.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    try {
      const res = await api.post("/documents", {
        title: newDocTitle,
        projectId: id,
      });
      setDocuments([...documents, res.data]);
      setNewDocTitle("");
    } catch (error) {
      console.error("Error creating document", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 text-sm text-gray-600 bg-white border rounded shadow-sm hover:bg-gray-100"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Project Files</h1>
      </div>

      <form onSubmit={handleCreateDocument} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newDocTitle}
          onChange={(e) => setNewDocTitle(e.target.value)}
          placeholder="New File Name (e.g., App.js, styles.css)..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          type="submit"
          className="px-6 py-2 text-white bg-green-600 rounded shadow-sm hover:bg-green-700 transition-colors"
        >
          Create File
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {documents.map((doc) => (
          <Link
            to={`/editor/${doc._id}`}
            key={doc._id}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <span className="text-lg font-medium text-gray-700 truncate">
              📄 {doc.title}
            </span>
          </Link>
        ))}
        {documents.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
            No files yet. Create one to start collaborating!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
