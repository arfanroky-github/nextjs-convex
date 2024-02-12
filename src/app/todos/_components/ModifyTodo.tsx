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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ModifyTodo = ({
  todo,
}: {
  todo: {
    _id: string;
    text: string;
    date: string;
    status: string;
  };
}) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(todo);
  const modifyTodo = useMutation(api.todos.modifyTodo);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Modify</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify Todo</DialogTitle>
        </DialogHeader>
        <DialogDescription>Modify this todo</DialogDescription>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await modifyTodo({
              todoId: todo._id,
              text: state.text,
              date: new Date(state.date).toISOString(),
              status: state.status,
            });
            setState(todo);
            setOpen(false);
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Titile</Label>
              <Input
                id="text"
                value={state["text"]}
                onChange={(e) => setState({ ...state, text: e.target.value })}
                placeholder="Enter a title"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <DatePicker
                date={new Date(state.date)}
                setDate={(date) => {
                  setState({
                    ...state,
                    date: new Date(date).toISOString(),
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => setState({ ...state, status: value })}
                value={state.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ModifyTodo;
