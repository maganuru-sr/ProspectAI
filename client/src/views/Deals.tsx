import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  BadgeIndianRupee,
  Building2,
  Calendar,
} from "lucide-react";
import { Dialog } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

const API_URL = "http://localhost:5000/api/deals";

interface Deal {
  id: number;
  title: string;
  company: string;
  value: string;
  stage: string;
  closeDate: string;
}


export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [newDeal, setNewDeal] = useState({
    title: "",
    company: "",
    value: "",
    stage: "New",
    closeDate: "",
  });

  useEffect(() => {
  fetchDeals();
}, []);

const fetchDeals = async () => {
  try {
    const res = await fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    const data = await res.json();
    setDeals(data);
  } catch (err) {
    console.log(err);
  }
};

  const filteredDeals = deals.filter(
    (deal) =>
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.company.toLowerCase().includes(search.toLowerCase())
  );

  const addDeal = async () => {
  if (
    !newDeal.title ||
    !newDeal.company ||
    !newDeal.value
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
      body: JSON.stringify(newDeal),
    });

    if (!res.ok) return;

    await fetchDeals();

    setNewDeal({
      title: "",
      company: "",
      value: "",
      stage: "New",
      closeDate: "",
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
          Deals
        </h1>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search deals or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground"
            />

          </div>

          <Button onClick={() => setOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Deal
          </Button>

        </div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredDeals.map((deal) => (

          <div
            key={deal.id}
            className="bg-card border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <h2 className="text-xl font-semibold text-foreground">
                {deal.title}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  deal.stage === "Won"
                    ? "bg-green-100 text-green-700"
                    : deal.stage === "Negotiation"
                    ? "bg-yellow-100 text-yellow-700"
                    : deal.stage === "Proposal"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {deal.stage}
              </span>

            </div>

            <div className="mt-3 flex items-center text-muted-foreground">

              <Building2 size={16} className="mr-2" />
              {deal.company}

            </div>

            <div className="mt-2 flex items-center text-muted-foreground">

              <BadgeIndianRupee size={16} className="mr-2" />
{deal.value}

            </div>

            <div className="mt-2 flex items-center text-muted-foreground">

              <Calendar size={16} className="mr-2" />
              {deal.closeDate}

            </div>

          </div>

        ))}

      </div>

      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Deal"
      >

        <div className="space-y-4">

          <input
            placeholder="Deal Title"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newDeal.title}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Company"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newDeal.company}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                company: e.target.value,
              })
            }
          />

          <input
            placeholder="Deal Value (₹)"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newDeal.value}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                value: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newDeal.closeDate}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                closeDate: e.target.value,
              })
            }
          />

          <select
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground"
            value={newDeal.stage}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                stage: e.target.value,
              })
            }
          >
            <option>New</option>
            <option>Proposal</option>
            <option>Negotiation</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={addDeal}>
              Save Deal
            </Button>

          </div>

        </div>

      </Dialog>

    </div>
  );
}