import Logo from "./Logo";
import Background from "./Background";

export default function Header() {
  return (
    <>
      <Background />
      <div className="mx-32 inline-flex flex-wrap gap-6">
        <Logo />
      </div>
    </>
  );
}
