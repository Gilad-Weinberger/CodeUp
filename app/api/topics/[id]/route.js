import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

// GET: Retrieve a single topic
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const docRef = doc(db, "topics", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update a topic by id
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const docRef = doc(db, "topics", id);
    await updateDoc(docRef, body);
    return NextResponse.json({ message: "Topic updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a topic by id
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const docRef = doc(db, "topics", id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "Topic deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
