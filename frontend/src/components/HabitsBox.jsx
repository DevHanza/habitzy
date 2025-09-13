import WidgetsWrapper from "./ui/WidgetWrapper";
import HabitCard from "./HabitCard";

function HabitsBox() {
  return (
    <WidgetsWrapper>
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
    </WidgetsWrapper>
  );
}

export default HabitsBox;
