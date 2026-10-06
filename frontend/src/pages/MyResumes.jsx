import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await API.get("/resumes");
        setResumes(response.data.resumes);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      }
    };

    fetchResumes();

  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => (window.location.href = "/dashboard")}
          className="mb-5 text-sm font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          ← Back to Dashboard
        </button>
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Resumes
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage and edit all your saved resumes
            </p>
          </div>

          <button
            type="button"
            onClick={() => (window.location.href = "/builder")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + Create Resume
          </button>
        </div>

        {/* Resume Count */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
        </p>

        {/* Resume Cards */}
        {resumes.length === 0 ? (
          <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              No resumes yet
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Create your first resume to get started.
            </p>

            <button
              type="button"
              onClick={() => (window.location.href = "/builder")}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Create Resume
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                      {resume.title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Template: {resume.template}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Updated{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href = `/builder?resumeId=${resume._id}&template=${resume.template}`)
                    }
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href = `/builder?resumeId=${resume._id}&template=${resume.template}`)
                    }
                    className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Open
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      const confirmed = window.confirm(
                        `Delete "${resume.title}"? This action cannot be undone.`
                      );

                      if (!confirmed) return;

                      try {
                        await API.delete(`/resumes/${resume._id}`);

                        setResumes((prev) =>
                          prev.filter((item) => item._id !== resume._id)
                        );
                      } catch (error) {
                        console.error("Delete Resume Error:", error);

                        alert(
                          error.response?.data?.message ||
                          "Failed to delete resume"
                        );
                      }
                    }}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}