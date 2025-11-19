# Image Assets Guide

This document lists all the image assets needed for the home page sections.

## Events Images

Place the following images in the `public/events/` directory:

### Upcoming Events
- `membership_2025.jpg` - IEEE Half-Yearly Membership Recruitment 2025

### Recent Iconic Events
- `baghabari_tour.jpg` - Expedition to Baghabari Power Plant (March 31, 2022)
- `reception_2021.jpg` - Reception Programme for Prof. Dr. Md. Saifur Rahman & Prof. Dr. Celia Shahnaz (December 22, 2021)
- `yesist12_2021.jpg` - IEEE YESIST12 - Innovation Challenge Track 2021 (August 30, 2021)

## Publications Images

Place the following images in the `public/publications/` directory:

- `inspira.jpg` - Inspira Publication cover
- `ras_magazine.jpg` - RAS Magazine cover

## Temporary Solution

Until you upload the actual images, placeholder images will be displayed. To add your images:

1. Copy your images to the respective folders mentioned above
2. Ensure the filenames match exactly as listed
3. Recommended image formats: JPG, PNG, WebP
4. Recommended sizes:
   - Upcoming events: 800x600px or larger
   - Recent events: 600x400px or larger
   - Publications: 400x600px or larger (portrait orientation)

## Alternative: Update Data File

If your images have different names, you can update the file paths in:
`data/homePageData.js`

Just change the `image` property for each item to match your actual image filenames.
