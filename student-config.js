/* ==========================================================================
   STUDENT CONFIG — the only file you should need to edit for a new student.
   ==========================================================================
   1. Change the values below.
   2. Save / commit.
   3. Done. The whole site reads from this file.

   level must be exactly one of: "middle" | "high" | "launch"
     middle  -> grades 7-8   (more visual, mission-based, more scaffolding)
     high    -> grades 9-11  (academic coaching, moderate scaffolding)
     launch  -> grade 12-college (independent, concise, professional)
   ========================================================================== */

const STUDENT_CONFIG = {
  // Student's first name (used everywhere on the site)
  name: "Student",

  // Grade level, as a string (e.g. "7", "10", "College Freshman")
  grade: "10",

  // Differentiation level — controls wording, scaffolding, and tone
  level: "high", // middle | high | launch

  // Current coaching priorities — short phrases, shown on the Home page
  priorities: [
    "task initiation",
    "planning",
    "reading retention"
  ],

  // Optional — known interests, used only to make examples feel relevant.
  // Leave as an empty array if unknown.
  interests: [],

  // The student's Google Sheets planner link (Weekly Planner + Assignment
  // Tracker). See docs/GOOGLE-PLANNER-TEMPLATE.md to build one.
  // Leave as "" until the planner exists — the Planner button will say so.
  plannerUrl: "",

  // Tutor's name/title, shown in a few places on the site.
  tutorName: "Mr. Ehinger"
};

// Do not rename this file or this variable — index.html and content.js
// both expect window.STUDENT_CONFIG to exist exactly as defined above.
