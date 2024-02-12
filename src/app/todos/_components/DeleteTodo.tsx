"use client";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteTodo = ({ todoId }: { todoId: string }) => {
  const [open, setOpen] = useState(false);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this todo?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={"outline"}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteTodo({ todoId });
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteTodo;
