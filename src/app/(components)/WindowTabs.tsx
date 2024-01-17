import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucidePlus, LucideX } from "lucide-react";

export interface WindowTabItemProps {
  component: JSX.Element;
  title: string;
  key: string;
}

interface WindowTabsProps {
  tabs: WindowTabItemProps[];
  selected: number;
  onSelectChange: (selectedIndex: number) => void;
  onTabsChange: (value: WindowTabItemProps[]) => void;
}

export default function WindowTabs({
  tabs,
  selected,
  onSelectChange,
  onTabsChange,
}: WindowTabsProps) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-grow-0 flex-shrink-0">
        <div className="flex p-2 gap-2">
          <Button size={"sm"} variant={"outline"}>
            <LucidePlus className="w-4 h-4" />
          </Button>
          {tabs.map((tab, idx) => {
            return (
              <Button
                size={"sm"}
                key={tab.key}
                variant={idx === selected ? "default" : "secondary"}
                onClick={() => onSelectChange(idx)}
              >
                {tab.title}
                <LucideX
                  className="w-4 h-4 ml-2"
                  onClick={() => {
                    onTabsChange(
                      tabs.filter((nextTab) => nextTab.key !== tab.key)
                    );
                  }}
                />
              </Button>
            );
          })}
        </div>
        <Separator />
      </div>
      <div className="flex-grow relative">
        {tabs.map((tab, tabIndex) => {
          return (
            <div
              className="absolute left-0 right-0 top-0 bottom-0"
              style={{
                visibility: tabIndex === selected ? "visible" : "hidden",
              }}
              key={tab.key}
            >
              {tab.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}