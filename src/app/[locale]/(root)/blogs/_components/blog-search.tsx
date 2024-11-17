interface BlogsSearchProps {
  setSearchVal: (value: string) => void
  searchVal: string
}

const BlogsSearch = ({ setSearchVal, searchVal }: BlogsSearchProps) => {
  return (
    <nav className="w-full mb-5 text-right">
      <p className="text-sm font-medium">Can&apos;t find your favorite?</p>
      <input
        placeholder="search blogs ..."
        className="w-3/4 md:w-1/2 border-2 border-gray-500 p-2 rounded-md mt-2"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
    </nav>
  )
}

export default BlogsSearch
