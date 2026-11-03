import MockDetail from "./MockDetail";
import { CountdownBoard, PlaylistBoard } from "./CountdownPlaylist";
import { YouTubeApiSettings } from "./YouTubeApiSettings";
import {
  captureSnapshot,
  listSnapshots,
  restoreSnapshot,
  downloadSnapshot,
  requestPersistentStorage,
  isStoragePersistent,
} from "./autoBackup";
import AnalyticsPlus from "./AnalyticsPlus";
import { ExamManager } from "./ExamManager";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { create } from "zustand";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  CalendarDays,
  ListVideo,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  Download,
  ArrowUpRight,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  db,
  exportBackup,
  importBackup,
  type Mock,
  type Exam,
  type Playlist,
  type SectionResult,
  type CustomExamProfile,
} from "./db";
import "./style.css";
type View =
  | "Analytics"
  | "Add Mock"
  | "Mock History"
  | "Exam Countdown"
  | "Study Playlist"
  | "Settings";
const icons = [
  LayoutDashboard,
  PlusCircle,
  History,
  CalendarDays,
  ListVideo,
  Settings,
];
const views: View[] = [
  "Analytics",
  "Add Mock",
  "Mock History",
  "Exam Countdown",
  "Study Playlist",
  "Settings",
];
const subjects: string[] = [];
const useUI = create<{
  view: View;
  theme: "dark" | "light";
  compact: boolean;
  exam: string;
  setExam: (v: string) => void;
  setView: (v: View) => void;
  toggleTheme: () => void;
  toggleCompact: () => void;
}>((set) => ({
  view:
    views.find((v) => v === localStorage.getItem("aa_v2_clean_view")) ??
    "Analytics",
  theme:
    localStorage.getItem("aa_v2_clean_theme") === "light" ? "light" : "dark",
  compact: localStorage.getItem("aa_v2_clean_compact") === "true",
  exam: localStorage.getItem("aa_v2_clean_exam") || "",
  setExam: (exam) => {
    localStorage.setItem("aa_v2_clean_exam", exam);
