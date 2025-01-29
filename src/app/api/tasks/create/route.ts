import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { tasks } from "../../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { title, description, priority, dueDate, userId } = await req.json(); // Parse the JSON body

    const newTask = await db.insert(tasks).values({
      title,
      description,
      priority,
      dueDate,
      userId,
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

