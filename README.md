# Dall-E Clone Image Generation from Text Prompts

This MERN stack application allows users to generate images from text prompts using a custom DALL-E clone. Users can create images with their own prompts or click the "Surprise Me" button to receive a randomly generated prompt. The generated images can be downloaded or shared with the community of creators. Additionally, users have the option to download images generated by other users.

## Features

- Image Generation: Create stunning and imaginative images from text prompts.
- Custom Prompts: Input your own text prompts to generate unique images.
- Surprise Me: Generate random prompts with the click of a button.
- Download Images: Save the generated images to your device for personal use.
- Share with Community: Share your created images with the community of creators.
- Community Downloads: Explore and download images generated by other users.
- Usage Limits: To manage costs associated with the OpenAI API, users are limited to generating 5 images per IP address.

## Technologies Used

- MongoDB: Store user data and generated images.
- Express.js: Create RESTful API endpoints.
- React: Build the user interface.
- Node.js: Run the server for image generation.
- OpenAI API: Power the image generation process.
- React Router: Handle client-side routing.
- Bootstrap: Style the frontend components.
- Cloudinary: Images are saved in Cloudinary
- FileSaver.js: Enable image downloads.

## Authors

- [@lbdelilla](https://www.github.com/lbdelilla)

## Run Locally

Clone the project

```bash
  git clone https://github.com/lbdelilla/Dall-E-2.0
```

Go to the project backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to the project frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm run dev
```
