"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteTodo from "./todos/_components/DeleteTodo";
import ModifyTodo from "./todos/_components/ModifyTodo";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Home = () => {
  const todos = useQuery(api.todos.getTodos, {});
  return (
    <div className="container flex flex-col h-svh ">
      <div className="flex items-center justify-between h-20">
        <h1 className="text-xl font-bold leading-9 tracking-wide">Todos</h1>
        <Link href={"/todos/create"}>
          <Button>Create Todo</Button>
        </Link>
      </div>
      <hr />
      <div className="flex-1 flex flex-col overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos?.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell className="capitalize">{todo.text}</TableCell>
                <TableCell>{format(new Date(todo.date), "PPP")}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "flex items-center justify-center w-[7rem] py-1 capitalize font-medium rounded-full",
                      {
                        "bg-green-200 text-green-600":
                          todo.status === "completed",
                        "bg-yellow-200 text-yellow-600":
                          todo.status === "pending",
                      }
                    )}
                  >
                    {todo.status}
                  </span>
                </TableCell>
                <TableCell className="w-[200px] flex items-center justify-center gap-4">
                  <ModifyTodo todo={todo} />
                  <DeleteTodo todoId={todo._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Home;
