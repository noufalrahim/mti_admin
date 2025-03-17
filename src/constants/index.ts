import { NavItemsType } from "@/types";
import { Url } from "@/types/enums";
import { BabyIcon, Boxes, Home, ListOrdered, MessageCircleCode, Users } from "lucide-react";

export const adminNavItems: NavItemsType[] = [
    {
        title: "Home",
        url: Url.home,
        icon: Home,
    },
    {
        title: "All Users",
        url: Url.users,
        icon: Users
    },
    {
        title: "Infants Need Care",
        url: Url.infantsNeedCare,
        icon: BabyIcon
    },
    {
        title: "Categories",
        url: Url.categories,
        icon: Boxes
    },
    {
        title: "Questions",
        url: Url.questions,
        icon: MessageCircleCode
    },
    {
        title: "Age Groups",
        url: Url.ageGroups,
        icon: ListOrdered
    }

];

export const severityData = [
    { label: "Very Low", color: "bg-green-500", bg: "hover:bg-green-600" },
    { label: "Low", color: "bg-lime-500", bg: "hover:bg-lime-600" },
    { label: "Moderate Low", color: "bg-yellow-400", bg: "hover:bg-yellow-500" },
    { label: "Moderate", color: "bg-yellow-500", bg: "hover:bg-yellow-600" },
    { label: "Moderate High", color: "bg-amber-500", bg: "hover:bg-amber-600" },
    { label: "High", color: "bg-orange-500", bg: "hover:bg-orange-600" },
    { label: "Very High", color: "bg-orange-600", bg: "hover:bg-orange-700" },
    { label: "Severe", color: "bg-red-500", bg: "hover:bg-red-600" },
    { label: "Critical", color: "bg-red-700", bg: "hover:bg-red-800" },
    { label: "Extreme", color: "bg-red-800", bg: "hover:bg-red-900" }
];
