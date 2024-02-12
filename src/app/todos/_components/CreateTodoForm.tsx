"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

const CreateTodoForm = () => {
  const [state, setState] = useState({
    text: "",
    date: new Date(),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createTodo = useMutation(api.todos.createTodo);
  return (
    <div className="space-y-4 w-[400px] h-max border px-4 py-10 rounded">
      <div>
        <h1 className="text-xl font-semibold">Create Todo</h1>
        <p className="text-sm">* indicates are required</p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await createTodo({
            text: state.text,
            date: new Date(state.date).toISOString(),
            status: "pending",
          });
          setLoading(false);
          setState({ text: "", date: new Date() });
          router.push("/");
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
              date={state.date}
              setDate={(date) => {
                setState({
                  ...state,
                  date,
                });
              }}
            />
          </div>
          <Button disabled={loading}>{loading ? "Creating" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
};
export default CreateTodoForm;
