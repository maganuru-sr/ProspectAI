import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  User,
  Calendar,
  Flag,
} from "lucide-react";
import { Dialog } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

const API_URL = "https://prospectai-backend.onrender.com/api/tasks";

interface Task {
  id: number;
  title: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  status: string;
}


export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
  fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
    const res = await fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    const data = await res.json();
    setTasks(data);
  } catch (err) {
    console.log(err);
  }
};

  const [newTask, setNewTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase())
  );

  const addTask = async () => {
  if (!newTask.title || !newTask.assignedTo) {
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify(newTask),
    });

    if (!res.ok) return;

    await fetchTasks();

    setNewTask({
      title: "",
      assignedTo: "",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
    });

    setOpen(false);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-foreground">
          Tasks
        </h1>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search tasks or assignee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground"
            />

          </div>

          <Button onClick={() => setOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Task
          </Button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredTasks.map((task) => (

          <div
            key={task.id}
            className="bg-card border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold text-foreground">
                {task.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {task.status}
              </span>

            </div>

            <div className="mt-3 flex items-center text-muted-foreground">
              <User size={16} className="mr-2" />
              {task.assignedTo}
            </div>

            <div className="mt-2 flex items-center text-muted-foreground">
              <Calendar size={16} className="mr-2" />
              {task.dueDate}
            </div>

            <div className="mt-2 flex items-center text-muted-foreground">
              <Flag size={16} className="mr-2" />
              {task.priority}
            </div>

          </div>

        ))}

      </div>

      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Task"
      >

        <div className="space-y-4">

          <input
            placeholder="Task Title"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Assigned To"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newTask.assignedTo}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignedTo: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                dueDate: e.target.value,
              })
            }
          />

          <select
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value,
              })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                status: e.target.value,
              })
            }
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={addTask}>
              Save Task
            </Button>

          </div>

        </div>

      </Dialog>

    </div>
  );
}