import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { Dialog } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

const API_URL = "http://localhost:5000/api/leads";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  priority: string;
  status: string;
}


export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "LinkedIn",
    priority: "Medium",
    status: "Warm",
  });

  useEffect(() => {
  fetchLeads();
}, []);

const fetchLeads = async () => {
  try {
    const res = await fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    const data = await res.json();
    setLeads(data);
  } catch (err) {
    console.log(err);
  }
};

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase())
  );

const addLead = async () => {
  if (!newLead.name || !newLead.company || !newLead.email) {
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
},
      body: JSON.stringify(newLead),
    });

    if (!res.ok) return;

    await fetchLeads();

    setNewLead({
      name: "",
      company: "",
      email: "",
      phone: "",
      source: "LinkedIn",
      priority: "Medium",
      status: "Warm",
    });

    setOpen(false);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Leads</h1>

        <div className="flex gap-3">
          <div className="relative">
            <Search
  size={18}
  className="absolute left-3 top-3 text-muted-foreground"
/>
            <input
              type="text"
              placeholder="Search leads..."
             className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={() => setOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-card border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-foreground">{lead.name}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  lead.status === "Hot"
                    ? "bg-red-100 text-red-600"
                    : lead.status === "Warm"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="mt-3 flex items-center text-muted-foreground">
              <Building2 size={16} className="mr-2" />
              {lead.company}
            </div>

            <div className="mt-2 flex items-center text-muted-foreground">
              <Mail size={16} className="mr-2" />
              {lead.email}
            </div>

            <div className="mt-2 flex items-center text-muted-foreground">
              <Phone size={16} className="mr-2" />
              {lead.phone}
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                {lead.source}
              </span>

              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  lead.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : lead.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {lead.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Lead"
      >
        <div className="space-y-4">
          <input
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) =>
              setNewLead({ ...newLead, name: e.target.value })
            }
          />

          <input
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Company"
            value={newLead.company}
            onChange={(e) =>
              setNewLead({ ...newLead, company: e.target.value })
            }
          />

          <input
           className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) =>
              setNewLead({ ...newLead, email: e.target.value })
            }
          />

          <input
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) =>
              setNewLead({ ...newLead, phone: e.target.value })
            }
          />

          <select
           className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground"
            value={newLead.source}
            onChange={(e) =>
              setNewLead({ ...newLead, source: e.target.value })
            }
          >
            <option>LinkedIn</option>
            <option>Website</option>
            <option>Referral</option>
          </select>

          <select
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newLead.priority}
            onChange={(e) =>
              setNewLead({ ...newLead, priority: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newLead.status}
            onChange={(e) =>
              setNewLead({ ...newLead, status: e.target.value })
            }
          >
            <option>Hot</option>
            <option>Warm</option>
            <option>Cold</option>
          </select>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={addLead}>
              Save Lead
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}