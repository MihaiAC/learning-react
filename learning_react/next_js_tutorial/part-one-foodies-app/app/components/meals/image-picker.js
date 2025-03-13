"use client";

import Image from "next/image";
import cssClasses from "./image-picker.module.css";
import { useRef, useState } from "react";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const inputRef = useRef();

  function handlePickClick() {
    inputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={cssClasses.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={cssClasses.controls}>
        <div className={cssClasses.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image picked by the user" fill />
          )}
        </div>
        <input
          ref={inputRef}
          class={cssClasses.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
        />
        <button
          className={cssClasses.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
