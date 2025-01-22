use image::{Rgba, RgbaImage};

use crate::log_to_console;

pub struct Grain {
    previous_grain_intensity: f32,
}

impl Grain {
    pub fn new() -> Self {
        Self {
            previous_grain_intensity: 0.0,
        }
    }

    pub fn add_grain(&mut self, intensity: f32, image: &mut RgbaImage, org_image: &RgbaImage) {
        let diff_intensity = intensity - self.previous_grain_intensity;
        self.previous_grain_intensity = intensity;

        log_to_console!("{}", self.previous_grain_intensity);

        if diff_intensity != 0.0 {
            let mut temp_image = org_image.clone();
            let mut rng = fastrand::Rng::new();

            for y in 0..temp_image.height() {
                for x in 0..temp_image.width() {
                    let pixel = temp_image.get_pixel_mut(x, y);

                    let [r, g, b, a] = pixel.0;

                    let r_noise = (rng.u8(0..255) as f32 / 255.0 * 2.0 - 1.0) * diff_intensity;
                    let g_noise = (rng.u8(0..255) as f32 / 255.0 * 2.0 - 1.0) * diff_intensity;
                    let b_noise = (rng.u8(0..255) as f32 / 255.0 * 2.0 - 1.0) * diff_intensity;

                    let new_r = (r as f32 + r_noise).clamp(0.0, 255.0) as u8;
                    let new_g = (g as f32 + g_noise).clamp(0.0, 255.0) as u8;
                    let new_b = (b as f32 + b_noise).clamp(0.0, 255.0) as u8;

                    // Write the updated values back to the pixel
                    *pixel = Rgba([new_r, new_g, new_b, a]);
                }
            }

            *image = temp_image;
        }
    }
}
