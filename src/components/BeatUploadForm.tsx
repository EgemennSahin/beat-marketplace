"use client";

// components/BeatUploadForm.tsx
import { useState } from "react";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "next/navigation";

export default function BeatUploadForm() {
  const router = useRouter();
  const supabase = useSupabase();
  const [stage, setStage] = useState(1);

  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Upload beat and image to storage and insert beat data into the database
  const handleUpload = async () => {
    if (!file || !image) return;

    console.log("Uploading beat and image...");

    // Get user id
    const user_id = (await supabase.auth.getUser()).data.user?.id;

    if (!user_id) {
      console.error("Error: user id not found");
      return;
    }

    // Insert beat data into the database
    const { data, error } = await supabase
      .from("beats")
      .insert([
        {
          name,
          price,
          user_id,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting beat data: ", error);
      return;
    }

    if (!data || data.length === 0) {
      console.error("Error: no data returned from database");
      return;
    }

    const beatId = data[0].id;

    // Upload beat file to storage
    const beatPath = `${user_id}/${beatId}/beat`;

    console.log("Path:", beatPath);
    const { error: beatError } = await supabase.storage
      .from("beats")
      .upload(beatPath, file);

    if (beatError) {
      console.error("Error uploading beat file: ", beatError);
      return;
    }

    // Upload cover image to storage
    const imagePath = `${user_id}/${beatId}/image`;
    const { error: imageError } = await supabase.storage
      .from("beats")
      .upload(imagePath, image);

    if (imageError) {
      console.error("Error uploading image: ", imageError);
      return;
    }

    // Redirect to another page (e.g., homepage) after successful upload
    router.push("/");
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <div>
            <label className="block text-sm mb-2" htmlFor="file">
              Upload Beat (MP3/WAV)
            </label>
            <input
              type="file"
              id="file"
              accept=".mp3,.wav"
              onChange={handleFileChange}
              required
            />
            <button
              className="btn btn-primary mt-4"
              onClick={() => setStage(2)}
              disabled={!file}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered"
              value={name}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block text-sm mb-2 mt-4" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="input input-bordered"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />

            <label className="block text-sm mb-2 mt-4" htmlFor="image">
              Upload Cover Image (PNG/JPG)
            </label>
            <input
              type="file"
              id="image"
              accept=".png,.jpg,.jpeg"
              onChange={handleImageChange}
              required
            />

            <button
              className="btn btn-primary mt-4"
              onClick={() => setStage(3)}
              disabled={!name || !price || !image}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold">Review</h2>
            <p>Name: {name}</p>
            <p>Price: ${price.toFixed(2)}</p>
            <p>
              Beat File: {file?.name} ({(file?.size || 0) / 1000} KB)
            </p>
            <p>
              Image File: {image?.name} ({(image?.size || 0) / 1000} KB)
            </p>
            <button className="btn btn-primary mt-4" onClick={handleUpload}>
              Upload
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ul className="steps mb-4">
        <li className={`step ${stage >= 1 ? "step-primary" : ""}`}>
          Beat Yükle
        </li>
        <li className={`step ${stage >= 2 ? "step-primary" : ""}`}>
          Bilgi Gir
        </li>
        <li className={`step ${stage >= 3 ? "step-primary" : ""}`}>
          Gözden Geçir
        </li>
      </ul>
      {renderStage()}
    </div>
  );
}
