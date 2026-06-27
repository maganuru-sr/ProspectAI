import {
  Users,
  UserPlus,
  BadgeIndianRupee,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function Analytics() {
  const stats = [
    {
      title: "Total Prospects",
      value: "245",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Qualified Leads",
      value: "132",
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      title: "Revenue Pipeline",
      value: "₹1.85 Cr",
      icon: BadgeIndianRupee,
      color: "text-yellow-500",
    },
    {
      title: "Conversion Rate",
      value: "38%",
      icon: Target,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-foreground mb-8">
        Analytics Dashboard
      </h1>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-card border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-2">
                    {item.value}
                  </h2>
                </div>

                <Icon className={`${item.color}`} size={36} />

              </div>
            </div>
          );
        })}

      </div>

      {/* Charts Section */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-card border border-border rounded-xl p-6">

          <div className="flex items-center mb-4">

            <TrendingUp
              className="mr-2 text-green-500"
              size={22}
            />

            <h2 className="text-xl font-semibold text-foreground">
              Monthly Growth
            </h2>

          </div>

          <div className="h-64 rounded-lg bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-slate-900 flex items-center justify-center">

            <div className="text-center">

              <TrendingUp
                size={60}
                className="mx-auto text-green-500 mb-3"
              />

              <p className="text-muted-foreground">
                Monthly Growth Chart
              </p>

            </div>

          </div>

        </div>

        <div className="bg-card border border-border rounded-xl p-6">

          <div className="flex items-center mb-4">

            <BarChart3
              className="mr-2 text-blue-500"
              size={22}
            />

            <h2 className="text-xl font-semibold text-foreground">
              Sales Pipeline
            </h2>

          </div>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">
                  Prospects
                </span>
                <span className="text-foreground font-semibold">
                  245
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-secondary">
                <div className="w-[90%] h-3 rounded-full bg-blue-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">
                  Leads
                </span>
                <span className="text-foreground font-semibold">
                  132
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-secondary">
                <div className="w-[70%] h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">
                  Deals Won
                </span>
                <span className="text-foreground font-semibold">
                  48
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-secondary">
                <div className="w-[45%] h-3 rounded-full bg-purple-500"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}