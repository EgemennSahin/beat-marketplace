"use client";

// components/BeatUploadForm.tsx
import { useState } from "react";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

    // Get user id
    const { data: userData } = await supabase.auth.getSession();
    const user_id = userData.session?.user.id;

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
    router.push("/dashboard");
  };

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <div className="flex flex-col">
            <label className="block text-sm mb-2" htmlFor="file">
              Dosya Yükle
            </label>

            <input
              type="file"
              id="file"
              accept=".mp3,.wav"
              onChange={handleFileChange}
              required
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <button
              className="btn btn-primary mt-4 place-self-end"
              onClick={() => setStage(2)}
              disabled={!file}
            >
              İlerle
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ad</span>
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

              <label className="label mt-8">
                <span className="label-text">Fiyat</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  id="price"
                  className="input input-bordered w-full"
                  value={price}
                  min={0}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  required
                />
                <span>TL</span>
              </label>

              <label className="label mt-8">
                <span className="label-text">Kapak Fotoğrafı</span>
              </label>
              <input
                type="file"
                id="image"
                accept=".png,.jpg,.jpeg"
                onChange={handleImageChange}
                required
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            <button
              className="btn btn-primary mt-4 place-self-end"
              onClick={() => setStage(3)}
              disabled={!name || !price || !image}
            >
              İlerle
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <div className="avatar">
              <div className="w-64 rounded-md">
                <Image
                  alt="Kapak Fotoğrafı"
                  src={URL.createObjectURL(image!)}
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <p>Ad</p>
              <p className="font-bold">{name}</p>
            </div>
            <div className="flex justify-between">
              <p>Fiyat</p>
              <p className="font-bold">{price.toFixed(2)} TL</p>
            </div>

            <audio controls className="w-full max-w-xs">
              <source src={URL.createObjectURL(file!)} />
            </audio>

            <button
              className="btn btn-primary mt-4 place-self-end"
              onClick={handleUpload}
            >
              Yükle
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ul className="steps mb-12">
        <li className={`step w-64 ${stage >= 1 ? "step-primary" : ""}`}>
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
