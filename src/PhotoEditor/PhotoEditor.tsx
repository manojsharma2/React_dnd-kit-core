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

export default function PhotoEditor() {
  const [crop, setCrop] = useState<any>({ aspect: 16 / 9 });
  // const [original, setOriginal] = useState<any>({ width: 0, height: 0 });;
  const imgSrc = "https://picsum.photos/1920/1080?random=1";
  const imagePreviewCanvasRef = useRef(null);
  const imageRef = useRef(null);
  // const image64toCanvasRef = (
  //   canvasRef: any,
  //   // image64: any,
  //   // pixelCrop: any,
  //   inputImage: any,
  //   value: number | number[]
  // ) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   // const scaleX = inputImage.naturalWidth / inputImage.width;
  //   // const scaleY = inputImage.naturalHeight / inputImage.height;
  //   // console.log(canvas);
  //   canvas.width = inputImage.width;
  //   canvas.height = inputImage.height;
  //   const image = new Image(inputImage.width, inputImage.height);
  //   // console.log("inputImage", inputImage);
  //   image.src = inputImage.src;
  //   // image.width = inputImage.width;
  //   // image.height = inputImage.height;
  //   image.style.filter = `brightness(${value}%)`;
  //   image.onload = function () {
  //     ctx && ctx.drawImage(image, 0, 0);
  //   };
  // };
  // Base64 Image to Canvas with a Crop
  function image64toCanvasRef(
    canvasRef: any,
    image64: any,
    pixelCrop: any,
    inputImage: any
  ) {
    const canvas = canvasRef; // document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    const scaleX = inputImage.naturalWidth / inputImage.width;
    const scaleY = inputImage.naturalHeight / inputImage.height;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const image = new Image();
    image.src = imgSrc;
    image.crossOrigin = "Anonymous";
    image.onload = function () {
      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    };
  }
  const handleOnCropComplete = async (crope: any, pixelCrop: any) => {
    // console.log("pixelCrop", pixelCrop);
    const canvasRef = imagePreviewCanvasRef.current;
    image64toCanvasRef(canvasRef, imgSrc, crope, imageRef.current);
  };
  const handleImageLoaded = (image: any) => {
    // console.log(image.width, "image");
    imageRef.current = image;
  };
  const handleOnCropChange = (crop: any) => {
    setCrop(crop);
  };
  const onChangeSlider = (
    event: any,
    imageRef: any,
    value: any,
    imageRefNew: any
  ) => {
    // if (imageRef) {
    //   console.log("imageRef", imageRef);
    //   imageRef.current.style.filter = `brightness(${value}%)`;
    // }
    // console.log("event>>", event, "||||", "value>>", value);
    adjustPixels(value, 0, imageRef.current, imageRefNew);

  };
  const onSaturateChange = (
    event: any,
    imageRef: any,
    value: any,
  ) => {
    if (imageRef) {
      imageRef.current.style.filter = `saturate(${value / 10})`;
    }
  };
  const onContrastChange = (
    event: any,
    imageRef: any,
    value: any,
    imageRefNew: any
  ) => {
    if (imageRef) {
      imageRef.current.style.filter = `contrast(${value / 10})`;
    }
    adjustPixels(0, value, imageRef.current, imageRefNew);
  };
  const onRotate = (srcCanvas: any, degrees: number) => {
    // Create a copy of the canvas.
    const canvasCopy: HTMLCanvasElement = document.createElement("canvas");
    const copyContext = canvasCopy.getContext("2d");
    canvasCopy.width = srcCanvas.width;
    canvasCopy.height = srcCanvas.height;
    // console.log("copyContext", copyContext, "canvasCopy", canvasCopy);
    if (copyContext) {
      copyContext.drawImage(srcCanvas, 0, 0);
    }

    let angle, ctx, height, to_radians, width, x, y;
    angle = degrees % 360;

    to_radians = Math.PI / 180;
    if (angle === 90 || angle === -270 || angle === 270 || angle === -90) {
      width = canvasCopy.height;
      height = canvasCopy.width;
      x = width / 2;
      y = height / 2;
    } else if (angle === 180 || angle === -180) {
      width = canvasCopy.width;
      height = canvasCopy.height;
      x = width / 2;
      y = height / 2;
    } else {
      width = Math.sqrt(
        Math.pow(canvasCopy.width, 2) + Math.pow(canvasCopy.height, 2)
      );
      height = width;
      x = srcCanvas.height / 2;
      y = srcCanvas.width / 2;
    }

    srcCanvas.width = width;
    srcCanvas.height = height;

    ctx = srcCanvas.getContext("2d");
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * to_radians);
    ctx.drawImage(
      canvasCopy,
      -canvasCopy.width / 2,
      -canvasCopy.height / 2,
      canvasCopy.width,
      canvasCopy.height
    );
    ctx.restore();
  };

    const adjustPixels = (
      $brightness: number,
      $contrast: number,
      $origImgCanvas: HTMLCanvasElement,
      image: any
    ) => {
      let $origImgCtx;
      // console.log("$origImgCanvas", $origImgCanvas);
      if ($origImgCanvas) $origImgCtx = $origImgCanvas.getContext("2d");
      //   if (!useCropRegion) useCropRegion = true;
      // Was a rectangle provided for getting image data pixels?
      let rect: any = null;
      // if (useCropRegion) rect = $cropRegion;

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
      let imageData;
      let d: any;
      // let image = new Image();
      // image.src = iakImg.src;

      // image.onload = function () {
      //   ctx.drawImage(image, 0, 0);
      //   var data = ctx.getImageData(0, 0, 600, 400);
      // };

      if ($origImgCtx) {
        $origImgCtx.drawImage(image.current, 0, 0);
        imageData = $origImgCtx.getImageData(
          rect.x,
          rect.y,
          rect.width,
          rect.height
        );
        d = imageData.data;
      }

      // var rgb: any = {
      //   r: null,
      //   g: null,
      //   b: null,
      // };

      // Loop through the pixels. RGBA
      console.log("d.length", d.length);
      console.log("imageData", imageData);
      if ($brightness !== 0) {
        for (var i = 0; i < d.length; i += 4) {
          // Get the RGB values of this pixel.
          // rgb.r = d[i];
          // rgb.g = d[i + 1];
          // rgb.b = d[i + 2];

          // Is there brightness adjustments?
          // if ($brightness !== 0) {
          d[i] += 255 * ($brightness / 100);
          d[i + 1] += 255 * ($brightness / 100);
          d[i + 2] += 255 * ($brightness / 100);
          // adjustPixelBrightness(rgb, $brightness);
          // }

          // // Is there contrast adjustments?
          // if ($contrast !== 0) applyContrast(rgb, $contrast);

          // // Is there contrast adjustments?
          // if (this.colorSaturation != 0)
          //   this.adjustPixelColorSaturation(rgb, this.colorSaturation);

          // Set the new values.
          // d[i] = rgb.r;
          // d[i + 1] = rgb.g;
          // d[i + 2] = rgb.b;
        }
      }
      if ($contrast !== 0) applyContrast(d, $contrast);
      // Flag the pixels have been updated.
      // $isDirty = false;
      // console.log("imageData", imageData);
      console.log("imageData", imageData);
      if (imageData && $origImgCtx) $origImgCtx.putImageData(imageData, 0, 0);
      return imageData;
    };
    // const adjustPixelBrightness = function (rgb: any, adjustment: any) {
    //   // Simply add to the colors current value.
    //   rgb.r += adjustment;
    //   rgb.g += adjustment;
    //   rgb.b += adjustment;
    // };
    const truncateColor = (value: any) => {
      if (value < 0) {
        value = 0;
      } else if (value > 255) {
        value = 255;
      }

      return value;
    }

    function applyContrast(data: any, contrast: any) {
      var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

      for (var i = 0; i < data.length; i += 4) {
        data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
        data[i + 1] = truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
        data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
      }
    }
  return (
    <div
      style={{
        width: 1024,
        marginInline: "auto",
      }}
    >
      <div id="editCanvasContainer">
        {/* <img
          ref={imageRef}
          src="https://picsum.photos/1920/1080?random=1"
          alt="random1"
          style={{
            maxWidth: "100%",
          }}
        /> */}
        <ReactCrop
          src={imgSrc}
          crossorigin="anonymous"
          crop={crop}
          onImageLoaded={handleImageLoaded}
          onComplete={handleOnCropComplete}
          onChange={handleOnCropChange}
        />
        <canvas ref={imagePreviewCanvasRef} id="editCanvas"></canvas>
      </div>
      <br />
      Brightness
      <br />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0}
        min={-100}
        max={100}
        onChange={(event: object, value: any) => {
          onChangeSlider(event, imagePreviewCanvasRef, value, imageRef);
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
        defaultValue={0}
        min={0}
        max={100}
        onChange={(event: object, value: number | number[]) => {
          onContrastChange(event, imagePreviewCanvasRef, value, imageRef);
        }}
      />
      <button
        onClick={(event: any) => {
          event.preventDefault();
          onRotate(imagePreviewCanvasRef.current, 45);
        }}
      >
        rotate 45
      </button>
    </div>
  );
}
