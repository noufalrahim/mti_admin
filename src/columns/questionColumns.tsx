import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { QuestionType } from "@/types";

export const questionColumn: ColumnDef<QuestionType>[] = [
    {
        id: "sno",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "questionEnglish",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Question (English)
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.questionEnglish}</div>,
    },
    {
        accessorKey: "questionMalayalam",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Question (Malayalam)
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.questionMalayalam}</div>,
    },
    {
        accessorKey: "ageGroup",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Age Group
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{`${row.original.ageGroup.startAge} - ${row.original.ageGroup.endAge}`}</div>,
    },
    {
        accessorKey: "severity",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Severity
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.severity}</div>,
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Category
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.category.name}</div>,
    },
];
