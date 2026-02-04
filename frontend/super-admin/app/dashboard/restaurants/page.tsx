"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type Status = "Active" | "Inactive";

type RestaurantSummary = {
  id: number;
  restaurantName: string;
  ownerName: string;
  city: string;
  status: Status;
};

type RestaurantOnboardingForm = {
  restaurantName: string;
  restaurantType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;

  gstRegistered: "Yes" | "No";
  gstNumber: string;
  gstPercent: string;

  billingMode: "Counter" | "Table" | "Both";
  tablesCount: string;
  qrEnabled: "Yes" | "No";

  status: Status;
};

/* ---------------- PAGE ---------------- */

export default function RestaurantsPage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<RestaurantSummary[]>([
    {
      id: 1,
      restaurantName: "Spice Delight",
      ownerName: "Ravi Kumar",
      city: "Bangalore",
      status: "Active",
    },
    {
      id: 2,
      restaurantName: "Urban Diner",
      ownerName: "Neha Sharma",
      city: "Mumbai",
      status: "Inactive",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = restaurants.filter((r) => {
    const matchesSearch = r.restaurantName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id: number) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" }
          : r
      )
    );
  };

  const removeRestaurant = (id: number) => {
    if (confirm("Remove this restaurant?")) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const addRestaurant = (data: RestaurantOnboardingForm) => {
    setRestaurants((prev) => [
      ...prev,
      {
        id: Date.now(),
        restaurantName: data.restaurantName,
        ownerName: data.ownerName,
        city: data.city,
        status: data.status,
      },
    ]);

    setShowAdd(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-xl font-semibold"
            style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
          >
            Restaurants
          </h1>
          <p className="text-sm text-[#7B1F1F]">
            Manage all onboarded restaurants
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{
            backgroundColor: "#7B1F1F",
            boxShadow: "0 0 12px rgba(176,48,48,0.8)",
          }}
        >
          + Add Restaurant
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex gap-4 mb-4">
        <input
          placeholder="Search restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm w-64 bg-white
                     text-[#3B0A0D] placeholder:text-[#B89A8C]
                     border"
          style={{ borderColor: "#C8A951" }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-3 py-2 rounded-lg text-sm bg-white text-[#3B0A0D]
                     border"
          style={{ borderColor: "#C8A951" }}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        className="bg-white rounded-xl overflow-hidden border"
        style={{
          borderColor: "#C8A951",
          boxShadow: "0 0 20px rgba(200,169,81,0.4)",
        }}
      >
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#FBF6EE" }}>
            <tr className="text-left font-semibold text-[#3B0A0D]">
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y" style={{ borderColor: "#C8A951" }}>
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-[#FBF6EE]">
                <td className="px-6 py-5 font-semibold text-[#3B0A0D]">
                  {r.restaurantName}
                </td>
                <td className="px-6 py-5 text-[#7B1F1F]">
                  {r.ownerName}
                </td>
                <td className="px-6 py-5 text-[#7B1F1F]">
                  {r.city}
                </td>
                <td className="px-6 py-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        r.status === "Active"
                          ? "rgba(200,169,81,0.25)"
                          : "rgba(155,43,43,0.15)",
                      color:
                        r.status === "Active"
                          ? "#3B0A0D"
                          : "#7B1F1F",
                    }}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/restaurants/${r.id}`)
                      }
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: "#7B1F1F" }}
                    >
                      Manage
                    </button>

                    <button
                      onClick={() => toggleStatus(r.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium
                                 border text-[#3B0A0D]"
                      style={{ borderColor: "#C8A951" }}
                    >
                      {r.status === "Active" ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => removeRestaurant(r.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium
                                 bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddRestaurantModal
          onAdd={addRestaurant}
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
}

/* ---------------- ADD RESTAURANT MODAL ---------------- */

function AddRestaurantModal({
  onAdd,
  onClose,
}: {
  onAdd: (data: RestaurantOnboardingForm) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<RestaurantOnboardingForm>({
    restaurantName: "",
    restaurantType: "Restaurant",
    address: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    gstRegistered: "Yes",
    gstNumber: "",
    gstPercent: "5",
    billingMode: "Both",
    tablesCount: "",
    qrEnabled: "Yes",
    status: "Inactive",
  });

  const update = (k: keyof RestaurantOnboardingForm, v: string) =>
    setForm({ ...form, [k]: v });

  const submit = () => {
    if (
      !form.restaurantName ||
      !form.ownerName ||
      !form.ownerEmail ||
      !form.ownerPhone ||
      !form.city
    ) {
      alert("Please fill all required fields");
      return;
    }
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2
          className="text-lg font-semibold mb-6"
          style={{ color: "#3B0A0D", fontFamily: "var(--font-heading)" }}
        >
          Restaurant Onboarding
        </h2>

        <Section title="Restaurant Information">
          <Input label="Restaurant Name *" value={form.restaurantName} onChange={(v) => update("restaurantName", v)} />
          <Input label="Restaurant Type" value={form.restaurantType} onChange={(v) => update("restaurantType", v)} />
          <Input label="Address" value={form.address} onChange={(v) => update("address", v)} />
        </Section>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-sm text-[#7B1F1F]">
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: "#7B1F1F" }}
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL UI ---------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 mb-5 border"
      style={{ borderColor: "#C8A951" }}
    >
      <h3 className="text-sm font-semibold text-[#3B0A0D] mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-[#7B1F1F]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md text-sm
                   bg-white text-[#3B0A0D]
                   border"
        style={{ borderColor: "#C8A951" }}
      />
    </div>
  );
}
