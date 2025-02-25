
import { Link } from "react-router-dom";
import { Activity, Home, Dumbbell, Heart, Droplets, Menu, Footprints, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Exercise", href: "/exercise", icon: Dumbbell },
  { name: "Steps", href: "/steps", icon: Footprints },
  { name: "Food Calories", href: "/food_calorie", icon: Heart },
  { name: "BMI", href: "/bmi", icon: Calculator },
];

const NavigationContent = () => (
  <nav className="flex flex-1 flex-col">
    <ul role="list" className="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`
                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                  hover:bg-gray-50 hover:text-primary-gradient
                  transition-all duration-200 ease-in-out
                `}
              >
                <item.icon
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary-gradient"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </nav>
);

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-50"
            size="icon"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <div className="flex flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <h1 className="text-2xl font-bold bg-gradient-primary text-transparent bg-clip-text">
                JFit
              </h1>
            </div>
            <NavigationContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - Fix alignment issue */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-white border-r border-gray-200 px-6 pb-4 fixed left-0 top-0 w-80">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary text-transparent bg-clip-text">
            JFit
          </h1>
        </div>
        <NavigationContent />
      </div>
    </>
  );
};

