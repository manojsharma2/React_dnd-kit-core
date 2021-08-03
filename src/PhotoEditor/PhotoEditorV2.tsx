import React, { useRef, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Slider, Button, Grid, Typography } from "@material-ui/core";
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

export default function PhotoEditorV2() {
  // Add reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLCanvasElement | null>(null);

  // Create states
  // const [canvasContext, setCanvasContext] =
  //   useState<CanvasRenderingContext2D | null>(null);
  const cropableImage = "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg"
  const [cropRatio, setCropRatio] = useState<any>({
    width: 96,
    height: 92,
    unit: "%",
    x: 2,
    y: 4,
  });
  const [croper, showCroper] = useState<boolean>(false);

  // Create handlers

  // Create image
  const createImage = (imageSrc: string) => {
    let newImageElement = new Image(); // Create new img element
    newImageElement.src = imageSrc;
    newImageElement.crossOrigin = "anonymous";
    return newImageElement;
  };
  // Draw canvas with image
  const drawImageHandler = (
    image: any,
    canvasContext: CanvasRenderingContext2D | null,
    canvasCurrentRef: HTMLCanvasElement | null,
    width?: number,
    height?: number
  ) => {
    if (canvasContext && canvasCurrentRef) {
      canvasCurrentRef.width = image.width;
      canvasCurrentRef.height = image.height;
      canvasContext.drawImage(image, 0, 0);
      //      console.log("image", image, "canvasContext", canvasContext);
    }
  };
  // canvas rotation handler
  const onRotateHandler = (srcCanvas: any, degrees: number) => {
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
  // canvas crop handler
  const image64toCanvasRef = (
    canvasRef: any,
    image64: any,
    pixelCrop: any,
    inputImage: any
  ) => {
    const canvas = canvasRef; // document.createElement('canvas');
    //console.log("image", canvas);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scaleX = inputImage.naturalWidth / inputImage.width;
        const scaleY = inputImage.naturalHeight / inputImage.height;
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        const image = new Image();
        image.src = image64;
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
    }
  };
  // Adjust pixels
  const adjustPixels = (
    $brightness: number,
    $contrast: number,
    $Saturation: number,
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
    //console.log("d.length", d.length);
    //console.log("imageData", imageData);
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

        // Set the new values.
        // d[i] = rgb.r;
        // d[i + 1] = rgb.g;
        // d[i + 2] = rgb.b;
      }
    }
    if ($Saturation !== 0) {
      // var sv = $Saturation; // saturation value. 0 = grayscale, 1 = original

      // var luR = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
      // var luG = 0.6094;
      // var luB = 0.082;

      // var az = (1 - sv) * luR + sv;
      // var bz = (1 - sv) * luG;
      // var cz = (1 - sv) * luB;
      // var dz = (1 - sv) * luR;
      // var ez = (1 - sv) * luG + sv;
      // var fz = (1 - sv) * luB;
      // var gz = (1 - sv) * luR;
      // var hz = (1 - sv) * luG;
      // var iz = (1 - sv) * luB + sv;

      // for (let i = 0; i < d.length; i += 4) {
      //   var red = d[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
      //   var green = d[i + 1];
      //   var blue = d[i + 2];

      //   var saturatedRed = az * red + bz * green + cz * blue;
      //   var saturatedGreen = dz * red + ez * green + fz * blue;
      //   var saturateddBlue = gz * red + hz * green + iz * blue;

      //   d[i] = saturatedRed;
      //   d[i + 1] = saturatedGreen;
      //   d[i + 2] = saturateddBlue;
      // }
      let rgb: any = {
        r: null,
        g: null,
        b: null,
      };
      for (let i = 0; i < d.length; i += 4) {
        rgb.r = d[i];
        rgb.g = d[i + 1];
        rgb.b = d[i + 2];
        adjustPixelColorSaturation(rgb, $Saturation);
        d[i] = rgb.r;
        d[i + 1] = rgb.g;
        d[i + 2] = rgb.b;
      }
    }

    if ($contrast !== 0) applyContrast(d, $contrast);
    // Flag the pixels have been updated.
    // $isDirty = false;
    // console.log("imageData", imageData);
    //console.log("imageData", imageData);
    if (imageData && $origImgCtx) $origImgCtx.putImageData(imageData, 0, 0);
    return imageData;
  };
  const truncateColor = (value: any) => {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }

    return value;
  };
  function applyContrast(data: any, contrast: any) {
    var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

    for (var i = 0; i < data.length; i += 4) {
      data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i + 1] = truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
      data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
    }
  }

  function adjustPixelColorSaturation(rgb: any, adjustment: any) {
    adjustment *= -0.01;
    var max;
    max = Math.max(rgb.r, rgb.g, rgb.b);
    if (rgb.r !== max) {
      rgb.r += (max - rgb.r) * adjustment;
    }
    if (rgb.g !== max) {
      rgb.g += (max - rgb.g) * adjustment;
    }
    if (rgb.b !== max) {
      rgb.b += (max - rgb.b) * adjustment;
    }
  }

  // when image is loaded
  const imageLoadedHandler = (image: any) => {
    //console.log("imageLoadedHandler>>>", image);
    imageRef.current = image;
  };
  // handler to run on completion of crop
  const onCropCompleteHandler = (crope: any, pixelCrop: any) => {
    // console.log(
    //   "onCropCompleteHandler>>>",
    //   "crope",
    //   crope,
    //   "pixelCrop",
    //   pixelCrop
    // );
    image64toCanvasRef(
      canvasRef.current,
      cropableImage,
      crope,
      imageRef.current
    );
  };
  // hadler for corper change
  const onCroperChangeHandler = (crop: object) => {
    //console.log("onCroperChangeHandler>>>", crop);
    setCropRatio(crop);
  };

  // Brightness change handler
  const onBrightnessChangeHandler = (
    event: any,
    value: any,
    canvasRef: any,
    imageRef: any
  ) => {
    console.log("value", value, "canvasRef", canvasRef, "imageRef");
    adjustPixels(value, 0, 0, canvasRef.current, imageRef);
  };
  // Contrast change handler
  const onContrastChangeHandler = (
    event: any,
    value: any,
    canvasRef: any,
    imageRef: any
  ) => {
    console.log("value", value, "canvasRef", canvasRef, "imageRef");
    adjustPixels(0, value, 0, canvasRef.current, imageRef);
  };
  // Staturation change handler
  const onSaturationChangeHandler = (
    event: any,
    value: any,
    canvasRef: any,
    imageRef: any
  ) => {
    console.log("value", value, "canvasRef", canvasRef, "imageRef");
    adjustPixels(0, 0, value, canvasRef.current, imageRef);
  };
  useEffect(() => {
    // Check canvas
    let $CanvasContext: CanvasRenderingContext2D | null = null;
    if (canvasRef && canvasRef.current) {
      // Create canvasContext
      $CanvasContext = canvasRef.current.getContext("2d");
      // update state
      // setCanvasContext($CanvasContext);
      // create image
      const image: any = createImage(cropableImage);
      image.crossOrigin = "anonymous";
      // load image
      imageRef.current = image;
      image.onload = function () {
        drawImageHandler(image, $CanvasContext, canvasRef.current);
      };
    }
  }, [canvasRef, cropableImage, imageRef]);

  // App return
  return (
    <div
      style={{
        width: 1024,
        marginInline: "auto",
        paddingBlock: "64px",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={8} id="PhotoEditor">
          {croper && (
            <ReactCrop
              crossorigin="anonymous"
              src={cropableImage}
              crop={cropRatio}
              onImageLoaded={imageLoadedHandler}
              onComplete={onCropCompleteHandler}
              onChange={onCroperChangeHandler}
            />
          )}
          <div
            style={{
              display: `${!croper ? "flex" : "none"}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <canvas ref={canvasRef} id="editCanvas"></canvas>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Typography component={"h1"} children={"Image Editor"} />
          {croper && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                children={"16:9"}
                onClick={() => {
                  setCropRatio({ aspect: 16 / 9, width: 80, unit: '%', x: 10, y: 4, });
                }}
              />
              <Button
                variant="outlined"
                color="secondary"
                children={"1:1"}
                onClick={() => {
                  setCropRatio({
                    aspect: 1,
                    width: 50,
                    unit: "%",
                    x: 25,
                    y: 2,
                  });
                }}
              />
              <Button
                variant="outlined"
                color="secondary"
                children={"4:3"}
                onClick={() => {
                  setCropRatio({
                    aspect: 4 / 3,
                    width: 80,
                    unit: "%",
                    x: 10,
                    y: 0,
                  });
                }}
              />
            </>
          )}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {!croper && (
                <Button
                  variant="contained"
                  color="secondary"
                  children={"Crop"}
                  onClick={() => {
                    showCroper(true);
                  }}
                />
              )}
              {croper && (
                <Button
                  variant="contained"
                  color="secondary"
                  children={"Confirm"}
                  onClick={() => {
                    showCroper(false);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                children={"Rotate 90"}
                onClick={(event: any) => {
                  event.preventDefault();
                  onRotateHandler(canvasRef.current, 90);
                }}
              />
            </Grid>
          </Grid>
          <br />
          Brightness
          <br />
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="Brightness slider"
            defaultValue={0}
            min={-100}
            max={100}
            step={5}
            disabled={croper}
            onChange={(event: object, value: any) => {
              // console.log("event", event);
              onBrightnessChangeHandler(event, value, canvasRef, imageRef);
            }}
          />
          <br />
          contrast
          <br />
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="Saturate"
            defaultValue={0}
            min={-100}
            max={100}
            step={5}
            disabled={croper}
            onChange={(event: object, value: any) => {
              onContrastChangeHandler(event, value, canvasRef, imageRef);
            }}
          />
          <br />
          Saturate
          <br />
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="Saturate"
            defaultValue={0}
            min={-100}
            max={100}
            step={5}
            disabled={croper}
            onChange={(event: object, value: any) => {
              onSaturationChangeHandler(event, value, canvasRef, imageRef);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
