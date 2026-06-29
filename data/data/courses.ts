export interface ResourceLinks {
  notes: string;
  syllabus: string;
  pyqs: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  links: ResourceLinks;
}

export interface Semester {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

export const coursesData: Semester[] = [
  {
    id: "sem1",
    name: "Semester 1",
    description: "First year, first semester core subjects",
    subjects: [
      {
        id: "math1",
        name: "Engineering Mathematics - I",
        code: "MAS101",
        links: {
          notes: "https://drive.google.com/your-link-here",
          syllabus: "https://drive.google.com/your-link-here",
          pyqs: "https://drive.google.com/your-link-here",
        },
      },
      {
        id: "beee",
        name: "Basic Electrical & Electronics Engg.",
        code: "BEE101",
        links: {
          notes: "https://drive.google.com/your-link-here",
          syllabus: "https://drive.google.com/your-link-here",
          pyqs: "https://drive.google.com/your-link-here",
        },
      },
    ],
  },
  {
    id: "sem2",
    name: "Semester 2",
    description: "First year, second semester core subjects",
    subjects: [
      {
        id: "math2",
        name: "Engineering Mathematics - II",
        code: "MAS201",
        links: {
          notes: "https://drive.google.com/your-link-here",
          syllabus: "https://drive.google.com/your-link-here",
          pyqs: "https://drive.google.com/your-link-here",
        },
      },
    ],
  },
];

export function getSemesterById(id: string): Semester | undefined {
  return coursesData.find((sem) => sem.id === id);
}

export function getAllSubjects() {
  return coursesData.flatMap((sem) =>
    sem.subjects.map((sub) => ({ ...sub, semesterId: sem.id, semesterName: sem.name }))
  );
}