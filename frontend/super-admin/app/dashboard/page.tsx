export default function DashboardPage() {
  return (
    <>
      <h2
        className="text-2xl font-semibold mb-1"
        style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
      >
        Welcome, Super Admin
      </h2>

      <p className="text-sm mb-8" style={{ color: "#7B1F1F" }}>
        Manage and monitor all restaurants on the platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard title="Total Restaurants" value="128" />
        <DashboardCard title="Active Restaurants" value="112" />
        <DashboardCard title="Inactive Restaurants" value="16" />
        <DashboardCard title="Orders Today" value="3,245" />
      </div>
    </>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      className="rounded-xl p-5 border transition"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#C8A951",
        boxShadow: "0 0 18px rgba(200,169,81,0.5)",
      }}
    >
      <p className="text-sm mb-1" style={{ color: "#7B1F1F" }}>
        {title}
      </p>
      <p
        className="text-2xl font-semibold"
        style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
      >
        {value}
      </p>
    </div>
  );
}
