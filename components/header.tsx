import UserButton from "./user-button"

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="mx-auto flex h-18 w-full max-w-3xl items-end px-4 sm:px-6">
        <UserButton />
      </div>
    </header>
  )
}