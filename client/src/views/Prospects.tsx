import { useEffect, useState } from "react";
import { Search, Plus, Filter, Mail, Phone, Building2 } from "lucide-react";
import { Dialog } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";
const API_URL = "https://prospectai-backend.onrender.com/api/prospects";

interface Prospect {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
}


export default function Prospects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  useEffect(() => {
  fetchProspects();
}, []);

const fetchProspects = async () => {
  try {
    const res = await fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    const data = await res.json();
    setProspects(data);
  } catch (err) {
    console.log(err);
  }
};
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [newProspect, setNewProspect] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const filteredProspects = prospects.filter(
    (prospect) =>
      prospect.name.toLowerCase().includes(search.toLowerCase()) ||
      prospect.company.toLowerCase().includes(search.toLowerCase())
  );

const addProspect = async () => {
  if (
    !newProspect.name ||
    !newProspect.company ||
    !newProspect.email
  ) {
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify({
        ...newProspect,
        status: "New",
      }),
    });

    if (!res.ok) return;

    await fetchProspects();

    setNewProspect({
      name: "",
      company: "",
      email: "",
      phone: "",
    });

    setOpen(false);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <h1 className="text-3xl font-bold text-foreground">
          Prospects
        </h1>

        <div className="flex gap-3">

          {/* Search */}

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />

            <input
              type="text"
              placeholder="Search prospects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />

          </div>

          <Button variant="outline">
            <Filter size={18} />
          </Button>

          <Button onClick={() => setOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Prospect
          </Button>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredProspects.map((prospect) => (

          <div
            key={prospect.id}
           className="bg-card border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-xl font-semibold text-foreground">
                  {prospect.name}
                </h2>

                <div className="flex items-center text-muted-foreground mt-1">

                  <Building2 size={16} className="mr-2" />
                  {prospect.company}

                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  prospect.status === "New"
                    ? "bg-green-100 text-green-700"
                    : prospect.status === "Contacted"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {prospect.status}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center text-muted-foreground">

                <Mail size={16} className="mr-2" />
                {prospect.email}

              </div>

              <div className="flex items-center text-muted-foreground">

                <Phone size={16} className="mr-2" />
                {prospect.phone}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Dialog */}

      <Dialog
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Add Prospect"
>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            value={newProspect.name}
            onChange={(e) =>
              setNewProspect({
                ...newProspect,
                name: e.target.value,
              })
            }
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Company"
            value={newProspect.company}
            onChange={(e) =>
              setNewProspect({
                ...newProspect,
                company: e.target.value,
              })
            }
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
          />

          <input
            type="email"
            placeholder="Email"
            value={newProspect.email}
            onChange={(e) =>
              setNewProspect({
                ...newProspect,
                email: e.target.value,
              })
            }
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Phone"
            value={newProspect.phone}
            onChange={(e) =>
              setNewProspect({
                ...newProspect,
                phone: e.target.value,
              })
            }
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
          />

          <div className="flex justify-end gap-3 pt-2">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={addProspect}>
              Save Prospect
            </Button>

          </div>

        </div>

      </Dialog>

    </div>
  );
}