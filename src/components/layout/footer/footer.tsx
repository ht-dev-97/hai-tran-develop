export default function Footer() {
  return (
    <footer className="bg-gray-100 h-12 flex items-center">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  )
}
