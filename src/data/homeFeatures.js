import {
  LayoutDashboard,
  Search,
  Columns3,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

const homeFeatures = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Genel durumunu tek bakışta gör.",
    icon: LayoutDashboard,
  },
  {
    id: "search-filter",
    title: "Arama & Filtre",
    description: "Şirkete veya duruma göre süz.",
    icon: Search,
  },
  {
    id: "kanban-board",
    title: "Kanban Board",
    description: "Aşamalar arasında sürükle bırak.",
    icon: Columns3,
  },
  {
    id: "statistics",
    title: "İstatistikler",
    description: "Başvuru performansını ölç.",
    icon: ChartNoAxesColumnIncreasing,
  },
];

export default homeFeatures;