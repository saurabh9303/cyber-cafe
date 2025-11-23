"use client";
import { useEffect, useState } from "react";

// Add animation styles
const styles = `
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
`;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [forms, setForms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [alert, setAlert] = useState(null);

  // Show confirmation dialog
  const showConfirmDialog = (title, message) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        title,
        message,
        onConfirm: () => {
          setConfirmDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog(null);
          resolve(false);
        },
      });
    });
  };

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // ---------------------- LOADERS ----------------------
  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = await showConfirmDialog(
      "Delete User",
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      loadUsers();
      showAlert("User deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete user", "error");
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetch("/api/computer/book");
      const data = await res.json();
      if (data.bookings) setBookings(data.bookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const deleteBooking = async (id) => {
    const confirmed = await showConfirmDialog(
      "Delete Booking",
      "Are you sure you want to delete this booking?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/computer/book?id=${id}`, { method: "DELETE" });
      loadBookings();
      showAlert("Booking deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete booking", "error");
    }
  };

  const loadForms = async () => {
    try {
      const res = await fetch("/api/service-form?admin=true");
      const data = await res.json();
      if (Array.isArray(data.forms)) setForms(data.forms);
    } catch (error) {
      console.error("Error loading service forms:", error);
    }
  };

  const deleteForm = async (id) => {
    const confirmed = await showConfirmDialog(
      "Delete Service Order",
      "Are you sure you want to delete this service order?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/service-form?id=${id}`, { method: "DELETE" });
      loadForms();
      showAlert("Service order deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete service order", "error");
    }
  };

  const loadContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (Array.isArray(data.contacts)) setContacts(data.contacts);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    const confirmed = await showConfirmDialog(
      "Delete Contact Message",
      "Are you sure you want to delete this contact message?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      loadContacts();
      showAlert("Contact message deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete contact message", "error");
    }
  };

  useEffect(() => {
    loadUsers();
    loadBookings();
    loadForms();
    loadContacts();
  }, []);

  // ---------------------- RENDER TABLES ----------------------
  const renderTable = () => {
    switch (activeTab) {
      case "users":
        return (
          <Table
            columns={["Name", "Email", "Role", "Provider", "Created", "Actions"]}
            rows={users.map((u) => [
              u.name,
              u.email,
              u.role,
              u.provider,
              new Date(u.createdAt).toLocaleDateString(),
              <button
                key={u._id}
                onClick={() => deleteUser(u._id)}
                className="px-3 lg:px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-150"
              >
                Delete
              </button>,
            ])}
          />
        );
      case "bookings":
        return (
          <Table
            columns={["User", "Email", "Date", "Days", "Computers", "Start", "End", "Created", "Actions"]}
            rows={bookings.map((b) => [
              b.userName,
              b.userEmail,
              b.date,
              b.days,
              b.computersBooked,
              b.sessionStart,
              b.sessionEnd,
              new Date(b.createdAt).toLocaleDateString(),
              <button
                key={b._id}
                onClick={() => deleteBooking(b._id)}
                className="px-3 lg:px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-150"
              >
                Delete
              </button>,
            ])}
          />
        );
      case "forms":
        return (
          <Table
            columns={["Service", "User", "Email", "Form Data", "Created", "Actions"]}
            rows={forms.map((f) => [
              f.serviceName,
              f.user.name,
              f.user.email,
              <div key={f._id} className="max-w-xs lg:max-w-md">
                <details className="group">
                  <summary className="cursor-pointer px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 text-sm font-medium text-blue-700 transition-all duration-150 flex items-center gap-2">
                    <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View Form Data
                  </summary>
                  <div className="mt-2 p-3 bg-gray-200 rounded-lg border border-gray-200 max-h-64 overflow-auto">
                    <div className="space-y-2">
                      {Object.entries(f.formValues).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-200 pb-2 last:border-0">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-sm text-gray-900 font-medium">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              </div>,
              new Date(f.createdAt).toLocaleDateString(),
              <button
                key={f._id}
                onClick={() => deleteForm(f._id)}
                className="px-3 lg:px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-150"
              >
                Delete
              </button>,
            ])}
          />
        );
      case "contacts":
        return (
          <Table
            columns={["Name", "Email", "Phone", "Subject", "Message", "Created", "Actions"]}
            rows={contacts.map((c) => [
              c.name,
              c.email,
              c.phone,
              c.subject || "-",
              c.message,
              new Date(c.createdAt).toLocaleDateString(),
              <button
                key={c._id}
                onClick={() => deleteContact(c._id)}
                className="px-3 lg:px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-150"
              >
                Delete
              </button>,
            ])}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="flex h-screen bg-gradient-to-br from-slate-700 via-gray-400 to-indigo-100 pt-15">
        {/* Confirmation Dialog */}
        {confirmDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{confirmDialog.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{confirmDialog.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDialog.onCancel}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alert Notification */}
        {alert && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] ${alert.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
              }`}>
              {alert.type === "success" ? (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <p className={`font-medium ${alert.type === "success" ? "text-green-800" : "text-red-800"
                }`}>
                {alert.message}
              </p>
              <button
                onClick={() => setAlert(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ---------------------- SIDEBAR ---------------------- */}
        <aside className={`fixed top-15 lg:static inset-y-0 left-0 z-30 w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">Management Console</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {["users", "bookings", "forms", "contacts"].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all duration-150 ${activeTab === tab
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                      }`}
                  >
                    <span className="capitalize">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ---------------------- CONTENT ---------------------- */}
        <main className="flex-1 overflow-auto">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 capitalize">{activeTab}</h2>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="p-4 lg:p-8">
            <div className="mb-6 lg:mb-8 hidden lg:block">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h2>
              <p className="text-sm lg:text-base text-white mt-2">View and manage all {activeTab} in the system</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50">
              {renderTable()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// ---------------------- REUSABLE TABLE ----------------------
function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 lg:px-6 py-8 lg:py-12 text-center text-gray-500"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-xs lg:text-sm font-medium">No data found</p>
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="px-3 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-900 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}