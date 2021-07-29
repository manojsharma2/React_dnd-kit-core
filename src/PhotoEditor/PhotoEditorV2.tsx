import React, { useRef, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Slider } from "@material-ui/core";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export const ImageManipulation = (
  brightness: any,
  contrast: any,
  colorSaturation: any,
  rotate: any,
  cropRegion: any,
  image: any
) => {
  let $ratio: number = 1;
  let $brightness: number = 0;
  let $contrast: number = 0;
  let $rotate: number = 0;
  let $colorSaturation: number = 0;
  let $cropRegion: any = null;
  let $image = null;

  // Set internally.
  let $origImgCanvas: HTMLCanvasElement | null = null;
  let $origImgCtx: any | null = null;
  let $isDirty = false; // Flags if values have changed and a process run is needed.

  if (null !== brightness) $brightness = brightness;

  if (null !== contrast) $contrast = contrast;

  if (null !== colorSaturation) $colorSaturation = colorSaturation;

  if (null !== rotate) $rotate = rotate;

  //   if (null != cropRegion) this.cropRegion = cropRegion;
    const setImage = (
      image: any,
      targetWidth: number = 0,
      targetHeight: number = 0, 
    ) => {
      // Save the image.
      $image = image;

      // New image so reset any filters.
      $brightness = 0;
      $contrast = 0;
      $colorSaturation = 0;
      $rotate = 0;
      $cropRegion = null;

      // The canvas the user sees may be smaller then the source image data.
      // We need to resize. Maintain aspect ration.
      $ratio = Math.min(
        targetWidth / $image.width,
        targetHeight / $image.height
      );

      // Called to set a new source image for this instance to work off.
      if (null === $origImgCanvas) {
        // First time here. Create one.
        $origImgCanvas = document.createElement("canvas");
        $origImgCtx = $origImgCanvas.getContext("2d");
      }

      // Clear out our in memory canvas.
      $origImgCtx.clearRect(0, 0, $origImgCanvas.width, $origImgCanvas.height);
      // Store the image into a canvas.
      $origImgCanvas.width = $image.width * $ratio;
        $origImgCanvas.height = $image.height * $ratio;
                console.log($origImgCtx, $image, $image.width);
        $origImgCtx.drawImage(image, 0, 0);
        $origImgCtx.drawImage(
          $image,
          0,
          0,
          $image.width,
          $image.height,
          0,
          0,
          $origImgCanvas.width,
          $origImgCanvas.height
        );
    };
    console.log("image", image);
    if (null != image) setImage(image);

    const adjustPixels = (useCropRegion?: boolean) => {
    //   if (!useCropRegion) useCropRegion = true;

      // Was a rectangle provided for getting image data pixels?
      var rect = null;
      if (useCropRegion) rect = $cropRegion;

      // Ensure we have a rectangle in the canvas to use.
      if (null === rect && $origImgCanvas) {
        // Default to the entire image.
        rect = {
          x: 0,
          y: 0,
          width: $origImgCanvas.width,
          height: $origImgCanvas.height,
        };
      }

      var imageData = $origImgCtx.getImageData(
        rect.x,
        rect.y,
        rect.width,
        rect.height
      );

      var d = imageData.data;
      var rgb = {
        r: null,
        g: null,
        b: null,
      };

      // Loop through the pixels. RGBA
      for (var i = 0; i < d.length; i += 4) {
        // Get the RGB values of this pixel.
        rgb.r = d[i];
        rgb.g = d[i + 1];
        rgb.b = d[i + 2];

        // Is there brightness adjustments?
        if ($brightness !== 0)
          adjustPixelBrightness(rgb, $brightness);

        // // Is there contrast adjustments?
        // if (this.contrast != 0) this.adjustPixelContrast(rgb, this.contrast);

        // // Is there contrast adjustments?
        // if (this.colorSaturation != 0)
        //   this.adjustPixelColorSaturation(rgb, this.colorSaturation);

        // Set the new values.
        d[i] = rgb.r;
        d[i + 1] = rgb.g;
        d[i + 2] = rgb.b;
      }

      // Flag the pixels have been updated.
      $isDirty = false;

      return imageData;
    };
    const adjustPixelBrightness = function (rgb: any, adjustment: any) {
      // Simply add to the colors current value.
      rgb.r += adjustment;
      rgb.g += adjustment;
      rgb.b += adjustment;
    };
    adjustPixels();
};


export default function PhotoEditorV2() {
  const [crop, setCrop] = useState<any>({ aspect: 16 / 9 });
  // const [original, setOriginal] = useState<any>({ width: 0, height: 0 });;
  const [imgSrc, setImgSrc] = useState<any>(
    "https://picsum.photos/1920/1080?random=1"
  );
  const imagePreviewCanvasRef = useRef(null);
  const imageRef = useRef(null);

  const onChangeSlider = (
    event: any,
    imageRef: any,
    value: number | number[]
  ) => {
    // if (imageRef) {
    // //   console.log("imageRef", imageRef);
    // //   imageRef.current.style.filter = `brightness(${value}%)`;
    // }
    // console.log("event>>", event, "||||", "value>>", value);
    event.preventDefault();
    ImageManipulation(value, null, null, null, null, imageRef);
  };
  const onSaturateChange = (event: any, imageRef: any, value: any) => {
    if (imageRef) {
      imageRef.current.style.filter = `saturate(${value / 10})`;
    }
  };
  const onContrastChange = (event: any, imageRef: any, value: any) => {
    if (imageRef) {
      imageRef.current.style.filter = `contrast(${value / 10})`;
    }
  };

  return (
    <div
      style={{
        width: 1024,
        marginInline: "auto",
      }}
    >
      <div id="editCanvasContainer">
        <img ref={imageRef} src={imgSrc} alt="sdas" />
        {/* <canvas ref={imagePreviewCanvasRef} id="editCanvas"></canvas> */}
      </div>
      <br />
      Brightness
      <br />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
        onChange={(event: object, value: any) => {
          onChangeSlider(event, imageRef.current, value);
        }}
      />
      <br />
      Saturate
      <br />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="Saturate"
        defaultValue={20}
        onChange={(event: object, value: number | number[]) => {
          onSaturateChange(event, imagePreviewCanvasRef, value);
        }}
      />
      <br />
      contrast(0.5)
      <br />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="Saturate"
        defaultValue={20}
        onChange={(event: object, value: number | number[]) => {
          onContrastChange(event, imagePreviewCanvasRef, value);
        }}
      />
      {/* <button
        onClick={(event: any) => {
          event.preventDefault();
          onRotate(imagePreviewCanvasRef.current, 45);
        }}
      >
        rotate 45
      </button> */}
    </div>
  );
}
