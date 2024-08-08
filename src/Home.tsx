import { Desktop } from './Desktop'

export const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="relative p-8 bg-gray-700 rounded-lg shadow-lg border-[16px] border-gray-900">
        <div className="border-4 border-gray-500 rounded-md p-6 bg-black">
          <div className="w-[1340px] h-[780px] bg-gray-800 border-8 border-gray-600 rounded-sm">
            <div className="w-full h-full bg-cover bg-center rounded-sm bg-screensaver">
              <div className="w-full h-full flex items-center justify-center">
                <Desktop />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
