import { MENU_ITEMS } from "../data/menu";
import { Header } from "../ui/sections/header/header";
import { PrimaryButton } from "../ui/components/buttons/primary-button/primary-button";
import { TransparentButton } from "../ui/components/buttons/transparent-button/transparent-button";

export function HeroIsland() {
  return (
    <Header
      menuItems={MENU_ITEMS}
      heading="Grow Your Ideas Into Something Real and Reliable"
      subheading="We build systems that grow with you. From infrastructure to applications, we support you every step of the way."
      actions={
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto">
          <PrimaryButton
            href="#contact"
            className="w-full sm:w-auto text-center justify-center min-h-[52px] sm:min-h-[56px] px-8 py-4 rounded-[20px] text-base font-semibold shadow-lg"
          >
            Talk to our Engineers
          </PrimaryButton>
          <TransparentButton
            href="#services"
            className="w-full sm:w-auto text-center justify-center min-h-[52px] sm:min-h-[56px] px-8 py-4 rounded-[20px] text-base font-semibold"
          >
            Explore Things We Did
          </TransparentButton>
        </div>
      }
    />
  );
}

export default HeroIsland;
