import React from 'react'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landing = () => {
    return (
        <div>

            <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

                <Navbar />

                {/* Hero Section */}
                <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">

                    <div className="mb-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                        ✨ AI-powered resume builder
                    </div>

                    <h2 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                        Build a resume that gets
                        <span className="text-indigo-600 dark:text-indigo-400">
                            {" "}noticed.
                        </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                        Create professional resumes, optimize them with AI,
                        improve your ATS score, and tailor your resume for
                        your dream job.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                        <Link
                            to="/signup"
                            className="rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
                        >
                            Create My Resume →
                        </Link>

                        <Link
                            to="/templates"
                            className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                        >
                            Explore Templates
                        </Link>

                    </div>

                </section>


                {/* Features Section */}
                <section className="border-t border-slate-200 bg-slate-50 px-6 py-20 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">

                    <div className="mx-auto max-w-6xl">

                        <div className="mb-12 text-center">

                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Everything you need
                            </p>

                            <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                                One platform for your resume
                            </h3>

                        </div>


                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                            {/* Card 1 */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">

                                <div className="mb-4 text-3xl">
                                    🎨
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Modern Templates
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Choose from professional and ATS-friendly resume templates.
                                </p>

                            </div>


                            {/* Card 2 */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">

                                <div className="mb-4 text-3xl">
                                    🤖
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    AI Assistant
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Improve your summary, experience and projects with AI.
                                </p>

                            </div>


                            {/* Card 3 */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">

                                <div className="mb-4 text-3xl">
                                    📊
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    ATS Optimization
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Analyze keywords, structure and job compatibility.
                                </p>

                            </div>


                            {/* Card 4 */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">

                                <div className="mb-4 text-3xl">
                                    ✨
                                </div>

                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    One-Page Fix
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    Let AI optimize your resume when it exceeds one page.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    )
}

export default Landing
