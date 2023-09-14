import { saveAs } from 'file-saver'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import preview from '../assets/preview.png'
import download from '../assets/download.png'
import { getRandomPrompt } from '../utils/index.js'
import { FormField, Loader } from '../components/index.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [loading, setLoading] = useState(false)
  const [generatingImg, setGeneratingImg] = useState(false)

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        if (response.status === 429) {
          toast.error(
            '🙏 You have reached the maximum amount of possible generated images.',
            {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            }
          )
        } else if (!response.ok) {
          throw new Error('Error generating image')
        } else {
          const data = await response.json()

          setForm((prev) => ({
            ...prev,
            photo: `data:image/jpeg;base64,${data.photo}`,
          }))
        }
      } catch (error) {
        toast.error(
          '🙏  An error occurred trying to generate an image. Please try again.',
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        )
      } finally {
        setGeneratingImg(false)
      }
    } else {
      toast.error('🙏 Please enter a Prompt and try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.name && form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        })
        await response.json()
        navigate('/')
      } catch (error) {
        toast.error(
          '🙏 An error occurred trying to share the image. Please try again.',
          {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        )
      } finally {
        setLoading(false)
      }
    } else {
      toast.error('🙏 Please enter your Name, a Prompt and Generate an Image', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt()
    setForm((prev) => ({ ...prev, prompt: randomPrompt }))
  }

  const downloadImage = (imageData) => {
    const byteCharacters = atob(imageData.split(',')[1])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/jpeg' })

    saveAs(blob, 'image.jpeg')
  }

  return (
    <section className="max-w-7xl mx-auto">
      <ToastContainer />
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create imaginative and visually stunning images generated through
          DALL-E AI and share with the Community
        </p>
      </div>
      <form className="mt-16 max-w-3xl " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An oil pastel drawing of an annoyed cat in a spaceship"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <>
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => downloadImage(form.photo)}
                  className="rounded-full max-w-1 outline-none bg-[#6449ff] border-none flex absolute bottom-0 right-0 m-2"
                >
                  <img
                    src={download}
                    alt="download"
                    className="w-6 h-6  object-contain invert"
                  />
                </button>
              </>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created your image, you can share it with the
            community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
