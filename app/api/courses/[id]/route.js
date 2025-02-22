import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const courseDocRef = doc(db, "courses", id);
    const courseSnap = await getDoc(courseDocRef);
    if (!courseSnap.exists()) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const data = courseSnap.data();

    // Retrieve the topic name using the topicId
    let topicName = null;
    if (data.topicId) {
      const topicRef = doc(db, "topics", data.topicId);
      const topicSnap = await getDoc(topicRef);
      if (topicSnap.exists()) {
        topicName = topicSnap.data().name;
      }
    }

    const course = {
      id,
      createdAt: data.createdAt,
      description: data.description,
      name: data.name,
      topic: {
        id: data.topicId,
        name: topicName,
      },
    };

    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    // Body can include any fields to update e.g. name, description, topicId
    const courseDocRef = doc(db, "courses", id);
    await updateDoc(courseDocRef, body);
    return NextResponse.json({ message: "Course updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const courseDocRef = doc(db, "courses", id);
    console.log("courseDocRef", courseDocRef);
    await deleteDoc(courseDocRef);
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
