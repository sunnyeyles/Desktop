type KanyeQuote = {
  quoteBody: string
}
export const Kanye = ({ quoteBody }: KanyeQuote) => {
  return (
    <div className="bg-yellow-300 border border-yellow-400 w-40 h-40 rounded-md shadow-lg transform rotate-3">
      <p className="p-2 text-black text-xs">{quoteBody}</p>
      <p className="p-2 text-black text-xs">-Kanye</p>
    </div>
  )
}
