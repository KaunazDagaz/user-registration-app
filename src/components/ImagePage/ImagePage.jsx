import Button from "../utils/Button"
import backgroundImage from "../../assets/pexels-alexandr-podvalny-1227513.jpeg"

export default function ImagePage() {
  return (
    <section className="relative px-4 pt-10 h-[500px] lg:h-[650px] pb-[71px] md:pb-22 md:pt-22.25 lg:pt-41 lg:pb-[163px] bg-[auto_164%] bg-no-repeat bg-[51.2%_99%]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full h-full absolute inset-0 bg-image-background" />
      <div className="relative flex flex-col items-center max-w-[380px] mx-auto">
        <h1 className="text-heading text-center text-white mb-[21px]">
          Test assignment for front-end developer
        </h1>
        <p className="mb-8 text-center text-white">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <a href="#register">
          <Button>Sign up</Button>
        </a>
      </div>
    </section>
  )
}