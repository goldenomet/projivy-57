
import { Project, Task, User } from "@/types/project";
import { addDays, subDays } from "date-fns";

export const users: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Project Manager",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: "user2",
    name: "Sam Taylor",
    email: "sam@example.com",
    role: "Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
  },
  {
    id: "user3",
    name: "Jamie Lee",
    email: "jamie@example.com",
    role: "Designer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie"
  },
  {
    id: "user4",
    name: "Morgan Smith",
    email: "morgan@example.com",
    role: "Developer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan"
  },
  {
    id: "user5",
    name: "Taylor Reed",
    email: "taylor@example.com",
    role: "Marketing",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor"
  }
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    projectId: "proj1",
    name: "Design User Interface",
    description: "Create wireframes and mockups for the dashboard",
    assignedTo: ["user3"],
    responsibleParty: "user1",
    contacts: ["user1", "user3"],
    startDate: subDays(new Date(), 5),
    dueDate: addDays(new Date(), 2),
    duration: 7,
    dependencies: [],
    status: "in-progress",
    remarks: "Wireframes completed, working on high-fidelity mockups"
  },
  {
    id: "task2",
    projectId: "proj1",
    name: "Implement Frontend Components",
    description: "Develop React components based on the approved designs",
    assignedTo: ["user2", "user4"],
    responsibleParty: "user2",
    contacts: ["user1", "user2", "user3"],
    startDate: addDays(new Date(), 3),
    dueDate: addDays(new Date(), 10),
    duration: 7,
    dependencies: ["task1"],
    status: "not-started",
    remarks: "Waiting for design approval"
  },
  {
    id: "task3",
    projectId: "proj1",
    name: "Backend API Development",
    description: "Create RESTful APIs for the application",
    assignedTo: ["user4"],
    responsibleParty: "user4",
    contacts: ["user1", "user4"],
    startDate: subDays(new Date(), 10),
    dueDate: subDays(new Date(), 2),
    duration: 8,
    dependencies: [],
    status: "completed",
    remarks: "All endpoints tested and documented"
  },
  {
    id: "task4",
    projectId: "proj1",
    name: "Quality Assurance Testing",
    description: "Test all features and identify bugs",
    assignedTo: ["user5"],
    responsibleParty: "user5",
    contacts: ["user1", "user5"],
    startDate: addDays(new Date(), 11),
    dueDate: addDays(new Date(), 15),
    duration: 4,
    dependencies: ["task2", "task3"],
    status: "not-started",
    remarks: "Test plan ready"
  },
  {
    id: "task5",
    projectId: "proj2",
    name: "Market Research",
    description: "Research the target market and competitors",
    assignedTo: ["user5"],
    responsibleParty: "user5",
    contacts: ["user1", "user5"],
    startDate: subDays(new Date(), 15),
    dueDate: subDays(new Date(), 5),
    duration: 10,
    dependencies: [],
    status: "delayed",
    remarks: "Waiting for additional data from the marketing team"
  },
  {
    id: "task6",
    projectId: "proj2",
    name: "Brand Guidelines",
    description: "Develop brand guidelines including logo and color scheme",
    assignedTo: ["user3"],
    responsibleParty: "user3",
    contacts: ["user1", "user3", "user5"],
    startDate: subDays(new Date(), 5),
    dueDate: addDays(new Date(), 5),
    duration: 10,
    dependencies: ["task5"],
    status: "in-progress",
    remarks: "Color scheme approved, working on typography"
  },
  {
    id: "task7",
    projectId: "proj3",
    name: "Initial Client Meeting",
    description: "Meet with client to discuss project scope and requirements",
    assignedTo: ["user1"],
    responsibleParty: "user1",
    contacts: ["user1"],
    startDate: addDays(new Date(), 1),
    dueDate: addDays(new Date(), 1),
    duration: 1,
    dependencies: [],
    status: "not-started",
    remarks: "Agenda prepared"
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved functionality",
    startDate: subDays(new Date(), 10),
    endDate: addDays(new Date(), 20),
    status: "active",
    progress: 35,
    tasks: mockTasks.filter(task => task.projectId === "proj1")
  },
  {
    id: "proj2",
    name: "Marketing Campaign",
    description: "Q3 marketing campaign for product launch",
    startDate: subDays(new Date(), 15),
    endDate: addDays(new Date(), 15),
    status: "active",
    progress: 50,
    tasks: mockTasks.filter(task => task.projectId === "proj2")
  },
  {
    id: "proj3",
    name: "Mobile App Development",
    description: "Develop iOS and Android applications for clients",
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 60),
    status: "on-hold",
    progress: 0,
    tasks: mockTasks.filter(task => task.projectId === "proj3")
  }
];
