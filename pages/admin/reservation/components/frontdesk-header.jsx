import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import PropTypes from "prop-types";

const FrontDeskHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className='flex items-center justify-between gap-4'>
      <Button onClick={onPrevMonth} variant='outline' className='w-10'>
        &lt;
      </Button>
      <p className=' font-bold'>{format(currentDate, "MMMM yyyy")}</p>
      <Button onClick={onNextMonth} variant='outline' className='w-10'>
        &gt;
      </Button>
    </div>
  );
};

FrontDeskHeader.propTypes = {
  currentDate: PropTypes.object,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
};

export default FrontDeskHeader;
