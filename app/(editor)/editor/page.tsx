import Editor from "@/components/editor";
import { Metadata } from "next";

export const metadata = {
  title: "Editor",
} satisfies Metadata;

export default function EditorPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full text-center">
      Editor Page
      <Editor />
    </div>
  );
}
