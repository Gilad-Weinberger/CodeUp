import { NextResponse } from "next/server";
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function GET() {
  try {
    const coursesSnapshot = await getDocs(collection(db, "courses"));
    const courses = await Promise.all(
      coursesSnapshot.docs.map(async (courseDoc) => {
        const data = courseDoc.data();
        let topicName = null;
        if (data.topicId) {
          const topicRef = doc(db, "topics", data.topicId);
          const topicSnap = await getDoc(topicRef);
          if (topicSnap.exists()) {
            topicName = topicSnap.data().name;
          }
        }
        return {
          id: courseDoc.id,
          createdAt: data.createdAt,
          description: data.description,
          name: data.name,
          topic: {
            id: data.topicId,
            name: topicName,
          },
        };
      }),
    );
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, topicId } = body;

    if (!topicId) {
      return NextResponse.json(
        { error: "topicId is required." },
        { status: 400 },
      );
    }

    const courseData = {
      name,
      description,
      topicId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "courses"), courseData);
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
