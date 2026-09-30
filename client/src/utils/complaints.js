export const COMPLAINTS_STORAGE_KEY = "smartCampusComplaints";

export const DEFAULT_COMPLAINTS = [
    {
        id: "CMP-1001",
        title: "Wi-Fi not working in hostel",
        category: "Wi-Fi / Internet",
        location: "Hostel Block A",
        date: "15 Sep 2026",
        priority: "High",
        status: "In Progress",
        department: "IT Department",
        description: "The internet connection in the hostel is intermittently dropping during evening hours."
    },
    {
        id: "CMP-1002",
        title: "Water leakage in bathroom",
        category: "Water Supply",
        location: "Hostel Block B",
        date: "12 Sep 2026",
        priority: "Critical",
        status: "Submitted",
        department: "Infrastructure",
        description: "There is a major leak near the bathroom pipe causing water pooling."
    },
    {
        id: "CMP-1003",
        title: "Classroom fan not working",
        category: "Electrical",
        location: "Block C - Room 204",
        date: "10 Sep 2026",
        priority: "Medium",
        status: "Resolved",
        department: "Electrical",
        description: "The classroom fan stopped working during a lecture and needs inspection."
    },
    {
        id: "CMP-1004",
        title: "Cleaning required in hostel corridor",
        category: "Cleanliness",
        location: "Hostel Block A",
        date: "08 Sep 2026",
        priority: "Low",
        status: "Closed",
        department: "Hostel",
        description: "The corridor is not cleaned regularly and has accumulated dust."
    },
    {
        id: "CMP-1005",
        title: "Bus timing issue",
        category: "Transport",
        location: "Main Gate",
        date: "05 Sep 2026",
        priority: "Medium",
        status: "Under Review",
        department: "Transport",
        description: "Students are facing irregular bus arrival times in the evening."
    }
];

export function getComplaints() {
    try {
        const saved = localStorage.getItem(COMPLAINTS_STORAGE_KEY);

        if (!saved) {
            localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
            return [...DEFAULT_COMPLAINTS];
        }

        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_COMPLAINTS];
    } catch {
        localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(DEFAULT_COMPLAINTS));
        return [...DEFAULT_COMPLAINTS];
    }
}

export function addComplaint(complaint) {
    const current = getComplaints();
    const next = [complaint, ...current];
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(next));
    return next;
}