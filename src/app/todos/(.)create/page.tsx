"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTodoForm from "../_components/CreateTodoForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateTodo = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        router.back();
      }}
    >
      <DialogContent className="h-[60svh] w-auto">
        <CreateTodoForm />
      </DialogContent>
    </Dialog>
  );
};
export default CreateTodo;
