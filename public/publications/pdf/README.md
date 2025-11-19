# Publications PDF Files

## Folder Structure
Place all PDF files in this folder (`public/publications/pdf/`)

## Required PDF Files
Please add the following PDF files to this folder:

1. **ETCell_2014.pdf** - ETCell Magazine 2014
2. **Ras_Magazine.pdf** - RAS Magazine
3. **inspira_final.pdf** - Inspira Magazine
4. **excom_2022_2023.pdf** - Executive Committee 2022-2023

## How to Add PDFs
1. Copy your PDF files to this folder: `public/publications/pdf/`
2. Ensure the filenames match exactly as listed above
3. The files will be accessible at: `/publications/pdf/filename.pdf`

## Download Functionality
- Users can click the "Download" button to download PDFs directly
- Users can click the "Read Online" button to open PDFs in a new tab
- All PDF links are configured in `data/publicationsData.js`

## Notes
- PDFs in the `public` folder are automatically served by Next.js
- No additional configuration needed for serving static files
- File paths are relative to the `public` folder
