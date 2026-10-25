"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Users,
  Mail,
  Calendar,
  DollarSign,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Eye,
  Send,
  AlertCircle,
  Sparkles,
  Inbox,
  Check,
  X,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Layers,
  UserCheck,
  BarChart3,
  FileSpreadsheet,
  Briefcase,
} from "lucide-react";

interface PracticeClient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  retainer_program: string;
  monthly_fee: number;
  status: "active" | "paused" | "completed" | "archived";
  start_date: string;
  primary_focus?: string;
  delivery_mode?: string;
  clinical_notes?: string;
  created_at: string;
  updated_at: string;
}

interface AssessmentLead {
  id: string;
  full_name?: string;
  name?: string;
  email: string;
  phone?: string;
  primary_domain?: string;
  domain?: string;
  identified_gap?: string;
  gap?: string;
  priority_stage?: string;
  timeline?: string;
  desired_outcome?: string;
  note?: string;
  notes?: string;
  recommended_program?: string;
  recommended_retainer?: string;
  investment?: string;
  status: "new" | "scheduled" | "enrolled" | "archived";
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  full_name?: string;
  downloaded_resource?: string;
  source?: string;
  status?: string;
  created_at: string;
}

interface ContactInquiry {
  id: string;
  full_name?: string;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
}

interface PracticeEarning {
  id: string;
  month_year: string;
  total_revenue: number;
  active_clients: number;
  new_clients?: number;
  notes?: string;
  updated_at: string;
}

interface AdminMetrics {
  totalLeads: number;
  currentMonthRevenue: number;
  totalRecordedRevenue: number;
  totalActiveClients: number;
  statusCounts: {
    new: number;
    scheduled: number;
    enrolled: number;
    archived: number;
  };
  totalSubscribers: number;
  totalInquiries: number;
  programBreakdown?: Record<string, { count: number; revenue: number }>;
  lastSync: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [inputPasscode, setInputPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Practice Data states
  const [clients, setClients] = useState<PracticeClient[]>([]);
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [earnings, setEarnings] = useState<PracticeEarning[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<"clients" | "reports" | "leads" | "subscribers" | "inquiries" | "resources">("clients");

  // Client search & filters
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [clientStatusFilter, setClientStatusFilter] = useState<string>("all");

  // Lead search & filters
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<AssessmentLead | null>(null);

  // Client Modal state (Add / Edit)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientProgram, setClientProgram] = useState("Signature Advisory Retainer");
  const [clientMonthlyFee, setClientMonthlyFee] = useState("2400");
  const [clientStatus, setClientStatus] = useState<"active" | "paused" | "completed" | "archived">("active");
  const [clientStartDate, setClientStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [clientDeliveryMode, setClientDeliveryMode] = useState("virtual");
  const [clientPrimaryFocus, setClientPrimaryFocus] = useState("Metabolic Neuroplasticity");
  const [clientNotes, setClientNotes] = useState("");
  const [clientSaving, setClientSaving] = useState(false);
  const [clientMessage, setClientMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState<string | null>(null);

  // Check saved session passcode
  useEffect(() => {
    const savedToken = sessionStorage.getItem("ls_admin_token");
    if (savedToken) {
      setPasscode(savedToken);
      fetchAdminData(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPasscode.trim()) return;
    setIsVerifying(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/data", {
        headers: {
          "x-admin-passcode": inputPasscode.trim(),
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Access Denied. Invalid Passcode.");
        setIsVerifying(false);
        return;
      }

      setPasscode(inputPasscode.trim());
      sessionStorage.setItem("ls_admin_token", inputPasscode.trim());
      setIsAuthenticated(true);
      setClients(data.data.clients || []);
      setLeads(data.data.leads || []);
      setSubscribers(data.data.subscribers || []);
      setInquiries(data.data.inquiries || []);
      setEarnings(data.data.earnings || []);
      setMetrics(data.data.metrics || null);
    } catch (err: any) {
      setAuthError("Connection error while validating credentials.");
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchAdminData = async (token: string, isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-passcode": token },
      });
      const result = await res.json();

      if (res.ok && result.success) {
        setIsAuthenticated(true);
        setClients(result.data.clients || []);
        setLeads(result.data.leads || []);
        setSubscribers(result.data.subscribers || []);
        setInquiries(result.data.inquiries || []);
        setEarnings(result.data.earnings || []);
        setMetrics(result.data.metrics || null);
      } else {
        sessionStorage.removeItem("ls_admin_token");
        setIsAuthenticated(false);
        setAuthError("Session expired or invalid key. Please re-enter.");
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ls_admin_token");
    setPasscode("");
    setIsAuthenticated(false);
    setClients([]);
    setLeads([]);
    setSubscribers([]);
    setInquiries([]);
    setEarnings([]);
    setMetrics(null);
  };

  // Client Modal Handlers
  const openAddClientModal = (initialLead?: AssessmentLead) => {
    setEditingClientId(null);
    setClientMessage(null);

    if (initialLead) {
      setClientName(initialLead.full_name || initialLead.name || "");
      setClientEmail(initialLead.email || "");
      setClientPhone(initialLead.phone || "");
      const prog = initialLead.recommended_program || initialLead.recommended_retainer || "Signature Advisory Retainer";
      setClientProgram(prog);
      setClientMonthlyFee(prog.includes("1,275") ? "1275" : prog.includes("4,800") ? "4800" : "2400");
      setClientPrimaryFocus(initialLead.primary_domain || initialLead.domain || "Metabolic Neuroplasticity");
      setClientNotes(initialLead.desired_outcome ? `Goal: ${initialLead.desired_outcome}` : "");
    } else {
      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setClientProgram("Signature Advisory Retainer");
      setClientMonthlyFee("2400");
      setClientPrimaryFocus("Metabolic Neuroplasticity");
      setClientNotes("");
    }

    setClientStatus("active");
    setClientDeliveryMode("virtual");
    setClientStartDate(new Date().toISOString().slice(0, 10));
    setIsClientModalOpen(true);
  };

  const openEditClientModal = (client: PracticeClient) => {
    setEditingClientId(client.id);
    setClientName(client.name);
    setClientEmail(client.email || "");
    setClientPhone(client.phone || "");
    setClientProgram(client.retainer_program);
    setClientMonthlyFee(client.monthly_fee.toString());
    setClientStatus(client.status);
    setClientStartDate(client.start_date || new Date().toISOString().slice(0, 10));
    setClientDeliveryMode(client.delivery_mode || "virtual");
    setClientPrimaryFocus(client.primary_focus || "Metabolic Neuroplasticity");
    setClientNotes(client.clinical_notes || "");
    setClientMessage(null);
    setIsClientModalOpen(true);
  };

  const handleProgramSelect = (prog: string) => {
    setClientProgram(prog);
    if (prog.includes("Foundational")) setClientMonthlyFee("1275");
    else if (prog.includes("Signature")) setClientMonthlyFee("2400");
    else if (prog.includes("Platinum")) setClientMonthlyFee("4800");
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setClientMessage({ text: "Please enter the client's full name.", isError: true });
      return;
    }

    setClientSaving(true);
    setClientMessage(null);

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          id: editingClientId,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          retainer_program: clientProgram,
          monthly_fee: clientMonthlyFee,
          status: clientStatus,
          start_date: clientStartDate,
          primary_focus: clientPrimaryFocus,
          delivery_mode: clientDeliveryMode,
          clinical_notes: clientNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClientMessage({
          text: editingClientId ? "Client details updated successfully." : "Client enrolled successfully!",
          isError: false,
        });

        await fetchAdminData(passcode, true);

        setTimeout(() => {
          setIsClientModalOpen(false);
          setClientMessage(null);
        }, 1000);
      } else {
        setClientMessage({ text: data.error || "Failed to save client.", isError: true });
      }
    } catch (err: any) {
      setClientMessage({ text: "Error saving client details. Please try again.", isError: true });
    } finally {
      setClientSaving(false);
    }
  };

  const handleDeleteClient = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name} from your client roster?`)) return;

    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      if (res.ok) {
        await fetchAdminData(passcode, true);
      }
    } catch (err) {
      console.error("Failed to delete client:", err);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/lead-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus as any } : lead))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastContent) return;
    setBroadcastSending(true);
    setBroadcastSuccess(null);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          subject: broadcastSubject,
          message: broadcastContent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBroadcastSuccess(data.message || "Briefing successfully queued for broadcast.");
        setBroadcastSubject("");
        setBroadcastContent("");
      } else {
        alert(data.error || "Failed to dispatch broadcast");
      }
    } catch (err) {
      console.error("Broadcast failed:", err);
    } finally {
      setBroadcastSending(false);
    }
  };

  // CSV Exports
  const exportClientsCSV = () => {
    if (clients.length === 0) return;
    const headers = ["Client Name", "Email", "Phone", "Retainer Program", "Monthly Fee ($)", "Status", "Start Date", "Delivery Mode", "Primary Focus", "Notes"];
    const rows = clients.map((c) => [
      `"${c.name}"`,
      `"${c.email || ""}"`,
      `"${c.phone || ""}"`,
      `"${c.retainer_program}"`,
      c.monthly_fee,
      `"${c.status}"`,
      `"${c.start_date}"`,
      `"${c.delivery_mode || "virtual"}"`,
      `"${c.primary_focus || ""}"`,
      `"${(c.clinical_notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `liberty_science_clients_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMonthlyReportCSV = () => {
    const activeClientsList = clients.filter((c) => c.status === "active");
    const totalRev = activeClientsList.reduce((acc, c) => acc + (Number(c.monthly_fee) || 0), 0);
    const monthName = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const lines = [
      `"Liberty Science Coaching — Monthly Practice Financial Report"`,
      `"Report Period:","${monthName}"`,
      `"Generated At:","${new Date().toLocaleString()}"`,
      `"Total Active Retainer Revenue:","$${totalRev.toLocaleString()}"`,
      `"Total Active Enrolled Clients:","${activeClientsList.length}"`,
      ``,
      `"Client Name","Retainer Program","Monthly Fee","Delivery Mode","Status"`,
      ...activeClientsList.map((c) => `"${c.name}","${c.retainer_program}","$${c.monthly_fee}","${c.delivery_mode}","${c.status}"`),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + lines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `liberty_science_monthly_report_${new Date().toISOString().slice(0, 7)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ["Email", "Full Name", "Downloaded Resource / Action", "Channel", "Status", "Subscribed At"];
    const rows = subscribers.map((sub) => [
      `"${sub.email}"`,
      `"${sub.full_name || "N/A"}"`,
      `"${sub.downloaded_resource || "Direct Subscription"}"`,
      `"${sub.source || "website"}"`,
      `"${sub.status || "active"}"`,
      `"${new Date(sub.created_at).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `liberty_science_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Focus", "Current Challenge", "Timeline", "Chief Goal", "Recommended Retainer", "Status", "Date"];
    const rows = leads.map((l) => [
      `"${l.full_name || l.name || "Candidate"}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.primary_domain || l.domain || ""}"`,
      `"${l.identified_gap || l.gap || ""}"`,
      `"${l.priority_stage || l.timeline || ""}"`,
      `"${(l.desired_outcome || "").replace(/"/g, '""')}"`,
      `"${l.recommended_program || l.recommended_retainer || l.investment || ""}"`,
      `"${l.status}"`,
      `"${new Date(l.created_at).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `liberty_science_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
        client.email?.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
        client.retainer_program.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
        client.primary_focus?.toLowerCase().includes(clientSearchQuery.toLowerCase());

      const matchesStatus = clientStatusFilter === "all" || client.status === clientStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [clients, clientSearchQuery, clientStatusFilter]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const candidateName = lead.full_name || lead.name || "";
      const domainName = lead.primary_domain || lead.domain || "";
      const gapName = lead.identified_gap || lead.gap || "";

      const matchesSearch =
        candidateName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        domainName.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
        gapName.toLowerCase().includes(leadSearchQuery.toLowerCase());

      const matchesStatus = leadStatusFilter === "all" || lead.status === leadStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, leadSearchQuery, leadStatusFilter]);

  // Derived Client Stats
  const activeClients = useMemo(() => clients.filter((c) => c.status === "active"), [clients]);
  const activeRevenue = useMemo(
    () => activeClients.reduce((acc, c) => acc + (Number(c.monthly_fee) || 0), 0),
    [activeClients]
  );

  // ==========================================
  // VIEW: LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
        <div className="w-full max-w-md relative z-10">
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
                <Image
                  src="/logo.png"
                  alt="Liberty Science"
                  width={46}
                  height={46}
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-950 tracking-tight">
                Liberty Science
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
                Client management, retainers, and practice reports.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Practice Access Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                  </div>
                  <input
                    type="password"
                    value={inputPasscode}
                    onChange={(e) => setInputPasscode(e.target.value)}
                    placeholder="Enter Access Key (e.g. LIBERTY2026)"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all font-sans"
                    autoFocus
                  />
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-850 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Open Practice Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Vera Shury, MS
              </span>
              <span>Tucson, Arizona</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: HIGH-END EXECUTIVE DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200/90 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Practice Branding */}
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden p-1 shadow-2xs">
                <Image
                  src="/logo.png"
                  alt="Liberty Science"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-slate-950">
                    LIBERTY SCIENCE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    CLINICIAN PORTAL
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Vera Shury, MS</span>
                  <span className="text-slate-300">•</span>
                  <span>Tucson, Arizona</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions & Session */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchAdminData(passcode, true)}
              disabled={isRefreshing}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
              title="Refresh live data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-600" : "text-slate-500"}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => openAddClientModal()}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Client</span>
            </button>

            <a
              href="https://calendar.app.google/8Gt1wf6dzY3ki8xy7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Appointments</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active Clients Roster */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Active Client Roster
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-950">
                {activeClients.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeClients.length === 1 ? "enrolled client" : "enrolled clients"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">{clients.length} Total records</span>
              <button
                onClick={() => openAddClientModal()}
                className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Client</span>
              </button>
            </div>
          </div>

          {/* Card 2: Analyzed Monthly Revenue */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Monthly Practice Revenue
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-950">
                ${activeRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">From active retainers</span>
              <button
                onClick={() => setActiveTab("reports")}
                className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <BarChart3 className="w-3 h-3" />
                <span>View Report</span>
              </button>
            </div>
          </div>

          {/* Card 3: Candidate Intakes */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Candidate Intakes
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-950">
                {metrics?.totalLeads ?? leads.length}
              </span>
              <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {metrics?.statusCounts.new ?? 0} New
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                {metrics?.statusCounts.scheduled ?? 0} Scheduled
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium">
                {metrics?.statusCounts.enrolled ?? 0} Enrolled
              </span>
            </div>
          </div>

          {/* Card 4: Readers & PDF Downloads */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Readers &amp; Downloads
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-950">
                {metrics?.totalSubscribers ?? subscribers.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">verified subscribers</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500">Clinical guides</span>
              {subscribers.length > 0 && (
                <button
                  onClick={exportSubscribersCSV}
                  className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Export</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "clients"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <Users className="w-4 h-4 text-emerald-500" />
              <span>Clients Roster</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeTab === "clients" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-800"
                }`}
              >
                {clients.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "reports"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <span>Monthly Practice Report</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "leads"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Candidate Intakes</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeTab === "leads" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "subscribers"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Readers &amp; Downloads</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeTab === "subscribers" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {subscribers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Inquiries</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeTab === "inquiries" ? "bg-white/20 text-slate-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {inquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "resources"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200/80"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Practice Resources</span>
            </button>
          </div>

          {/* Quick tab action */}
          {activeTab === "clients" && (
            <div className="flex items-center gap-2">
              {clients.length > 0 && (
                <button
                  onClick={exportClientsCSV}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export Roster</span>
                </button>
              )}
              <button
                onClick={() => openAddClientModal()}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Client</span>
              </button>
            </div>
          )}

          {activeTab === "reports" && (
            <button
              onClick={exportMonthlyReportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Monthly Report (CSV)</span>
            </button>
          )}

          {activeTab === "leads" && leads.length > 0 && (
            <button
              onClick={exportLeadsCSV}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2 self-start sm:self-auto transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Export Leads CSV</span>
            </button>
          )}
        </div>

        {/* =========================================================
            TAB 1: CLIENTS ROSTER (REAL CLIENT MANAGEMENT)
           ========================================================= */}
        {activeTab === "clients" && (
          <div className="space-y-5">
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search clients by name, retainer, or clinical focus..."
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs font-sans"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: "all", label: "All Clients" },
                  { key: "active", label: "Active" },
                  { key: "paused", label: "Paused" },
                  { key: "completed", label: "Completed" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setClientStatusFilter(item.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize cursor-pointer ${
                      clientStatusFilter === item.key
                        ? "bg-slate-950 text-white font-semibold"
                        : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200/80"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clients Table */}
            {filteredClients.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-950">No clients in roster</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Click &ldquo;Add Client&rdquo; to manually enter your clients, their monthly retainers, and clinical focus. Your monthly reports will calculate automatically.
                </p>
                <button
                  onClick={() => openAddClientModal()}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Add First Client</span>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#FAF9F8] border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-5">Client Name</th>
                        <th className="py-3.5 px-4">Retainer Program</th>
                        <th className="py-3.5 px-4">Monthly Fee</th>
                        <th className="py-3.5 px-4">Primary Clinical Focus</th>
                        <th className="py-3.5 px-4">Delivery Mode</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredClients.map((client) => {
                        return (
                          <tr key={client.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5">
                              <div className="font-bold text-slate-950 text-sm">{client.name}</div>
                              {client.email && <div className="text-slate-500 text-xs mt-0.5">{client.email}</div>}
                              {client.phone && <div className="text-slate-400 text-[11px]">{client.phone}</div>}
                              <div className="text-slate-400 text-[10px] mt-0.5">
                                Started: {new Date(client.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 font-semibold text-[11px] border border-slate-200">
                                {client.retainer_program}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-emerald-700 text-sm">
                                ${Number(client.monthly_fee).toLocaleString()}
                                <span className="text-slate-400 text-[11px] font-normal"> /mo</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-slate-800 text-xs font-medium">
                                {client.primary_focus || "Metabolic Neuroplasticity"}
                              </span>
                              {client.clinical_notes && (
                                <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                                  {client.clinical_notes}
                                </p>
                              )}
                            </td>
                            <td className="py-4 px-4">
                              <span className="capitalize px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[11px]">
                                {client.delivery_mode || "virtual"}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                                  client.status === "active"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : client.status === "paused"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                }`}
                              >
                                ● {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openEditClientModal(client)}
                                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="Edit Client Details"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteClient(client.id, client.name)}
                                  className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors inline-flex items-center cursor-pointer shadow-2xs"
                                  title="Delete Client"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 2: MONTHLY PRACTICE REPORTS & AUTOMATED ANALYSIS
           ========================================================= */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            {/* Monthly Report Banner - Cleaned, NO green dot or overhead text */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} Practice Report
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                  Calculated automatically from your real enrolled clients and retainers. No manual guesswork.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right border-r border-slate-200 pr-5">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Monthly Revenue</div>
                  <div className="text-2xl font-bold text-emerald-700 tracking-tight">
                    ${activeRevenue.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={exportMonthlyReportCSV}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>

            {/* Analysis Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Active Client Roster
                </div>
                <div className="text-2xl font-bold text-slate-950">
                  {activeClients.length} <span className="text-xs font-normal text-slate-500">enrolled</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  {clients.length - activeClients.length} paused or completed
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Average Retainer per Client
                </div>
                <div className="text-2xl font-bold text-slate-950">
                  ${activeClients.length > 0 ? Math.round(activeRevenue / activeClients.length).toLocaleString() : "0"}
                  <span className="text-xs font-normal text-slate-500"> /mo</span>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  Across all active clinical contracts
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Annualized Run Rate
                </div>
                <div className="text-2xl font-bold text-emerald-700">
                  ${(activeRevenue * 12).toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  Projected 12-month retainer revenue
                </div>
              </div>
            </div>

            {/* Client Breakdown by Retainer Plan */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                Active Client Breakdown by Retainer Tier
              </h4>

              {activeClients.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No active clients enrolled. Add clients in the Roster tab to view the financial breakdown.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {["Signature Advisory Retainer", "Foundational Advisory Retainer", "Platinum Executive Retainer", "Custom Retainer"].map((tier) => {
                    const tierClients = activeClients.filter((c) => c.retainer_program === tier || (tier === "Custom Retainer" && !c.retainer_program.includes("Signature") && !c.retainer_program.includes("Foundational") && !c.retainer_program.includes("Platinum")));
                    const tierRevenue = tierClients.reduce((acc, c) => acc + (Number(c.monthly_fee) || 0), 0);

                    if (tierClients.length === 0) return null;

                    return (
                      <div key={tier} className="py-3.5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-950 text-sm">{tier}</div>
                          <div className="text-xs text-slate-500">
                            {tierClients.map((c) => c.name).join(", ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-700 text-sm">${tierRevenue.toLocaleString()} /mo</div>
                          <div className="text-xs text-slate-500">{tierClients.length} {tierClients.length === 1 ? "client" : "clients"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: CANDIDATE INTAKES (LEADS & 1-CLICK CONVERSION)
           ========================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search candidates by name, email, or goal..."
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs font-sans"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: "all", label: "All Candidates" },
                  { key: "new", label: "New" },
                  { key: "scheduled", label: "Scheduled" },
                  { key: "enrolled", label: "Enrolled" },
                  { key: "archived", label: "Archived" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setLeadStatusFilter(item.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize cursor-pointer ${
                      leadStatusFilter === item.key
                        ? "bg-slate-950 text-white font-semibold"
                        : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200/80"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs">
                <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600 font-semibold">No candidate intakes recorded yet.</p>
                <p className="text-xs text-slate-400 mt-1">Submissions from the 45-second assessment stream here instantly.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#FAF9F8] border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-5">Candidate</th>
                        <th className="py-3.5 px-4">Primary Focus</th>
                        <th className="py-3.5 px-4">Current Stall / Challenge</th>
                        <th className="py-3.5 px-4">Suggested Plan</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredLeads.map((lead) => {
                        const candidateName = lead.full_name || lead.name || "Candidate";
                        const domainName = lead.primary_domain || lead.domain || "Clinical Inquiry";
                        const gapName = lead.identified_gap || lead.gap || "General Readiness";
                        const retainerTier = lead.recommended_program || lead.recommended_retainer || lead.investment || "Signature Advisory Retainer";

                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5">
                              <div className="font-bold text-slate-950 text-sm">{candidateName}</div>
                              <div className="text-slate-500 text-xs mt-0.5">{lead.email}</div>
                              {lead.phone && <div className="text-slate-400 text-[11px]">{lead.phone}</div>}
                              <div className="text-slate-400 text-[10px] mt-0.5">
                                {new Date(lead.created_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium">
                                {domainName}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-slate-700 text-xs font-medium">
                                {gapName}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 font-semibold text-[11px] border border-slate-200">
                                {retainerTier}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border focus:outline-none cursor-pointer ${
                                  lead.status === "new"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : lead.status === "scheduled"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : lead.status === "enrolled"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                              >
                                <option value="new">● New Lead</option>
                                <option value="scheduled">● Scheduled</option>
                                <option value="enrolled">● Enrolled</option>
                                <option value="archived">● Archived</option>
                              </select>
                            </td>
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openAddClientModal(lead)}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="Enroll directly into Client Roster"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Enroll Client</span>
                                </button>
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="View Assessment"
                                >
                                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                                  <span>View</span>
                                </button>
                                <a
                                  href={`mailto:${lead.email}?subject=Liberty%20Science%20Consultation%20%E2%80%94%20Vera%20Shury%2C%20MS`}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                  title="Send Email"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>Email</span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 4: NEWSLETTER & DOWNLOADS
           ========================================================= */}
        {activeTab === "subscribers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-950">
                    Draft Practice Briefing
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Compose a clinical neuroplasticity briefing to all verified readers across your practice.
                </p>

                <form onSubmit={handleSendBroadcast} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject Line / Briefing Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Clinical Dispatch: Dopaminergic Protocols"
                      value={broadcastSubject}
                      onChange={(e) => setBroadcastSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 shadow-2xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Briefing Content
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Enter clinical insights, protocol updates, or habit reminders..."
                      value={broadcastContent}
                      onChange={(e) => setBroadcastContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 font-sans resize-none shadow-2xs"
                      required
                    />
                  </div>

                  {broadcastSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{broadcastSuccess}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={broadcastSending}
                    className="w-full py-3 px-4 bg-slate-950 hover:bg-slate-850 text-white font-semibold rounded-xl text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {broadcastSending ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>Sending Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        <span>Send Briefing ({subscribers.length} Readers)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950">Active Readers &amp; PDF Downloads</h3>
                  <p className="text-xs text-slate-500">Total {subscribers.length} verified email subscribers</p>
                </div>
                {subscribers.length > 0 && (
                  <button
                    onClick={exportSubscribersCSV}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" />
                    <span>Download CSV</span>
                  </button>
                )}
              </div>

              {subscribers.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-medium">No verified readers yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">Visitors who download your PDF guides will automatically appear here.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#FAF9F8] border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Reader</th>
                          <th className="py-3 px-4">Downloaded Resource</th>
                          <th className="py-3 px-4">Channel</th>
                          <th className="py-3 px-4 text-right">Subscribed Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {subscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4">
                              {sub.full_name && (
                                <div className="text-slate-900 font-semibold text-xs mb-0.5">
                                  {sub.full_name}
                                </div>
                              )}
                              <div className="text-slate-600 text-xs">{sub.email}</div>
                            </td>
                            <td className="py-3 px-4">
                              {sub.downloaded_resource ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium">
                                  <Download className="w-3 h-3 text-amber-700 shrink-0" />
                                  <span className="line-clamp-1">{sub.downloaded_resource}</span>
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[11px]">Direct Subscription</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-slate-500 capitalize text-xs">{sub.source || "Website"}</td>
                            <td className="py-3 px-4 text-right text-slate-400 text-[11px]">
                              {new Date(sub.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: DIRECT INQUIRIES
           ========================================================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-950">Patient Messages</h3>
                <p className="text-xs text-slate-500">Inquiries submitted via website contact form</p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600 font-semibold">No direct contact messages yet.</p>
                <p className="text-xs text-slate-400 mt-1">Direct inquiries through the contact form will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {inquiries.map((inq) => {
                  const inqName = inq.full_name || inq.name || "Inquirer";
                  return (
                    <div key={inq.id} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-3.5 shadow-xs font-sans">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-950">{inqName}</h4>
                          <div className="text-xs text-amber-800 font-medium">{inq.email}</div>
                          {inq.phone && <div className="text-[11px] text-slate-500">{inq.phone}</div>}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(inq.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {inq.subject && (
                        <div className="text-xs font-semibold text-slate-800 border-l-2 border-amber-600 pl-2.5">
                          {inq.subject}
                        </div>
                      )}

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="pt-1 flex items-center justify-end">
                        <a
                          href={`mailto:${inq.email}?subject=RE%3A%20${encodeURIComponent(inq.subject || "Liberty%20Science%20Inquiry")}`}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>Reply to Inquirer</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 6: PRACTICE RESOURCES & CLINICAL TOOLS
           ========================================================= */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-1">Meet Calendar</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Google appointment scheduling calendar where candidate intakes and consultations are booked.
                  </p>
                </div>
                <a
                  href="https://calendar.app.google/8Gt1wf6dzY3ki8xy7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Calendar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-1">Research Monograph</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    View the live metabolic neuroplasticity research paper and bibliography published for clinicians.
                  </p>
                </div>
                <Link
                  href="/research"
                  target="_blank"
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Monograph</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 mb-4">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-1">Evidence Brief (PDF)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    4-page publication PDF on cyclic metabolic switching and 12–14 hr fasting diet plans.
                  </p>
                </div>
                <a
                  href="/documents/Liberty_Science_Metabolic_Switching_Diet_Plan.pdf"
                  download="Liberty_Science_Metabolic_Switching_Diet_Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Download Brief</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 mb-1">6-Day Habit Plan (PDF)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Fillable patient worksheet: Day 0 ACE readiness check + 6-Day loop (Fuel + Move + Attention).
                  </p>
                </div>
                <a
                  href="/documents/Liberty_Science_6Day_Habit_Plan.pdf"
                  download="Liberty_Science_6Day_Habit_Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Download Worksheet</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Practice Credentials &amp; Overview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">HEALTHCARE TAXONOMY</div>
                  <div className="text-slate-950 font-bold text-sm mt-1">71400000X</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Specialized Clinical Exercise</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">HEADQUARTERS CLINIC</div>
                  <div className="text-slate-950 font-bold text-sm mt-1">Tucson, Arizona</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">On-Site or Virtual Worldwide</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">CHIEF CLINICIAN</div>
                  <div className="text-slate-950 font-bold text-sm mt-1">Vera Shury, MS</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">ACE Health Coach · PWR!Moves · HeartMath</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">PRACTICE STRUCTURE</div>
                  <div className="text-amber-800 font-bold text-sm mt-1">Tailored Client Retainers</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Private 1-on-1 Practice</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          ADD / EDIT CLIENT MODAL — INDUSTRY STANDARD PINNED LAYOUT
         ========================================================= */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs font-sans overflow-hidden">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Pinned Header — Clean, NO overhead badge */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {editingClientId ? "Edit Client Details" : "Add Practice Client"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Save client contact information, retainer tier, and clinical focus.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveClient} id="client-form" className="px-6 py-5 overflow-y-auto space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Client Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Robert Davis"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="(520) 555-0199"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Retainer Program
                  </label>
                  <select
                    value={clientProgram}
                    onChange={(e) => handleProgramSelect(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-medium cursor-pointer"
                  >
                    <option value="Signature Advisory Retainer">Signature Advisory Retainer ($2,400)</option>
                    <option value="Foundational Advisory Retainer">Foundational Advisory Retainer ($1,275)</option>
                    <option value="Platinum Executive Retainer">Platinum Executive Retainer ($4,800)</option>
                    <option value="Custom Retainer">Custom Retainer Agreement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Monthly Fee ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2400"
                    value={clientMonthlyFee}
                    onChange={(e) => setClientMonthlyFee(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-bold text-emerald-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Client Status
                  </label>
                  <select
                    value={clientStatus}
                    onChange={(e) => setClientStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-semibold cursor-pointer"
                  >
                    <option value="active">● Active</option>
                    <option value="paused">● Paused</option>
                    <option value="completed">● Completed</option>
                    <option value="archived">● Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Delivery Mode
                  </label>
                  <select
                    value={clientDeliveryMode}
                    onChange={(e) => setClientDeliveryMode(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-medium cursor-pointer"
                  >
                    <option value="virtual">Virtual Worldwide</option>
                    <option value="on-site">On-Site Tucson</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={clientStartDate}
                    onChange={(e) => setClientStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Primary Clinical Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metabolic Neuroplasticity &amp; PWR!Moves"
                  value={clientPrimaryFocus}
                  onChange={(e) => setClientPrimaryFocus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Private Clinical Notes &amp; Objectives
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. PWR!Moves 2x/wk, 14-hr intermittent fasting adaptation"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-slate-900 resize-none shadow-2xs"
                />
              </div>

              {clientMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                    clientMessage.isError
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {clientMessage.isError ? (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  )}
                  <span>{clientMessage.text}</span>
                </div>
              )}
            </form>

            {/* Pinned Footer — Always visible, never cut off */}
            <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-end gap-2.5 rounded-b-2xl shrink-0">
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="client-form"
                disabled={clientSaving}
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {clientSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{editingClientId ? "Save Changes" : "Enroll Client"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          CANDIDATE INTAKE DETAILS MODAL — PINNED CLEAN LAYOUT
         ========================================================= */}
      {selectedLead && (() => {
        const candidateName = selectedLead.full_name || selectedLead.name || "Candidate";
        const domainName = selectedLead.primary_domain || selectedLead.domain || "Clinical Inquiry";
        const gapName = selectedLead.identified_gap || selectedLead.gap || "General Readiness";
        const timelineName = selectedLead.priority_stage || selectedLead.timeline || "Within 14–30 Days";
        const retainerTier = selectedLead.recommended_program || selectedLead.recommended_retainer || selectedLead.investment || "Signature Advisory Retainer";
        const notesContent = selectedLead.note || selectedLead.notes || "";

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs font-sans overflow-hidden">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Pinned Header — Clean, NO overhead badge */}
              <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    {candidateName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Submitted: {new Date(selectedLead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Contact Email</div>
                    <div className="text-amber-900 font-semibold select-all text-xs">{selectedLead.email}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Phone Number</div>
                    <div className="text-slate-900 select-all text-xs">{selectedLead.phone || "Not provided"}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Primary Focus</div>
                    <div className="text-slate-900 font-semibold">{domainName}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Current Stall / Challenge</div>
                    <div className="text-amber-900 font-semibold">{gapName}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Target Timeline</div>
                    <div className="text-slate-900 font-semibold">{timelineName}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Suggested Retainer</div>
                    <div className="text-emerald-800 font-bold">{retainerTier}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">Chief Desired Goal</div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {selectedLead.desired_outcome || "No outcome details provided"}
                  </p>
                </div>

                {notesContent && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-[10px] uppercase text-slate-400 font-semibold">Candidate Notes / History</div>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {notesContent}
                    </p>
                  </div>
                )}
              </div>

              {/* Pinned Footer */}
              <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-b-2xl shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="new">● New Lead</option>
                    <option value="scheduled">● Consultation Scheduled</option>
                    <option value="enrolled">● Enrolled Retainer</option>
                    <option value="archived">● Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedLead(null);
                      openAddClientModal(selectedLead);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enroll as Client</span>
                  </button>
                  <a
                    href={`mailto:${selectedLead.email}?subject=Liberty%20Science%20Consultation%20%E2%80%94%20Vera%20Shury%2C%20MS`}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>Email</span>
                  </a>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
