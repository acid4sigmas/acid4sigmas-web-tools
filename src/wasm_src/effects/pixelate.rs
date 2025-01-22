use image::{imageops, RgbaImage};

use crate::log_error_to_console;

pub struct Pixelate {
    previous_pixel_size: u32,
}

impl Pixelate {
    pub fn new() -> Self {
        Self {
            previous_pixel_size: 1,
        }
    }

    pub fn pixelate(&mut self, pixel_size: u32, image: &mut RgbaImage, org_image: &RgbaImage) {
        if pixel_size == self.previous_pixel_size {
            return;
        }

        self.previous_pixel_size = pixel_size;

        let (width, height) = org_image.dimensions();
        if pixel_size == 0 || pixel_size > width || pixel_size > height {
            log_error_to_console!(
                "Invalid pixel size: {} (image dimensions: {}x{})",
                pixel_size,
                width,
                height
            );
            return;
        }

        let small_width = width / pixel_size;
        let small_height = height / pixel_size;

        let resized = imageops::resize(
            org_image,
            small_width,
            small_height,
            imageops::FilterType::Nearest,
        );

        *image = imageops::resize(&resized, width, height, imageops::FilterType::Nearest);
    }
}
