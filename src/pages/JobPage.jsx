/* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();

  function onDeleteClick(jobId) {
    const confirm = window.confirm("are you sure to delete this listing");
    if (!confirm) return;
    deleteJob(jobId);
    toast.success("job deleted successfully");

    return navigate("/jobs");
  }
  return (
    <>
      <section>
        <div className="container px-6 py-6 m-auto">
          <Link
            to="/jobs"
            className="flex items-center text-indigo-500 hover:text-indigo-600"
          >
            <FaArrowLeft className="mr-2 text-xl" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container px-6 py-10 m-auto">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
            <main>
              <div className="p-6 text-center bg-white rounded-lg shadow-md md:text-left">
                <div className="mb-4 text-gray-500">{job.type}</div>
                <h1 className="mb-4 text-3xl font-bold">{job.title}</h1>
                <div className="flex justify-center mb-4 text-gray-500 align-middle md:justify-start">
                  <FaMapMarker className="mr-1 text-red-500 " />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-lg font-bold text-indigo-800">
                  {job.description}
                </h3>

                <p className="mb-4">
                  We are seeking a talented Front-End Developer to join our team
                  in Boston, MA. The ideal candidate will have strong skills in
                  HTML, CSS, and JavaScript, with experience working with modern
                  JavaScript frameworks such as React or Angular.
                </p>

                <h3 className="mb-2 text-lg font-bold text-indigo-800">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-xl font-bold">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="p-2 my-2 font-bold bg-indigo-100">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="p-2 my-2 font-bold bg-indigo-100">
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-6 text-xl font-bold">Manage Job</h3>
                <Link
                  to={`/edit-jobs/${job.id}`}
                  className="block w-full px-4 py-2 mt-4 font-bold text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="block w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

// eslint-disable-next-line react-refresh/only-export-components
export { JobPage as default, jobLoader };
