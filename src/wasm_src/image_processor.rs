use super::effects::{grain, pixelate};
use image::{imageops, Rgba, RgbaImage};
use std::io::Cursor;
use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, ImageData};

use crate::{cache::ImageCache, effects::grain::Grain, log_error_to_console, log_to_console};

#[wasm_bindgen]
pub struct ImageProcessor {
    image: RgbaImage,
    org_image: RgbaImage,
    canvas_id: String,
    grain: grain::Grain,
    pixelate: pixelate::Pixelate,
    cache: ImageCache,
}

#[wasm_bindgen]
impl ImageProcessor {
    // Initialize with an image

    #[wasm_bindgen(constructor)]
    pub fn new(
        image_data: Vec<u8>,
        canvas_id: &str,
        cache_size: usize,
    ) -> Result<ImageProcessor, JsValue> {
        if cache_size == 0 {
            return Err(JsValue::from_str("cache size cant be 0."));
        }

        log_to_console!("do we reach this?");

        let img =
            image::load_from_memory(&image_data).map_err(|e| JsValue::from_str(&e.to_string()))?;

        let mut processor = ImageProcessor {
            image: img.to_rgba8(),
            org_image: img.to_rgba8(), // keep a copy of the original image
            canvas_id: canvas_id.to_string(),
            grain: Grain::new(),
            pixelate: pixelate::Pixelate::new(),
            cache: ImageCache::new(cache_size),
        };

        // Store the initial image in the cache
        processor.cache.store(&processor.org_image);

        Ok(processor)
    }

    #[wasm_bindgen]
    pub fn apply_changes(&mut self) {
        self.cache.store(&self.image);
        self.org_image = self.image.clone();
    }

    #[wasm_bindgen]
    pub async fn undo(&mut self) -> Result<(), JsValue> {
        if let Some(previous_image) = self.cache.undo() {
            self.org_image = previous_image.clone();
            self.image = self.org_image.clone();
            self.render_to_canvas().await?;
            Ok(())
        } else {
            Err(JsValue::from_str("No more undo steps available"))
        }
    }

    #[wasm_bindgen]
    pub async fn render_to_canvas(&self) -> Result<(), JsValue> {
        let window = web_sys::window().unwrap();
        let document = window.document().unwrap();
        let canvas = document
            .get_element_by_id(&self.canvas_id)
            .unwrap()
            .dyn_into::<HtmlCanvasElement>()
            .unwrap();

        let context = canvas.get_context("2d").unwrap();

        if let None = context {
            return Err(JsValue::from_str("no 2d context found"));
        }

        let context = context
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();

        let (width, height) = self.image.dimensions();
        // TODO: create a padding
        canvas.set_width(width);
        canvas.set_height(height);

        let raw_data: Vec<u8> = self.image.pixels().flat_map(|p| p.0.to_vec()).collect();
        let image_data = ImageData::new_with_u8_clamped_array_and_sh(
            Clamped(raw_data.as_slice()),
            width,
            height,
        )?;

        context.put_image_data(&image_data, 0.0, 0.0)?;
        Ok(())
    }

    #[wasm_bindgen]
    pub async fn upscale(&mut self, new_width: u32, new_height: u32) {
        self.image = imageops::resize(
            &self.image,
            new_width,
            new_height,
            imageops::FilterType::CatmullRom,
        );

        if let Err(e) = self.render_to_canvas().await {
            log_error_to_console!("{}", &format!("{:?}", e))
        }
    }

    #[wasm_bindgen]
    pub async fn downscale(&mut self, new_width: u32, new_height: u32) {
        self.image = imageops::resize(
            &self.image,
            new_width,
            new_height,
            imageops::FilterType::CatmullRom,
        );

        if let Err(e) = self.render_to_canvas().await {
            log_error_to_console!("{}", &format!("{:?}", e))
        }
    }

    #[wasm_bindgen]
    pub async fn add_grain(&mut self, intensity: f32) {
        self.grain
            .add_grain(intensity, &mut self.image, &self.org_image);

        if let Err(e) = self.render_to_canvas().await {
            log_error_to_console!("{}", &format!("{:?}", e))
        }
    }

    #[wasm_bindgen]
    pub async fn increase_vibrancy(&mut self) {
        for pixel in self.image.pixels_mut() {
            let pixel_ = pixel.0;

            let r = pixel_[0];
            let g = pixel_[1];
            let b = pixel_[2];
            let a = pixel_[3];

            let r = (r as f32 * 1.2).min(255.0) as u8;
            let g = (g as f32 * 1.2).min(255.0) as u8;
            let b = (b as f32 * 1.2).min(255.0) as u8;

            *pixel = Rgba([r, g, b, a]);
        }

        if let Err(e) = self.render_to_canvas().await {
            log_error_to_console!("{}", &format!("{:?}", e))
        }
    }

    #[wasm_bindgen]
    pub async fn pixelate(&mut self, pixel_size: u32) {
        self.pixelate
            .pixelate(pixel_size, &mut self.image, &self.org_image);

        if let Err(e) = self.render_to_canvas().await {
            log_error_to_console!("{}", &format!("{:?}", e))
        }
    }

    #[wasm_bindgen]
    pub async fn get_base64_image(&self) -> String {
        let mut buffer = Cursor::new(Vec::new());
        // Write the image to the buffer as PNG
        self.image
            .write_to(&mut buffer, image::ImageFormat::Png)
            .map_err(|e| JsValue::from_str(&e.to_string()))
            .unwrap();
        // Encode the buffer as base64
        base64::encode(buffer.into_inner())
    }
}
