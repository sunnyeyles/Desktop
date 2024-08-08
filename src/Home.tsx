import { useState, useEffect } from 'react'
import { Desktop } from './Desktop'
import { Kanye } from './Kanye'
import axios from 'axios'

const fetchQuote = async () => {
  const quote = await axios.get('https://api.kanye.rest')
  return quote.data.quote
}

export const Home = () => {
  const [quote, setQuote] = useState<string | null>(null)

  useEffect(() => {
    const getQuote = async () => {
      try {
        const fetchedQuote = await fetchQuote()
        setQuote(fetchedQuote)
      } catch (error: unknown) {
        console.error(error)
      }
    }

    getQuote()

    const intervalId = setInterval(() => {
      getQuote()
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="absolute top-4 right-24 z-10">
        {quote !== null && <Kanye quoteBody={quote} />}
      </div>
      <div className="relative p-8 bg-gray-700 rounded-lg shadow-lg border-[16px] border-gray-900">
        <div className="border-4 border-gray-500 rounded-md p-6 bg-black">
          <div className="w-[1340px] h-[780px] bg-gray-800 border-8 border-gray-600 rounded-sm relative">
            <div className="w-full h-full bg-cover bg-center rounded-sm bg-screensaver">
              <div className="w-full h-full flex items-center justify-center relative">
                <Desktop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
