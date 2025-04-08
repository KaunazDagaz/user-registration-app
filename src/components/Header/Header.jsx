import Logo from "../../assets/Logo.svg"
import Button from "../utils/Button"

export default function Header () {
  return (
    <header className="px-4 py-[13px] max-w-[1170px] mx-auto flex justify-between md:px-8 lg:px-15 2xl:px-0">
      <img src={Logo} alt="Logo" width={104} height={26} />
      <nav>
        <ul className="flex gap-2.5">
          <li>
            <a href="#users" className="block">
              <Button>Users</Button>
            </a>
          </li>
          <li>
            <a href="#register">
              <Button>Sign up</Button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}