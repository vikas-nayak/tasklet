import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskId = Number(params.id);
    const { title, description, priority, dueDate } = await req.json();

    const updatedTask = await db
      .update(tasks)
      .set({ title, description, priority, dueDate })
      .where(eq(tasks.id, taskId))
      .returning();

    return NextResponse.json({ task: updatedTask[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const taskId = Number(params.id);

    await db
      .delete(tasks)
      .where(eq(tasks.id, taskId));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}